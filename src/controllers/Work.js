const pool = require('../database/pool');

exports.getAllWorks = async () => {
    const getAllWorksQuery = 'select * from work order by id asc';
    const queryResult = await pool.query(getAllWorksQuery);
    const works = queryResult.rows;
    return {works};
};

exports.createWork = async (name) => {
    const createWorkQuery = 'insert into work(name) values($1)';
    const queryResult = await pool.query(createWorkQuery, [name]);
    const work = queryResult.rows[0];
    return {work};
};

exports.deleteWorks = async (ids) => {
    const deleteWorksQuery = 'delete from works where id=$1';
    for (const id of ids) {
        await pool.query(deleteWorksQuery, [id]);
    }
    const getAllQuery = 'select * from work';
    const queryResult = await pool.query(getAllQuery);
    const works = queryResult.rows[0];
    return {works};
};

exports.getPotentialCountryDataToDelete = async (id) => {
    const getPotentialProblemsQuery = 'select count(distinct repairs.id) from work\n' +
        'inner join repairs on repairs.work_id = work.id\n' +
        'where work.id = $1';
    const queryResult = await pool.query(getPotentialProblemsQuery, [id]);
    const problems = queryResult.rows;
    return {problems};
};

exports.updateWork = async (id, name) => {
    const updateWorkQuery = 'update work\n' +
        'set name=$1 where id=$2';
    const queryResult = await pool.query(updateWorkQuery, [name, id]);
    const updatedWork = queryResult.rows[0];
    return {updatedWork};
};

exports.findWorks = async (name) => {
    const findWorksQuery = 'select * from work where name ilike $2';
    const queryResult = await pool.query(findWorksQuery, [name + '%']);
    const works = queryResult.rows[0];
    return {works};
};
