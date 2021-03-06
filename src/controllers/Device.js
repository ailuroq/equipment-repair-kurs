const pool = require('../database/pool');

exports.createDevice = async (name, photo, clientId, countryId, brandId, model) => {
    const insertDeviceQuery = 'insert into devices(name, photo, client_id, country_id, brand_id, model)\n' +
        'values($1,$2,$3,$4,$5,$6)';
    const queryResult = await pool.query(insertDeviceQuery, [name, photo, clientId, countryId, brandId, model]);
    const successInsertData = queryResult.rows[0];
    return { successInsertData };
};

exports.getAllDevices = async () => {
    const getAllDevicesQuery = 'select devices.id as id, clients.id as client, country.name as country, brands.name as brand, device_names.name as name, model from devices\n'
                               + 'left join country on country.id = devices.country_id\n'
                               + 'left join clients on clients.id = devices.client_id\n'
                               + 'left join brands on brands.id = devices.brand_id\n'
                               + 'left join device_names on device_names.id = devices.name_id\n'
                               + 'order by devices.id asc';
    const queryResult = await pool.query(getAllDevicesQuery);
    const devices = queryResult.rows;
    return { devices };
};

exports.getLimitedDevices = async (limit) => {
    const getDevicesQuery = 'SELECT * FROM devices\n'
                            + 'ORDER BY id ASC LIMIT $1';
    const queryResult = await pool.query(getDevicesQuery, [limit]);
    const devices = queryResult.rows;
    return { devices };
};

exports.getUpdateDeviceInfo = async (id) => {
    const getDefaultDataQuery = 'select photo, model, device_names.id as nameId, device_names.name as name, brands.id as brandId, brands.name as brand, country.id as countryId, country.name as country, clients.id as clientId, lastname, firstname, middlename, phone  from devices\n' +
                                'inner join clients on clients.id = devices.client_id\n' +
                                'inner join device_names on device_names.id = devices.name_id\n' +
                                'inner join country on country.id = devices.country_id\n' +
                                'inner join brands on brands.id = devices.brand_id\n' +
                                'where devices.id = $1\n';
    const defaultQueryResult = await pool.query(getDefaultDataQuery, [id]);
    const defaultData = defaultQueryResult.rows[0];
    const getNamesQuery = 'select * from device_names';
    const queryNamesResult = await pool.query(getNamesQuery);
    const names = queryNamesResult.rows;
    const getCountriesQuery = 'select * from country';
    const queryCountriesResult = await pool.query(getCountriesQuery);
    const countries = queryCountriesResult.rows;
    const getClientsQuery = 'select * from clients order by id asc';
    const queryClientsResult = await pool.query(getClientsQuery);
    const clients = queryClientsResult.rows;
    const getBrandsQuery = 'select * from brands';
    const queryBrandsResult = await pool.query(getBrandsQuery);
    const brands = queryBrandsResult.rows;
    return {defaultData, names, countries, clients, brands};
};

exports.updateDeviceById = async (id, name, country, client, brand, model) => {
    const updateDeviceQuery = 'UPDATE devices\n'
        + 'SET name_id=$1, country_id=$2, client_id=$3, brand_id=$4, model=$5\n' +
        'WHERE id=$6';
    await pool.query(updateDeviceQuery, [name, country, client, brand, model, id]);
};

exports.getPotentialDataToDelete = async (id) => {
    const getOrdersAndRepairsQuery = 'select count(distinct orders.id) as orders, count(distinct repairs.id) as repairs, clients.id as client from devices\n' +
                                     'inner join clients on clients.id = devices.client_id\n' +
                                     'inner join orders on devices.id = orders.device_id\n' +
                                     'inner join repairs on orders.id = repairs.order_id\n' +
                                     'where devices.id = $1' +
                                     'group by clients.id';
    let queryResult = await pool.query(getOrdersAndRepairsQuery, [id]);
    const result = queryResult.rows[0];
    return {result};
};

exports.deleteDevicesById = async (ids) => {
    const deleteDevicesQuery = 'delete from devices where id=$1';
    for (const id of ids) {
        await pool.query(deleteDevicesQuery, [parseInt(id)]);
    }
};

exports.getInsertDeviceInfo = async () => {
    const getNamesQuery = 'select * from device_names';
    const queryNamesResult = await pool.query(getNamesQuery);
    const names = queryNamesResult.rows;
    const getCountriesQuery = 'select * from country';
    const queryCountriesResult = await pool.query(getCountriesQuery);
    const countries = queryCountriesResult.rows;
    const getClientsQuery = 'select * from clients';
    const queryClientsResult = await pool.query(getClientsQuery);
    const clients = queryClientsResult.rows;
    const getBrandsQuery = 'select * from brands';
    const queryBrandsResult = await pool.query(getBrandsQuery);
    const brands = queryBrandsResult.rows;
    return {names, countries, clients, brands};
};

exports.getDeviceForView = async (id) => {
    const getDeviceForView = 'select devices.id, clients.id as client, clients.lastname, clients.middlename, clients.firstname, clients.phone, photo, model, device_names.name as name, country.name as country, brands.name as brands from devices\n' +
                             'inner join clients on clients.id = client_id\n' +
                             'inner join device_names on device_names.id = name_id\n' +
                             'inner join country on country.id = country_id\n' +
                             'inner join brands on brands.id = brand_id\n' +
                             'where devices.id = $1';
    const queryResult = await pool.query(getDeviceForView, [id]);
    const device = queryResult.rows;
    return {device};
};

exports.insertDevice = async (name, countryId, clientId, brandId, model) => {
    const insertDeviceQuery = 'insert into devices(name_id, country_id, client_id, brand_id, model)' +
                              'values($1, $2, $3, $4, $5)';
    await pool.query(insertDeviceQuery, [name, countryId, clientId, brandId, model]);
    const getLastDeviceId = 'select id from devices\n' +
        'order by id desc\n' +
        'limit 1';
    const lastDeviceIdQueryResult = await pool.query(getLastDeviceId);
    const id = lastDeviceIdQueryResult.rows[0];
    return {id};
};

exports.findDevices = async (data) => {
    const findDevicesQuery = 'select devices.id, device_names.name as name, country.name as country, brands.name as brand, model, clients.lastname as lastname, clients.id as client from devices\n' +
                             'inner join device_names on devices.name_id = device_names.id\n' +
                             'inner join brands on devices.brand_id = brands.id\n' +
                             'inner join country on country.id = devices.country_id\n' +
                             'inner join clients on clients.id = devices.client_id\n' +
                             'where device_names.name ilike $1\n' +
                             'or brands.name ilike $1';
    const queryResult = await pool.query(findDevicesQuery, [data + '%']);
    const devices = queryResult.rows;
    return {devices};
};

exports.updateDevicePhoto = async (filename, id) => {
    const updateDeviceQuery = 'update devices set photo=$1 where id=$2';
    await pool.query(updateDeviceQuery, [filename, id]);
};
