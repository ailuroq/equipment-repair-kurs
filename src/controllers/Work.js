const pool = require('../database/pool');

exports.getAllWorks = async () => {
    const getAllWorksQuery = 'select * from works order by id asc';
    const queryResult = await pool.query(getAllWorksQuery);
    const works = queryResult.rows[0];
    return {works};
};

exports.createWork = async (name) => {
    const createWorkQuery = 'insert into works(name) values($1)';
    const queryResult = await pool.query(createWorkQuery, [name]);
    const work = queryResult.rows[0];
    return {work};
};

exports.deleteWorks = async (ids) => {
    const deleteWorksQuery = 'delete from works where id=$1';
};

exports.getPotentialCountryDataToDelete = async (id) => {

};

exports.updateWork = async (id, name) => {
    const updateWorkQuery = 'update works\n' +
        'set name=$1 where id=$2';
    const queryResult = await pool.query(updateWorkQuery, [id, name]);
    const updatedWork = queryResult.rows[0];
    return {updatedWork};
};
