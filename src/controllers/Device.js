const pool = require('../database/pool');

exports.createDevice = async () => {
    const insertDeviceQuery = '';
    const queryResult = await pool.query(insertDeviceQuery, []);
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
    const getDefaultDataQuery = 'select photo, model, device_names.id as name, brands.id as brand, country.id as country, clients.id as client, lastname, firstname, middlename, phone  from devices\n' +
                                'inner join clients on clients.id = devices.client_id\n' +
                                'inner join device_names on device_names.id = devices.name_id\n' +
                                'inner join country on country.id = devices.country_id\n' +
                                'inner join brands on brands.id = devices.brand_id\n' +
                                'where devices.id = $1\n';
    const defaultQueryResult = await pool.query(getDefaultDataQuery, [id]);
    const defaultData = defaultQueryResult.rows;
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
    return {defaultData, names, countries, clients, brands};
};

exports.updateDeviceById = async (id, name, country, photo, client, brand, model) => {
    const updateDeviceQuery = 'UPDATE devices\n'
        + 'SET name=$1, country=$2, photo=$3, client=$4, brand=$5, model=$6\n' +
        'WHERE id=$7';
    await pool.query(updateDeviceQuery, [name, country, photo, client, brand, model, id]);
};

exports.deleteDevicesById = async (ids) => {
    const deleteDevicesQuery = 'delete from devices where id = $1';
    for (const id of ids) {
        await pool.query(deleteDevicesQuery, [id]);
        const checkClientQuery = 'select count(distinct devices.id) from clients\n' +
            'left join devices on clients.id = client_id\n' +
            'where clients.id = $1\n' +
            'group by devices.id';
        const checkQueryResult = await pool.query(checkClientQuery, [queryResult.client]);
        if (!checkQueryResult.id) {
            const deleteClient = 'delete from clients where id = $1';
        }
    }
    const getAllDevicesQuery = 'select devices.id as id, clients.id as client, country.name as country, brands.name as brand, device_names.name as name, model from devices\n'
                             + 'left join country on country.id = devices.country_id\n'
                             + 'left join clients on clients.id = devices.client_id\n'
                             + 'left join brands on brands.id = devices.brand_id\n'
                             + 'left join device_names on device_names.id = devices.name_id\n'
                             + 'order by devices.id asc';
    const queryResult = await pool.query(getAllDevicesQuery);
    const devices = queryResult.rows;
    return {devices};
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

exports.insertDevice = async (name, countryId, photo, clientId, brandId, model) => {
    const insertDeviceQuery = 'insert into devices(name, country_id, photo, client_id, brand_id, model)' +
                              'values($1, $2, $3, $4, $5, $6)';
    const queryResult = await pool.query(insertDeviceQuery, [name, countryId, photo, clientId, brandId, model]);
    const device = queryResult.rows[0];
    return {device};
};

