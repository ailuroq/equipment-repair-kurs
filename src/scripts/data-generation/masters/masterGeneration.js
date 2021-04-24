const pool = require('../../../database/pool');
const generations = require('../full-name-generation/generations');
const { ordersGeneration } = require('../orders/orderGeneration');

exports.masterGeneration = async () => {
    try {
        const seqResetQuery = "SELECT setval('masters_id_seq', 0);";
        await pool.query(seqResetQuery);

        const countFirmQuery = 'SELECT count(*) AS exact_count FROM repair_firms;';
        const resultQuery = await pool.query(countFirmQuery);
        const numberOfMasters = resultQuery.rows[0].exact_count * 4;

        let firmId;
        let postId;

        const getRandomPostNameQuery = 'SELECT * FROM posts \n'
                                     + 'ORDER BY random()\n'
                                     + 'LIMIT 1;';

        const insertMasterQuery = 'INSERT INTO masters(lastname, firstname, middlename, experience, firm_id, post_id) '
                                + 'VALUES($1, $2, $3, $4, $5, $6) returning *';

        for (let i = 1; i <= numberOfMasters; i++) {
            const fullName = await generations.fullNameGeneration();
            const experience = Math.floor(Math.random() * 30);
            if (i <= numberOfMasters / 4) firmId = i;
            else firmId = Math.floor(Math.random() * numberOfMasters / 4) + 1;
            const requestData = await pool.query(getRandomPostNameQuery);
            postId = requestData.rows[0].id;
            const values = [
                fullName.randomLastname,
                fullName.randomFirstname,
                fullName.randomMiddlename,
                experience,
                firmId,
                postId
            ];
            console.log(values);
            await pool.query(insertMasterQuery, values, (err) => {
                if (err) throw err;
            });
        }
        ordersGeneration();
    }
    catch (e) {
        console.log(e);
    }
};
