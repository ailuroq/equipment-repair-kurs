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
    const deleteRepairsQuery = 'delete from repairs where id=$1';
    for (const id of ids) {
        await pool.query(deleteRepairsQuery, [id]);
    }
    const getAllRepairsQuery = 'select repairs.id, receipt_number, work.type, work.price, completion from repairs\n' +
        'left join orders on orders.id = order_id\n' +
        'left join work on work.id = work_id';
    const queryResult = await pool.query(getAllRepairsQuery);
    const repairs = queryResult.rows;
    return {repairs};
};

exports.updateRepair = async (id, orderId, workId, completion, price) => {
    const updateRepairQuery = 'update repairs\n' +
        'set order_id=$1, work_id=$2, completion=$3, price=$4\n' +
        'where id=$5';
    await pool.query(updateRepairQuery, [orderId, workId, completion, price, id]);
};

exports.getUpdateRepairInfo = async () => {
    const getCurrentInfoQuery = 'select orders.receipt_number, work.type, repairs.id, repairs.completion, repairs.price from repairs\n' +
        'inner join orders on orders.id = repairs.order_id\n' +
        'inner join work on work.id = repairs.work_id';
    const queryCurrentInfoResult = await pool.query(getCurrentInfoQuery);
    const current = queryCurrentInfoResult.rows;
    const getOrdersQuery = 'select * from orders';
    const queryOrdersResult = await pool.query(getOrdersQuery);
    const orders = queryOrdersResult.rows;
    const getWorksQuery = 'select * from work';
    const queryWorksResult = getWorksQuery.rows;
    const works = queryWorksResult.rows;
    return {current, orders, works};
};

exports.getRepairForView = async (id) => {
    const getRepairForViewQuery = 'select orders.receipt_number, work.type, repairs.id, repairs.completion, repairs.price from repairs\n' +
        'inner join orders on orders.id = repairs.order_id\n' +
        'inner join work on work.id = repairs.work_id';
    const queryResult = await pool.query(getRepairForViewQuery, [id]);
    const repairs = queryResult.rows;
    return {repairs};
};

exports.getInsertRepairInfo = async (id) => {
    const getCurrentInfoQuery = 'select orders.receipt_number, work.type, repairs.id, repairs.completion, repairs.price from repairs\n' +
        'inner join orders on orders.id = repairs.order_id\n' +
        'inner join work on work.id = repairs.work_id';
    const queryCurrentInfoResult = await pool.query(getCurrentInfoQuery);
    const current = queryCurrentInfoResult.rows;
    return {current};
};

exports.findRepairs = async (completion, price) => {
    const findRepairsQuery = 'select orders.receipt_number, work.type, repairs.id, repairs.completion, repairs.price from repairs\n' +
        'inner join orders on orders.id = repairs.order_id\n' +
        'inner join work on work.id = repairs.work_id\n' +
        'where completion=$1 or price=$2';
    const queryResult = await pool.query(findRepairsQuery, [completion, price]);
    const repairs = queryResult.rows;
    return {repairs};
};

exports.insertRepair = async (orderId, workId, completion, price) => {
    const insertRepair = 'insert into repairs(order_id, work_id, completion, price)\n' +
        'values($1,$2,$3,$4)';
    const queryResult = await pool.query(insertRepair, [orderId, workId, completion, price]);
    const repairs = queryResult.rows;
    return {repairs};
};

