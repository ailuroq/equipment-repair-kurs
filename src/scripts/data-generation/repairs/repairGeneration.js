const pool = require('./../../../database/pool')

exports.repairGeneration = async () => {
    try {
        let seqResetQuery = "SELECT setval('repairs_id_seq', 0);"
        await pool.query(seqResetQuery)

        let orderId
        let workId
        let completion

        let countOrdersQuery = "SELECT count(*) AS exact_count FROM orders;"
        const resultQuery = await pool.query(countOrdersQuery)
        const numberOfOrders = resultQuery.rows[0].exact_count
        const numberOfRepairs = resultQuery.rows[0].exact_count * 3

        let insertRepairQuery = "INSERT INTO repairs(order_id, work_id, completion) " +
                                "VALUES($1, $2, $3) returning *"

        for (let i = 1; i <= numberOfRepairs; i++) {
            if (i <= numberOfOrders) orderId = i
            else orderId = Math.floor(Math.random() * numberOfOrders) + 1

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
        pool.end(() => {
            console.log('pool has ended')
        })

    } catch (e) {
        console.log(e)
    }
}