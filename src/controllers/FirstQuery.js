const pool = require('../database/pool');

exports.getQueryInfo = async () => {
    const getFirmsQuery = 'select * from repair_firms';
    const queryResult = await pool.query(getFirmsQuery);
    const firms = queryResult.rows;
    return {firms};
};


exports.getTableByQuery = async (firmId) => {
    const queryFirstPart = 'select brands.name as brand, repair_firms.name, repair_firms.id, count(*) from brands\n' +
                'left join devices on brand_id = brands.id\n' +
                'left join orders on orders.device_id = devices.id\n' +
                'left join masters on masters.id = orders.master_id\n' +
                'left join repair_firms on masters.firm_id = repair_firms.id\n' +
                'where repair_firms.id = $1\n' +
                'group by brands.name, repair_firms.name, repair_firms.id\n' +
                'order by count(*) desc\n' +
                'limit 3';
    let queryResult = await pool.query(queryFirstPart, [firmId]);
    const brands = queryResult.rows;
    const querySecondPart = 'select name from devices\n' +
        'left join brands on brand_id = brands.id\n' +
        'group by name\n' +
        'order by count(*) desc\n' +
        'limit 3';
    queryResult = await pool.query(querySecondPart);
    const secondBrands = queryResult.rows;
    return {brands, secondBrands};
};
