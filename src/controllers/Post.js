const pool = require('../database/pool');

exports.getAllPosts = async () => {
    const getAllPostsQuery = 'select * from posts order by id asc';
    const queryResult = await pool.query(getAllPostsQuery);
    const posts = queryResult.rows;
    return {posts};
};

exports.createPost = async (name) => {
    const createPostQuery = 'insert into posts(name) values($1)';
    const queryResult = await pool.query(createPostQuery, [name]);
    const post = queryResult.rows[0];
    return {post};
};

exports.deletePosts = async (ids) => {
    const deletePostsQuery = 'delete from posts where id=$1';
    for (const id of ids) {
        await pool.query(deletePostsQuery, [id]);
    }
    const getAllQuery = 'select * from posts';
    const getAllResult = await pool.query(getAllQuery);
    const posts = getAllResult.rows;
    return {posts};
};

exports.getPotentialCountryDataToDelete = async (id) => {
    const getPotentialDeletePostQuery = 'select\n' +
        'count(distinct masters.id) as masters,\n' +
        'count(distinct orders.id) as orders,\n' +
        'count(distinct repairs.id) as repairs\n' +
        'from posts\n' +
        'inner join masters on posts.id = masters.post_id\n' +
        'inner join orders on orders.master_id = masters.id\n' +
        'inner join repairs on repairs.order_id = orders.id\n' +
        'where posts.id = $1';
    const queryResult = await pool.query(getPotentialDeletePostQuery, [id]);
    const problems = queryResult.rows[0];
    return {problems};
};

exports.updatePost = async (id, name) => {
    const updatePostQuery = 'update posts\n' +
        'set name=$1 where id=$2';
    const queryResult = await pool.query(updatePostQuery, [name, id]);
    const updatedPost = queryResult.rows[0];
    return {updatedPost};
};

exports.findPosts = async (name) => {
    const findPostsQuery = 'select * from posts where name ilike $1';
    const queryResult = await pool.query(findPostsQuery, [name + '%']);
    const posts = queryResult.rows;
    return {posts};
};
