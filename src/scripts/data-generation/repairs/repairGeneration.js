const pool = require('../../../database/pool');

exports.repairGeneration = async () => {
    try {
        const seqResetQuery = "SELECT setval('repairs_id_seq', 0);";
        await pool.query(seqResetQuery);

        let orderId;
        let workId;
        let completion;
        let price;

        const countOrdersQuery = 'SELECT count(*) AS exact_count FROM orders;';
        const resultQuery = await pool.query(countOrdersQuery);
        const numberOfOrders = resultQuery.rows[0].exact_count;
        const numberOfRepairs = resultQuery.rows[0].exact_count * 3;

        const insertRepairQuery = 'INSERT INTO repairs(order_id, work_id, completion, price) '
                                + 'VALUES($1, $2, $3, $4) returning *';

        for (let i = 1; i <= numberOfRepairs; i++) {
            if (i <= numberOfOrders) orderId = i;
            else orderId = Math.floor(Math.random() * numberOfOrders) + 1;
            price = Math.floor(Math.random() * 5000 + 1);
            workId = Math.floor(Math.random() * 4) + 1;
            completion = Math.random() < 0.8;

            const example = [orderId];
            const result = await pool.query('SELECT * FROM orders '
                + 'WHERE id IN ($1)', example);

            if (result.rows[0].order_completed) completion = true;

            const values = [
                orderId,
                workId,
                completion,
                price
            ];
            console.log(values);
            await pool.query(insertRepairQuery, values, (err) => {
                if (err) throw err;
            });
        }
        pool.end(() => {
            console.log('Генерация закончилась успешно!');
        });
    }
    catch (e) {
        console.log(e);
    }
};
