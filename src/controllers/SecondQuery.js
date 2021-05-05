const pool = require('../database/pool')

exports.getTableByQuery = async () => {
    const query = 'select repair_firms.id, repair_firms.name, round(avg(experience)) as avgExp from repair_firms\n' +
                  'inner join masters on masters.firm_id = repair_firms.id\n' +
                  'group by repair_firms.id\n' +
                  'order by repair_firms.id';
    let queryResult = await pool.query(query);
    const table = queryResult.rows;
    const query2 = 'select round(avg(experience)) as avgExp from masters';
    queryResult = await pool.query(query2);
    const avg = queryResult.rows[0].avgexp;
    return {table, avg};
};

