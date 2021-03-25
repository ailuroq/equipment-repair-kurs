const pool = require('./../../../database/pool')
const generations = require("../full-name-generation/generations");

exports.masterGeneration = async () => {
    try {
        let query = "INSERT INTO master(lastname, firstname, middlename, experience, firmId, postId) " +
                    "VALUES($1, $2, $3, $4) returning *"

        for (let i = 0; i <= 10000; i++) {
            const fullName = await generations.fullNameGeneration()
            let experience = Math.floor(Math.random() * 30)
            const values = [
                fullName.randomLastname,
                fullName.randomFirstname,
                fullName.randomMiddlename,
                experience,
                firmId,
                postId
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
