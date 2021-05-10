const pool = require('../../../database/pool');
const fs = require('fs');
const path = require('path');

const files = ['brands.sql', 'cities.sql', 'posts.sql', 'country.sql', 'names.sql', 'work.sql'];

exports.deleteAndFillReferences = async () => {
    const deleteReferencesQuery = 'delete from brands;' +
        'delete from cities;' +
        'delete from country;' +
        'delete from posts;' +
        'delete from work;' +
        'delete from device_names;';
    await pool.query(deleteReferencesQuery);
    const seqReferencesResetQuery = 'SELECT setval(\'brands_id_seq\', 0);' +
        'SELECT setval(\'cities_id_seq\', 0);' +
        'SELECT setval(\'country_id_seq\', 0);' +
        'SELECT setval(\'posts_id_seq\', 0);' +
        'SELECT setval(\'work_id_seq\', 0);' +
        'SELECT setval(\'device_names_id_seq\', 0);';
    await pool.query(seqReferencesResetQuery);
    for (let i = 0; i < files.length; i++) {
        let sql = fs.readFileSync(path.resolve(__dirname, '../../../database/sql/', files[i])).toString('utf-8');
        await pool.query(sql);
    }
};

