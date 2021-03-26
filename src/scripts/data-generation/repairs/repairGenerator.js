const pool = require('./../../../database/pool')
const generations = require("../full-name-generation/generations");
exports.repairGeneration = async () => {
    try {
        let seqResetQuery = "SELECT setval('repairs_id_seq', 0);"
        await pool.query(seqResetQuery)

        let orderId
        let workId
        let completion

        let insertRepairQuery = "INSERT INTO repairs(order_id, work_id, completion) " +
                                "VALUES($1, $2, $3) returning *"

        for (let i = 1; i <= 20000; i++) {
            if (i <= 15000) orderId = i
            else orderId = Math.floor(Math.random() * 10000) + 1

            workId = Math.floor(Math.random() * 4) + 1
            completion = Math.random() < 0.8;

            const example = [orderId]
            let result = await pool.query("SELECT * FROM orders " +
                "WHERE id IN ($1)", example)

            if (result.rows[0].order_completed) completion = true

            const values = [
                orderId,
                workId,
                completion
            ]
            console.log(values)
            await pool.query(insertRepairQuery, values, (err) => {
                if (err) throw err
            })
        }

    } catch (e) {
        console.log(e)
    }
}