const pool = require('./../database/pool')

exports.createDevice = async () => {
    const insertDeviceQuery = ""
    const queryResult = await pool.query(insertDeviceQuery, [])
    const successInsertData = queryResult.rows[0]
    return {successInsertData}
}

exports.getAllDevices = async () => {
    const getAllDevicesQuery = "SELECT * FROM devices"
    const queryResult = await pool.query(getAllDevicesQuery)
    const devices = queryResult.rows
    return {devices}
}

exports.getLimitedDevices = async (limit) => {
    const getDevicesQuery = "SELECT * FROM devices\n" +
                            "ORDER BY id ASC LIMIT $1"
    const queryResult = await pool.query(getDevicesQuery, [limit])
    const devices = queryResult.rows
    return {devices}
}

exports.updateDeviceById = async () => {
    const updateDeviceQuery = "UPDATE devices" +
        "SET "
}