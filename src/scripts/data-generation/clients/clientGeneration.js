const pool = require('./../../../database/pool')
const generations = require("../full-name-generation/generations");
exports.clientGeneration = async (numberOfClients) => {
    try {
        let seqResetQuery = "SELECT setval('clients_id_seq', 0);"
        await pool.query(seqResetQuery)
        let insertClientsQuery = `INSERT INTO clients(lastname, firstname, middlename, phone) VALUES($1, $2, $3, $4) returning *`
        for (let i = 0; i < numberOfClients; i++) {
            const fullName = await generations.fullNameGeneration()
            const values = [
                fullName.randomLastname,
                fullName.randomFirstname,
                fullName.randomMiddlename,
                generations.randomPhoneNumberGeneration()
            ]
            await pool.query(insertClientsQuery, values, (err) => {
                if (err) throw err
            })
        }

    } catch (e) {
        console.log(e)
    }
}