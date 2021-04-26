const pool = require('../database/pool');

exports.getAllFirms = async () => {
    const getAllFirmsQuery = 'select repair_firms.id, repair_firms.name, address, phone, cities.name as city from repair_firms\n'
                             + 'left join cities on cities.id = repair_firms.city_id\n'
                             + 'order by id asc';
    const queryResult = await pool.query(getAllFirmsQuery);
    const firms = queryResult.rows;
    return { firms };
};


exports.getPotentialProblems = async (id) => {
    const getProblemsInfoQuery = 'select \n' +
        'count (distinct devices.id) as devices,\n' +
        'count (distinct clients.id) as clients,\n' +
        'count (distinct masters.id) as masters,\n' +
        'count (distinct orders.id) as orders,\n' +
        'count (distinct repairs.id) as repairs\n' +
        'from repair_firms\n' +
        'left join masters on masters.firm_id = repair_firms.id\n' +
        'left join orders on repair_firms.id = orders.firm_id\n' +
        'left join devices on orders.device_id = devices.id\n' +
        'left join repairs on repairs.order_id = orders.id\n' +
        'left join clients on devices.client_id = clients.id'
}
