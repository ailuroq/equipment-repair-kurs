const pool = require('./../database/pool')

exports.createDevice = async () => {
    const insertDeviceQuery = ""
    const queryResult = await pool.query(insertDeviceQuery, [])
    const successInsertData = queryResult.rows[0]
    return {successInsertData}
}

exports.getAllDevices = async () => {
    const getAllDevicesQuery = "select devices.id as id, clients.id as client, country.name as country, brands.name as brand, device_names.name as name, model from devices\n" +
                               "left join country on country.id = devices.country_id\n" +
                               "left join clients on clients.id = devices.client_id\n" +
                               "left join brands on brands.id = devices.brand_id\n" +
                               "left join device_names on device_names.id = devices.name_id\n" +
                               "order by devices.id asc"
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