const pool = require('../database/pool');

exports.getAllBrands = async () => {
    const getAllBrandsQuery = 'select * from brands order by id asc';
    const queryResult = await pool.query(getAllBrandsQuery);
    const brands = queryResult.rows[0];
    return {brands};
};

exports.createBrand = async (name) => {
    const createBrand = 'insert into brands(name) values($1)';
    const queryResult = await pool.query(createBrand, [name]);
    const brand = queryResult.rows[0];
    return {brand};
};

exports.deleteBrands = async (ids) => {
    const deleteBrandQuery = 'delete from brands where id=$1';
    for (const id of ids) {
        await pool.query(deleteBrandQuery, [id]);
    }
    const getAllBrandsQuery = 'select * from brands';
    const queryAllResult = await pool.query(getAllBrandsQuery);
    const brands = queryAllResult.rows;
    return {brands};
};

exports.getPotentialProblems = async (id) => {
    const getPotentialProblemsQuery = 'select \n' +
        'count(distinct devices.id) as devices,\n' +
        'count(distinct orders.id) as orders,\n' +
        'count(distinct repairs.id) as repairs\n' +
        'from country\n' +
        'inner join devices on devices.brand_id = brands.id\n' +
        'inner join orders on orders.device_id = devices.id\n' +
        'inner join repairs on repairs.order_id = orders.id\n' +
        'where country.id = $1';
    const queryResult = await pool.query(getPotentialProblemsQuery, [id]);
    const problems = queryResult.rows;
    return {problems};
};

exports.updateBrand = async (id, name) => {
    const updateBrandQuery = 'update brands\n' +
        'set name=$1 where id=$2';
    const queryResult = await pool.query(updateBrandQuery, [id, name]);
    const updatedBrand = queryResult.rows[0];
    return {updatedBrand};
};
