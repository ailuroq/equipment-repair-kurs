const pool = require('../database/pool');
const {badRequest} = require('boom');

exports.login = async (login, password) => {
    const findUserQuery = 'select * from users where login=$1 and password=$2';
    console.log(login, password)
    const queryResult = await pool.query(findUserQuery, [login, password]);
    console.log(queryResult.rows)
    const result = queryResult.rows;
    if (!result.length) {
        return false;
    }
    else return true;
};
