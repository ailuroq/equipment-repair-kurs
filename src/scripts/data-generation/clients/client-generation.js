const pool = require('../../../database/pool')
const generations = require("../common/generations");

clientGeneration = async () => {
    let query = `INSERT INTO client(lastname, firstname, middlename, phone) VALUES($1, $2, $3, $4) returning *`
    try {
        for (let i = 0; i <= 10000; i++) {
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

    }
}

clientGeneration()