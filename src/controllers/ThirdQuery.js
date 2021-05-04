const pool = require('../database/pool');

exports.getTableByQuery = async (month, year) => {
    const numberMonth = Number(month);
    const numberYear = Number(year);
    const query = 'select sum(work.price),count(*) as works, repair_firms.id as id, repair_firms.name from repair_firms\n' +
                  'inner join orders on firm_id = repair_firms.id\n' +
                  'inner join repairs аon order_id = orders.id\n' +
                  'inner join work on repairs.work_id = work.id\n' +
                  'where extract(month from orders.order_date) = $1 and\n' +
                  'extract(year from orders.order_date) = $2\n' +
                  'group by repair_firms.id\n' +
                  'order by repair_firms.id asc\n'
    const queryResult = await pool.query(query, [numberMonth, numberYear]);
    const table = queryResult.rows;
    return {table};
};
