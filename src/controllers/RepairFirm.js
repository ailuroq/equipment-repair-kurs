const pool = require('../database/pool');

exports.getAllFirms = async () => {
    const getAllFirmsQuery = 'select repair_firms.id, repair_firms.name, address, phone, cities.name as city from repair_firms\n'
                             + 'left join cities on cities.id = repair_firms.city_id\n'
                             + 'order by id asc';
    const queryResult = await pool.query(getAllFirmsQuery);
    const firms = queryResult.rows;
    return { firms };
};

exports.createFirm = async (name, address, phone, cityId) => {
    const insertFirmQuery = 'insert into repair_firms(name, address, phone, city_id)' +
        'values($1, $2, $3, $4)';
    const queryResult = await pool.query(insertFirmQuery, [name, address, phone, cityId]);
    const successInsertData = queryResult.rows[0];
    return {successInsertData};
};

exports.getFirmForView = async (id) => {
    const getFirmForView = 'select *, cities.name as city from repair_firms\n' +
        'inner join cities on cities.id = repair_firms.city_id where repair_firms.id = $1';
    const queryResult = await pool.query(getFirmForView, [id]);
    const firm = queryResult.rows;
    return firm;
};

exports.getInsertFirmInfo = async () => {
    const getCitiesQuery = 'select * from cities order by id asc';
    const queryResult = await pool.query(getCitiesQuery);
    const cities = queryResult.rows;
    return {cities};
};


exports.getUpdateFirmInfo = async (id) => {
    const getCurrentFirmData = 'select * from repair_firms where id=$1';
    const getCurrentQueryResult = await pool.query(getCurrentFirmData, [id]);
    const current = getCurrentQueryResult.rows[0];
    const getCitiesQuery = 'select * from cities order by id asc';
    const queryResult = await pool.query(getCitiesQuery);
    const cities = queryResult.rows;
    return {current, cities};
};

exports.updateFirmById = async (id, name, address, phone, cityId) => {
    const updateFirmQuery = 'update repair_firms\n' +
        'set name=$1, address=$2, phone=$3, city_id=$4\n' +
        'where id=$5';
    const queryResult = await pool.query(updateFirmQuery, [name, address, phone, cityId, id]);
    const updatedFirm = queryResult.rows[0];
    return {updatedFirm};
};

exports.findFirms = async (data) => {
    const getFirmsByData = 'select repair_firms.id, repair_firms.name, address, phone, cities.name as city from repair_firms\n' +
                           'inner join cities on cities.id = repair_firms.city_id\n' +
                           'where repair_firms.name ilike $1 or\n' +
                           'address ilike $1';
    const queryResult = await pool.query(getFirmsByData, [data + '%']);
    const firms = queryResult.rows;
    return {firms};
};

exports.getPotentialDeleteFirmProblems = async (id) => {
    const getProblemsQuery = 'select \n' +
        'count(distinct masters.id) as masters,\n' +
        'count(distinct orders.id) as orders,\n' +
        'count(distinct repairs.id) as repairs\n' +
        'from repair_firms\n' +
        'inner join masters on masters.firm_id = repair_firms.id\n' +
        'inner join orders on orders.master_id = masters.id\n' +
        'inner join repairs on repairs.order_id = orders.id\n' +
        'where repair_firms.id = $1';
    const queryResult = await pool.query(getProblemsQuery, [id]);
    const problems = queryResult.rows[0];
    return problems;
};

exports.deleteFirms = async (ids) => {
    const deleteFirmsQuery = 'delete from repair_firms where id=$1';
    for (const id of ids) {
        await pool.query(deleteFirmsQuery, [id]);
    }
    const getAllFirmsQuery = 'select repair_firms.id, repair_firms.name, address, phone, cities.name as city from repair_firms\n'
        + 'left join cities on cities.id = repair_firms.city_id\n'
        + 'order by id asc';
    const queryResult = await pool.query(getAllFirmsQuery);
    const firms = queryResult.rows;
    return {firms};
};
