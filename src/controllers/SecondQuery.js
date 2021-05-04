const pool = require('../database/pool')

exports.getTableByQuery = async () => {
    const query = 'select repair_firms.id, repair_firms.name, round(avg(experience)) as avgExp from repair_firms\n' +
                  'inner join masters on masters.firm_id = repair_firms.id\n' +
                  'group by repair_firms.id\n' +
                  'order by repair_firms.id';
    const queryResult = await pool.query(query);
    const table = queryResult.rows;
    return {table};
};

exports.getTableByQuery2 = async () => {
    const query = 'select round(avg(experience)) as avgExp from masters'
    const queryResult = await pool.query(query);
    const table = queryResult.rows;
    return {table};
}
