const pool = require('../database/pool');
const moment = require('moment');

exports.getAllRepairs = async () => {
    const getAllRepairsQuery = 'select repairs.id, receipt_number, work.type, price, completion from repairs\n' +
                               'left join orders on orders.id = order_id\n' +
                               'left join work on work.id = work_id\n' +
                               'order by repairs.id asc';
    const queryResult = await pool.query(getAllRepairsQuery);
    const repairs = queryResult.rows;
    return { repairs };
};

exports.deleteRepairs = async (ids) => {
    const deleteRepairsQuery = 'delete from repairs where id=$1';
    for (const id of ids) {
        await checkOrdersCompletion(id);
        await pool.query(deleteRepairsQuery, [id]);
    }
};

exports.updateRepair = async (id, orderId, workId, completion, price) => {
    const updateRepairQuery = 'update repairs\n' +
        'set order_id=$1, work_id=$2, completion=$3, price=$4\n' +
        'where id=$5';
    await pool.query(updateRepairQuery, [orderId, workId, completion, price, id]);
    await checkOrdersCompletion(id);
};

exports.getUpdateRepairInfo = async (id) => {
    const getCurrentInfoQuery = 'select orders.receipt_number, work.type, orders.id as order, work.id as work, repairs.id, repairs.completion, repairs.price from repairs\n' +
        'inner join orders on orders.id = repairs.order_id\n' +
        'inner join work on work.id = repairs.work_id\n' +
        'where repairs.id = $1';
    const queryCurrentInfoResult = await pool.query(getCurrentInfoQuery, [id]);
    const current = queryCurrentInfoResult.rows[0];
    const getOrdersQuery = 'select * from orders order by id asc';
    const queryOrdersResult = await pool.query(getOrdersQuery);
    const orders = queryOrdersResult.rows;
    const getWorksQuery = 'select * from work order by id asc';
    const queryWorksResult = await pool.query(getWorksQuery);
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
/*

exports.getInsertRepairInfo = async () => {
    const getCurrentInfoQuery = 'select orders.receipt_number, work.type, repairs.id, repairs.completion, repairs.price from repairs\n' +
        'inner join orders on orders.id = repairs.order_id\n' +
        'inner join work on work.id = repairs.work_id';
    const queryCurrentInfoResult = await pool.query(getCurrentInfoQuery);
    const current = queryCurrentInfoResult.rows;
    return {current};
};
*/

exports.getInsertRepairInfo = async () => {
    const getWorksQuery = 'select * from work';
    const getWorksQueryResult = await pool.query(getWorksQuery);
    const works = getWorksQueryResult.rows;
    const getOrdersQuery = 'select * from orders';
    const getOrdersQueryResult = await pool.query(getOrdersQuery);
    const orders = getOrdersQueryResult.rows;
    return {works, orders};
};

exports.findRepairs = async (data) => {
    const findRepairsQuery = 'select orders.receipt_number, work.type, repairs.id, repairs.completion, repairs.price from repairs\n' +
        'inner join orders on orders.id = repairs.order_id\n' +
        'inner join work on work.id = repairs.work_id\n' +
        'where type ilike $1';
    const queryResult = await pool.query(findRepairsQuery, [data + '%']);
    const repairs = queryResult.rows;
    return {repairs};
};

exports.insertRepair = async (orderId, workId, completion, price) => {
    const insertRepair = 'insert into repairs(order_id, work_id, completion, price)\n' +
        'values($1,$2,$3,$4) returning id';
    const queryResult = await pool.query(insertRepair, [orderId, workId, completion, price]);
    const repairs = queryResult.rows[0];
    console.log(repairs.id)
    await checkOrdersCompletion(repairs.id);
    return {repairs};
};

const checkOrdersCompletion = async (id) => {
    const checkQuery = 'select completion, order_id from repairs\n' +
        'inner join orders on orders.id = repairs.order_id\n' +
        'where orders.id = (\n' +
        '\tselect orders.id as orders from repairs\n' +
        '\tinner join orders on orders.id = repairs.order_id\n' +
        '\twhere repairs.id = $1\n' +
        ')';
    const queryResult = await pool.query(checkQuery, [id]);
    let flag = true;
    const orderId = queryResult.rows[0].order_id;
    const dateNow = moment(new Date()).format('DD-MM-YYYY');
    const setOrderCompletedQuery = `update orders set order_completed=true, completion_date='${dateNow}' where orders.id = $1`;
    const setOrderNotCompletedQuery = 'update orders set order_completed=false, completion_date=null where orders.id = $1';
    for (const repair of queryResult.rows) {
        if (repair.completion === false) {
            flag = false;
        }
    }
    if (flag) await pool.query(setOrderCompletedQuery, [orderId]);
    if (!flag) await pool.query(setOrderNotCompletedQuery, [orderId]);
};
