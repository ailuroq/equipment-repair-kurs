const pool = require('../database/pool');

exports.getAllFirms = async () => {
    const getAllFirmsQuery = 'select repair_firms.id, repair_firms.name, address, phone, cities.name from repair_firms\n'
                             + 'left join cities on cities.id = repair_firms.city_id\n'
                             + 'order by id asc';
    const queryResult = await pool.query(getAllFirmsQuery);
    const firms = queryResult.rows;
    return { firms };
};
