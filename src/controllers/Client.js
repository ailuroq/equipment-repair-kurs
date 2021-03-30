const pool = require('./../database/pool')

exports.createClient = async (lastname, firstname, middlename, phone) => {
    const insertClientQuery = "INSERT INTO clients" +
                              "VALUES($1, $2, $3, $4) RETURNING *"
    const queryResult = await pool.query(insertClientQuery, [lastname, firstname, middlename, phone])
    const successInsertData = queryResult.rows[0]
    return {successInsertData}
}

exports.getAllClients = async () => {
    const getAllClientsQuery = "SELECT * FROM clients"
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
