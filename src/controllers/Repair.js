const pool = require('../database/pool');

exports.getAllRepairs = async () => {
    const getAllRepairsQuery = 'select repairs.id, receipt_number, work.type, work.price, completion from repairs\n' +
                               'left join orders on orders.id = order_id\n' +
                               'left join work on work.id = work_id';
    const queryResult = await pool.query(getAllRepairsQuery);
    const repairs = queryResult.rows;
    console.log(repairs);
    return { repairs };
};

exports.deleteRepairs = async (ids) => {
    const deleteRepairsQuery = 'delete from repairs where id=$1'
    for (const id of ids) {
        await pool.query(deleteRepairsQuery, [id]);

    }
    const getAllRepairsQuery = 'select * from repairs'
}
