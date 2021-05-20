const pool = require('../database/pool');

exports.getAllOrders = async () => {
    const getAllOrdersQuery = 'select orders.id, receipt_number, to_char(order_date, \'dd-mm-yyyy\') as order_date, to_char(completion_date, \'dd-mm-yyyy\') as completion_date, order_completed, device_names.name as device, masters.lastname as master from orders\n' +
        'inner join masters on masters.id = orders.master_id\n' +
        'inner join devices on devices.id = orders.device_id\n' +
        'inner join device_names on device_names.id = devices.name_id\n' +
        'order by id asc';
    const queryResult = await pool.query(getAllOrdersQuery);
    const orders = queryResult.rows;
    return { orders };
};

exports.getInsertOrderInfo = async () => {
    const getMastersQuery = 'select * from masters';
    const getDevicesQuery = 'select * from devices\n' +
        'inner join device_names on name_id = device_names.id';
    const queryFirmsResult = await pool.query(getMastersQuery);
    const masters = queryFirmsResult.rows;
    const queryDevicesResult = await pool.query(getDevicesQuery);
    const devices = queryDevicesResult.rows;
    return { masters, devices };
};

exports.insertOrder = async (receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId) => {
    const insertOrderQuery = 'insert into orders(receipt_number, order_date, completion_date, order_completed, device_id, master_id)\n' +
        'values($1,$2,$3,$4,$5,$6)';
    await pool.query(insertOrderQuery, [receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId]);
};

exports.getUpdateOrderInfo = async (id) => {
    const getCurrentDataQuery = 'select * from orders where id=$1';
    const currentDataQueryResult = await pool.query(getCurrentDataQuery, [id]);
    const current = currentDataQueryResult.rows[0];
    const getFirmsQuery = 'select * from repair_firms';
    const getDevicesQuery = 'select * from devices';
    const queryFirmsResult = await pool.query(getFirmsQuery);
    const firms = queryFirmsResult.rows;
    const queryDevicesResult = await pool.query(getDevicesQuery);
    const devices = queryDevicesResult.rows;
    return {current, firms, devices};
};

exports.updateOrderById = async (id, receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId) => {
    const updateOrderQuery = 'update orders' +
        'set receipt_number=$1, order_date=$2, completion_date=$3, order_completed=$4, device_id=$5, master_id=$6' +
        'where orders.id = $7';
    await pool.query(updateOrderQuery, [receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId]);
};

exports.getPotentialOrderDataToDelete = async (id) => {
    const getPotentialProblemsQuery = 'select count(distinct repairs.id) as repairs from orders\n' +
        'inner join repairs on repairs.order_id = orders.id\n' +
        'where orders.id = $1';
    const queryResult = await pool.query(getPotentialProblemsQuery, [id]);
    const problems = queryResult.rows[0];
    return {problems};
};


exports.deleteOrders = async (ids) => {
    const deleteOrdersQuery = 'delete from orders where id=$1';
    for (const id of ids) {
        await pool.query(deleteOrdersQuery, [id]);
    }
    const getAllOrdersQuery = 'select orders.id, receipt_number, order_date, completion_date, order_completed, device_names.name as device, repair_firms.name as firm from orders\n'
        + 'left join repair_firms on repair_firms.id = orders.firm_id\n'
        + 'left join devices on devices.id = orders.device_id\n'
        + 'left join device_names on device_names.id = devices.name_id\n'
        + 'order by id asc';
    const queryResult = await pool.query(getAllOrdersQuery);
    const orders = queryResult.rows;
    return {orders};
};

exports.getOrderForView = async (id) => {
    const getOrderForView = 'select orders.id, receipt_number, order_date, completion_date, order_completed, device_names.name, devices.photo, masters.lastname, masters.firstname, masters.middlename, repair_firms.name as firm\n' +
        'from orders\n' +
        'inner join masters on masters.id = orders.master_id\n' +
        'inner join repair_firms on masters.firm_id = repair_firms.id\n' +
        'inner join devices on devices.id = orders.device_id\n' +
        'inner join device_names on device_names.id = devices.name_id\n' +
        'where orders.id = $1';
    let queryResult = await pool.query(getOrderForView, [id]);
    const order = queryResult.rows[0];
    const getRepairsQuery = 'select * from repairs\n' +
        'inner join orders on orders.id = repairs.order_id\n' +
        'where orders.id = $1';
    queryResult = await pool.query(getRepairsQuery, [id]);
    const repairs = queryResult.rows[0];
    const getDevice = 'select * from orders\n' +
        'inner join devices on orders.device_id = devices.id\n' +
        'where orders.id = $1';
    queryResult = await pool.query(getDevice, [id]);
    const device = queryResult.rows[0];
    const priceForOrderQuery = 'select sum(repairs.price) from orders\n' +
        'inner join masters on orders.master_id = masters.id\n' +
        'inner join repair_firms on masters.firm_id = repair_firms.id\n' +
        'inner join repairs  on repairs.order_id = orders.id\n' +
        'where orders.id = $1';
    queryResult = await pool.query(priceForOrderQuery, [id]);
    const price = queryResult.rows[0];
    return {device, order, repairs, price};
};

exports.findOrders = async (data) => {
    const findQuery = 'select orders.id, receipt_number, order_date, completion_date, order_completed, device_names.name as device, repair_firms.name as firm from orders\n'
        + 'left join repair_firms on repair_firms.id = orders.firm_id\n'
        + 'left join devices on devices.id = orders.device_id\n'
        + 'left join device_names on device_names.id = devices.name_id\n' +
        'where receipt_number=$1 or master_id=$1\n'
        + 'order by id asc';
    const queryResult = await pool.query(findQuery, [data]);
    const orders = queryResult.rows;
    return {orders};
};

