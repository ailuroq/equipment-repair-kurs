const pool = require('./../../../database/pool')
const generations = require("../full-name-generation/generations");
exports.repairFirmGeneration = async () => {
    try {
        let query = "INSERT INTO repair_firm(name, address, phone, cityId) " +
                    "VALUES($1, $2, $3, $4) returning *"

        for (let i = 0; i <= 10000; i++) {
            let name
            let address
            let phone
            let cityId
            const fullName = await generations.fullNameGeneration()
            const values = [
                fullName.randomLastname,
                fullName.randomFirstname,
                fullName.randomMiddlename,
                generations.randomPhoneNumberGeneration()
            ]
            pool.connect((err, client, done) => {
                client.query(query, values, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    done()
                })
            })
        }

    } catch (e) {
        console.log(e)
    }
}