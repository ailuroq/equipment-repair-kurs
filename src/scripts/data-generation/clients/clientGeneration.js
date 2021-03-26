const pool = require('./../../../database/pool')
const generations = require("../full-name-generation/generations");
const {deviceGeneration} = require("../devices/deviceGeneration");

exports.clientGeneration = async (numberOfClients) => {
    try {
        let seqResetQuery = "SELECT setval('clients_id_seq', 0);"
        await pool.query(seqResetQuery)

        let insertClientsQuery = "INSERT INTO clients(lastname, firstname, middlename, phone) " +
                                 "VALUES($1, $2, $3, $4) returning *"

        for (let i = 0; i < numberOfClients; i++) {
            const fullName = await generations.fullNameGeneration()
            const values = [
                fullName.randomLastname,
                fullName.randomFirstname,
                fullName.randomMiddlename,
                generations.randomPhoneNumberGeneration()
            ]
            console.log(values)
            await pool.query(insertClientsQuery, values, (err) => {
                if (err) throw err
            })
        }
        deviceGeneration()
    } catch (e) {
        console.log(e)
    }
}