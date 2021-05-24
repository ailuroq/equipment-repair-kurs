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
    const getDevicesQuery = 'select devices.id as id, device_names.name as name from devices\n' +
        'inner join device_names on name_id = device_names.id\n' +
        'order by devices.id asc';
    const queryFirmsResult = await pool.query(getMastersQuery);
    const masters = queryFirmsResult.rows;
    const queryDevicesResult = await pool.query(getDevicesQuery);
    const devices = queryDevicesResult.rows;
    return { masters, devices };
};

exports.insertOrder = async (orderDate, completionDate, orderCompleted, deviceId, masterId) => {
    const getBiggestNumber = await pool.query('select * from orders order by receipt_number desc limit 1');

    const insertOrderQuery = 'insert into orders(receipt_number, order_date, completion_date, order_completed, device_id, master_id)\n' +
        'values($1,$2,$3,$4,$5,$6)';

    await pool.query(insertOrderQuery, [getBiggestNumber.rows[0].receipt_number + 1, orderDate, completionDate, orderCompleted, deviceId, masterId]);
};

exports.getUpdateOrderInfo = async (id) => {
    const getCurrentDataQuery = 'select orders.receipt_number, orders.order_date, orders.completion_date, orders.order_completed, orders.device_id, device_names.name as device, masters.lastname as master, masters.id as master_id from orders\n' +
        'inner join masters on masters.id = orders.master_id\n' +
        'inner join devices on devices.id = orders.device_id\n' +
        'inner join device_names on device_names.id = devices.name_id\n' +
        'where orders.id = $1';
    const currentDataQueryResult = await pool.query(getCurrentDataQuery, [id]);
    const current = currentDataQueryResult.rows[0];
    const getFirmsQuery = 'select * from masters';
    const getDevicesQuery = 'select devices.id as id, device_names.name as name from devices\n' +
        'inner join device_names on device_names.id = devices.name_id\n' +
        'order by devices.id';
    const queryMastersResult = await pool.query(getFirmsQuery);
    const masters = queryMastersResult.rows;
    const queryDevicesResult = await pool.query(getDevicesQuery);
    const devices = queryDevicesResult.rows;
    return {current, masters, devices};
};

exports.updateOrderById = async (id, orderDate, completionDate, orderCompleted, deviceId, masterId) => {
    const updateOrderQuery = 'update orders\n' +
        'set order_date=$1, completion_date=$2, order_completed=$3, device_id=$4, master_id=$5\n' +
        'where orders.id = $6';
    await pool.query(updateOrderQuery, [orderDate, completionDate, orderCompleted, deviceId, masterId, id]);
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
    const getRepairsQuery = 'select repairs.id, repairs.completion, repairs.price, work.type from repairs\n' +
        'inner join orders on orders.id = repairs.order_id\n' +
        'inner join work on work.id = repairs.work_id\n' +
        'where orders.id = $1';
    queryResult = await pool.query(getRepairsQuery, [id]);
    const repairs = queryResult.rows;
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
    if (!data) return;
    if (data === 'Готов') data = true;
    if (data === 'Не готов') data = false;
    let findQuery;
    if (data === true || data === false) {
        findQuery = 'select orders.id, receipt_number, to_char(order_date, \'dd-mm-yyyy\') as order_date, to_char(completion_date, \'dd-mm-yyyy\') as completion_date, order_completed, device_names.name as device, masters.lastname as master from orders\n' +
            'inner join masters on masters.id = orders.master_id\n' +
            'inner join devices on devices.id = orders.device_id\n' +
            'inner join device_names on device_names.id = devices.name_id\n' +
            'where order_completed=$1' +
            'order by id asc';
    }
    if (parseInt(data)) {
        findQuery = 'select orders.id, receipt_number, to_char(order_date, \'dd-mm-yyyy\') as order_date, to_char(completion_date, \'dd-mm-yyyy\') as completion_date, order_completed, device_names.name as device, masters.lastname as master from orders\n' +
            'inner join masters on masters.id = orders.master_id\n' +
            'inner join devices on devices.id = orders.device_id\n' +
            'inner join device_names on device_names.id = devices.name_id\n' +
            'where receipt_number=$1' +
            'order by id asc';
    }
    const queryResult = await pool.query(findQuery, [data]);
    const orders = queryResult.rows;
    return {orders};
};

