const pool = require('./../database/pool')

exports.createClient = async (lastname, firstname, middlename, phone) => {
    const insertClientQuery = "INSERT INTO clients(lastname, firstname, middlename, phone) VALUES($1, $2, $3, $4) RETURNING *"
    const queryResult = await pool.query(insertClientQuery, [lastname, firstname, middlename, phone])
    const successInsertData = queryResult.rows[0]
    return {successInsertData}
}

exports.deleteClientById = async (id) => {
    const deleteClientQuery = "delete from clients\n" +
                              "where id = $1"
    let queryResult = await pool.query(deleteClientQuery, [id])
    const getAllClientsQuery = "select * from clients order by id asc"
    queryResult = await pool.query(getAllClientsQuery)
    const clients = queryResult.rows
    return {clients}
}

exports.getPotentialProblems = async (id) => {
    const getProblemsInfoQuery = "select \n" +
                                 "count(distinct devices.id) as devices,\n" +
                                 "count(distinct orders.id) as orders,\n" +
                                 "count(distinct repairs.id) as repairs\n" +
                                 "from clients\n" +
                                 "left join devices on clients.id = devices.client_id\n" +
                                 "left join orders on orders.device_id = devices.id\n" +
                                 "left join repairs on orders.id = repairs.order_id\n" +
                                 "left join work on repairs.work_id = work.id\n" +
                                 "where clients.id = $1"
    const queryResult = await pool.query(getProblemsInfoQuery, [id])
    const problems = queryResult.rows[0]
    return problems
}

exports.getAllClients = async () => {
    const getAllClientsQuery = "SELECT * FROM clients ORDER BY id ASC"
    const queryResult = await pool.query(getAllClientsQuery)
    const clients = queryResult.rows
    return {clients}
}


exports.getLimitedClients = async (limit) => {
    const getClientsQuery = "SELECT * FROM clients\n" +
                            "ORDER BY id ASC LIMIT $1"

    const queryResult = await pool.query(getClientsQuery, [limit])
    const clients = queryResult.rows
    return {clients}
}

exports.updateClientById = async (id, lastname, firstname, middlename, phone) => {
    const updateClientQuery = "UPDATE clients" +
                              "SET lastname = $1, firstname = $2, middlename = $3, phone = $4" +
                              "WHERE id = $5 RETURNING *"
    const queryResult = await pool.query(updateClientQuery, [lastname, firstname, middlename, phone, id])
    const updatedClient = queryResult.rows[0]
    return {updatedClient}
}


exports.getClientForView = async(id) => {
    const getClientById = "select * from clients\n" +
                          "where clients.id = $1"
    const getClientDevices = "select devices.id, photo, brands.name as brand, device_names.name, model, country.name as country from devices\n\n" +
                             "left join brands on brands.id = brand_id\n" +
                             "left join clients on clients.id = client_id\n" +
                             "left join device_names on device_names.id = name_id\n" +
                             "left join country on country.id = country_id\n" +
                             "where clients.id = $1"
    let queryResult = await pool.query(getClientById, [id])
    const client = queryResult.rows
    queryResult = await pool.query(getClientDevices, [id])
    const clientDevices = queryResult.rows
    return {client, clientDevices}
}

exports.findClients = async (clientData) => {
    const getClientsByData = "select * from clients where lastname=$1 or firstname=$1"
    const queryResult = await pool.query(getClientsByData, [clientData])
}