const pool = require('../database/pool');

exports.getAllDeviceNames = async () => {
    const getAllDeviceNames = 'select * from device_names order by id asc';
    const queryResult = await pool.query(getAllDeviceNames);
    const deviceNames = queryResult.rows[0];
    return {deviceNames};
};

exports.createDeviceName = async (name) => {
    const createDeviceName = 'insert into device_names(name) values($1)';
    const queryResult = await pool.query(createDeviceName, [name]);
    const deviceName = queryResult.rows[0];
    return {deviceName};
};

exports.deleteDeviceNames = async (ids) => {
    const deleteDeviceNamesQuery = 'delete from device_names where id=$1';
    for (const id of ids) {
        await pool.query(deleteDeviceNamesQuery, [id]);
    }
    const getAllDeviceNames = 'select * from device_names order by id asc';
    const queryResult = await pool.query(getAllDeviceNames);
    const deviceNames = queryResult.rows[0];
    return {deviceNames};
};

exports.getPotentialProblems = async (id) => {
    const getPotentialProblemsQuery = 'select \n' +
        'count(distinct devices.id) as devices,\n' +
        'count(distinct orders.id) as orders,\n' +
        'count(distinct repairs.id) as repairs\n' +
        'from country\n' +
        'inner join devices on devices.name_id = device_names.id\n' +
        'inner join orders on orders.device_id = devices.id\n' +
        'inner join repairs on repairs.order_id = orders.id\n' +
        'where country.id = $1';
    const queryResult = await pool.query(getPotentialProblemsQuery, [id]);
    const problems = queryResult.rows;
    return {problems};
};

exports.updateDeviceName = async (id, name) => {
    const updateDeviceNameQuery = 'update device_names\n' +
        'set name=$1 where id=$2';
    const queryResult = await pool.query(updateDeviceNameQuery, [id, name]);
    const updatedDeviceName = queryResult.rows[0];
    return {updatedDeviceName};
};
