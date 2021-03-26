const pool = require('./../../../database/pool')
const generations = require("../full-name-generation/generations");

exports.masterGeneration = async () => {
    try {
        let seqResetQuery = "SELECT setval('masters_id_seq', 0);"
        await pool.query(seqResetQuery)
        let firmId
        let postId

        let getRandomPostNameQuery = "SELECT * FROM posts \n" +
            "ORDER BY random()\n" +
            "LIMIT 1;"

        let insertMasterQuery = "INSERT INTO masters(lastname, firstname, middlename, experience, firm_id, post_id) " +
                    "VALUES($1, $2, $3, $4, $5, $6) returning *"

        for (let i = 1; i <= 20000; i++) {
            const fullName = await generations.fullNameGeneration()
            let experience = Math.floor(Math.random() * 30)
            if (i <= 10000) firmId = i
            else firmId = Math.floor(Math.random() * 10000) + 1
            const requestData = await pool.query(getRandomPostNameQuery)
            postId = requestData.rows[0].id
            const values = [
                fullName.randomLastname,
                fullName.randomFirstname,
                fullName.randomMiddlename,
                experience,
                firmId,
                postId
            ]
            console.log(values)
            await pool.query(insertMasterQuery,values, (err) => {
                if (err) throw err
            })
        }

    } catch (e) {
        console.log(e)
    }
}
