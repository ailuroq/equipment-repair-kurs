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
    const getFirmQuery = 'select * from repair_firms';
    const getPostsQuery = 'select * from posts';
    const queryFirmResult = await pool.query(getFirmQuery);
    const firms = queryFirmResult.rows;
    const queryPostsResult = await pool.query(getPostsQuery);
    const posts = queryPostsResult.rows;
    return { firms, posts };
};

exports.insertMaster = async (lastname, firstname, middlename, experience, post_id, firm_id) => {
    const insertMasterQuery = 'insert into masters(lastname, firstname, middlename, experience, post_id, firm_id)\n' +
                              'values($1, $2, $3, $4, $5, $6)';
    const queryResult = await pool.query(insertMasterQuery, [lastname, firstname, middlename, experience, post_id, firm_id]);
    const master = queryResult.rows[0];
    return {master};
};

exports.deleteMasterById = async (id) => {
    const deleteMaster = 'delete from masters where id = $1';
    let queryResult = await pool.query(deleteMaster, [id]);
    const getAllMastersQuery = 'select * from masters order by id asc';
    queryResult = await pool.query(getAllMastersQuery);
    const masters = queryResult.rows;
    return {masters};
};

exports.getMasterForView = async (id) => {
    const getMasterById = 'select masters.id, lastname, firstname, middlename, experience, repair_firms.name as firm, posts.name as post from masters\n' +
                          'left join repair_firms on repair_firms.id = firm_id\n' +
                          'left join posts on posts.id = post_id';
    const queryResult = await pool.query(getMasterById, [id]);
    const master = queryResult.rows;
    return {master};
};
