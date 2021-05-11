const pool = require('../database/pool');

exports.getAllBrands = async () => {
    const getAllBrandsQuery = 'select * from brands order by id asc';
    const queryResult = await pool.query(getAllBrandsQuery);
    const brands = queryResult.rows;
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
        'from brands\n' +
        'inner join devices on devices.brand_id = brands.id\n' +
        'inner join orders on orders.device_id = devices.id\n' +
        'inner join repairs on repairs.order_id = orders.id\n' +
        'where brands.id = $1';
    const queryResult = await pool.query(getPotentialProblemsQuery, [id]);
    const problems = queryResult.rows[0];
    return problems;
};

exports.updateBrand = async (id, name) => {
    const updateBrandQuery = 'update brands\n' +
        'set name=$1 where id=$2';
    await pool.query(updateBrandQuery, [name, id]);
    const getAllBrandsQuery = 'select * from brands order by id asc';
    const queryResult = await pool.query(getAllBrandsQuery);
    const brands = queryResult.rows;
    return {brands};
};

exports.findBrands = async (data) => {
    if (!data) {
        const getAllBrandsQuery = 'select * from brands order by id asc';
        const queryResult = await pool.query(getAllBrandsQuery);
        const brands = queryResult.rows;
        return {brands};
    }
    const findBrandsQuery = 'select * from brands where name ilike $1';
    const queryResult = await pool.query(findBrandsQuery, [data + '%']);
    const brands = queryResult.rows;
    return {brands};
};
