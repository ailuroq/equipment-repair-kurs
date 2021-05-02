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

exports.updateOrder = async () => {
    const updateOrderQuery = ''
}

exports.deleteOrders = async (ids) => {
};
