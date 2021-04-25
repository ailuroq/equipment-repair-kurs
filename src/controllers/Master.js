const pool = require('../database/pool');

exports.getAllMasters = async () => {
    const getAllMastersQuery = 'select masters.id, lastname, firstname, middlename, experience, posts.name as post from masters\n'
                             + 'left join posts on posts.id = post_id\n'
                             + 'left join repair_firms on repair_firms.id = firm_id';
    const queryResult = await pool.query(getAllMastersQuery);
    const masters = queryResult.rows;
    return { masters };
};

exports.getInsertInfo = async () => {
    const getCountriesQuery = 'select name from country';
    const getPostsQuery = 'select name from posts';
    const queryCountryResult = await pool.query(getCountriesQuery);
    const countries = queryCountryResult.rows;
    const queryPostsResult = await pool.query(getPostsQuery);
    const posts = queryPostsResult.rows;
    return { countries, posts };
};
