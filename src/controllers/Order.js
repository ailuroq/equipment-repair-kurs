const pool = require('../database/pool');

exports.getAllOrders = async () => {
    const getAllOrdersQuery = 'select orders.id, receipt_number, order_date, completion_date, order_completed, device_names.name as device, repair_firms.name as firm from orders\n'
                             + 'left join repair_firms on repair_firms.id = orders.firm_id\n'
                             + 'left join devices on devices.id = orders.device_id\n'
                             + 'left join device_names on device_names.id = devices.name_id\n'
                             + 'order by id asc';
    const queryResult = await pool.query(getAllOrdersQuery);
    const orders = queryResult.rows;
    return orders;
};

exports.getInsertOrderInfo = async () => {
    const getFirmsQuery = 'select * from repair_firms';
    const getDevicesQuery = 'select * from devices';
    const queryFirmsResult = await pool.query(getFirmsQuery);
    const firms = queryFirmsResult.rows;
    const queryDevicesResult = await pool.query(getDevicesQuery);
    const devices = queryDevicesResult.rows;
    return { firms, devices }
};

exports.updateOrderById = async (id, receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId) => {
    const updateOrderQuery = 'update orders' +
        'set receipt_number=$1, order_date=$2, completion_date=$3, order_completed=$4, device_id=$5, master_id=$6' +
        'where orders.id = $7';
    await pool.query(updateOrderQuery, [receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId]);
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

exports.getOrderForView = async () => {

};

exports.findOrders = async (number, master) => {
    const findQuery = 'select orders.id, receipt_number, order_date, completion_date, order_completed, device_names.name as device, repair_firms.name as firm from orders\n'
        + 'left join repair_firms on repair_firms.id = orders.firm_id\n'
        + 'left join devices on devices.id = orders.device_id\n'
        + 'left join device_names on device_names.id = devices.name_id\n' +
        'where receipt_number=$1 or master_id=$2\n'
        + 'order by id asc';
    const queryResult = await pool.query(findQuery, [number, master]);
    const orders = queryResult.rows;
    return {orders};
};

