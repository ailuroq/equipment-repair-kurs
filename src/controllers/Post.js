const pool = require('../database/pool');

exports.getAllPosts = async () => {
    const getAllPostsQuery = 'select * from posts order by id asc';
    const queryResult = await pool.query(getAllPostsQuery);
    const posts = queryResult.rows[0];
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
};

exports.getPotentialCountryDataToDelete = async (id) => {

};

exports.updatePost = async (id, name) => {
    const updatePostQuery = 'update posts\n' +
        'set name=$1 where id=$2';
    const queryResult = await pool.query(updatePostQuery, [id, name]);
    const updatedPost = queryResult.rows[0];
    return {updatedPost};
};
