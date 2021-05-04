const pool = require('../database/pool');

exports.getTableByQuery = async (month, year) => {
    const numberMonth = Number(month);
    const numberYear = Number(year);
    const query = 'select sum(work.price),count(*) as works,orders.order_date, repair_firms.id as firm, repair_firms.name from repair_firms\n' +
                  'inner join orders on firm_id = repair_firms.id\n' +
                  'inner join repairs on order_id = orders.id\n' +
                  'inner join work on repairs.work_id = work.id\n' +
                  'where extract(month from orders.order_date) = $1 and\n' +
                  'extract(year from orders.order_date) = $2\n' +
                  'group by repair_firms.id, orders.order_date\n' +
                  'order by repair_firms.id asc';
    const queryResult = await pool.query(query, [numberMonth, numberYear]);
    const table = queryResult.rows;
    return {table};
};
