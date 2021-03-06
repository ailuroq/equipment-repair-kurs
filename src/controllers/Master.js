const pool = require('../database/pool');

exports.getAllMasters = async () => {
    const getAllMastersQuery = 'select masters.id, lastname, firstname, middlename, experience, repair_firms.name as firm, posts.name as post from masters\n'
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

exports.getUpdateMasterInfo = async (id) => {
    const getCurrentMasterDataQuery = 'select lastname, firstname, middlename, experience, firm_id as firmid, repair_firms.name as firm, post_id as postid, posts.name as post from masters\n' +
        'inner join posts on posts.id = masters.post_id\n' +
        'inner join repair_firms on repair_firms.id = masters.firm_id\n' +
        'where masters.id=$1';
    const currentDataQueryResult = await pool.query(getCurrentMasterDataQuery, [id]);
    const current = currentDataQueryResult.rows[0];
    const getFirmQuery = 'select * from repair_firms';
    const getPostsQuery = 'select * from posts';
    const queryFirmResult = await pool.query(getFirmQuery);
    const firms = queryFirmResult.rows;
    const queryPostsResult = await pool.query(getPostsQuery);
    const posts = queryPostsResult.rows;
    console.log(current)
    return {current, firms, posts};
};

exports.updateMaster = async (id, lastname, firstname, middlename, experience, firmId, postId) => {
    const updateMasterQuery = 'update masters\n' +
        'set lastname=$1, firstname=$2, middlename=$3, experience=$4, firm_id=$5, post_id=$6\n' +
        'where masters.id =$7';
    const queryResult = await pool.query(updateMasterQuery, [lastname, firstname, middlename, experience, firmId, postId, id]);
    const updateInfo = queryResult.rows[0];
    return {updateInfo};
};

exports.findMasters = async (data) => {
    const getAllMastersQuery = 'select masters.id, lastname, firstname, middlename, experience, repair_firms.name as firm, posts.name as post from masters\n'
        + 'left join posts on posts.id = post_id\n'
        + 'inner join repair_firms on repair_firms.id = masters.firm_id\n' +
        'where lastname ilike $1 or firstname ilike $1';
    const queryResult = await pool.query(getAllMastersQuery, [data + '%']);
    const masters = queryResult.rows;
    return {masters};
};

exports.deleteMasterById = async (ids) => {
    const deleteMaster = 'delete from masters where id = $1';
    for (const id of ids) {
        await pool.query(deleteMaster, [id]);
    }
};

exports.getMasterForView = async (id) => {
    const getMasterById = 'select masters.id, lastname, firstname, middlename, experience, repair_firms.name as firm, posts.name as post from masters\n' +
                          'left join repair_firms on repair_firms.id = firm_id\n' +
                          'left join posts on posts.id = post_id\n' +
                          'where masters.id = $1';
    const queryResult = await pool.query(getMasterById, [id]);
    const master = queryResult.rows[0];
    console.log(master)
    return {master};
};

exports.getPotentialMasterDataToDelete = async (id) => {
    const getProblemsQuery = 'select count(distinct orders.id) as orders, count(distinct repairs.id) as repairs from masters\n' +
        'inner join orders on orders.master_id = masters.id\n' +
        'inner join repairs on repairs.order_id = orders.id\n' +
        'where masters.id = $1';
    const queryResult = await pool.query(getProblemsQuery, [id]);
    const problems = queryResult.rows[0];
    return {problems};
};

