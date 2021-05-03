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
};

exports.updateBrand = async (id, name) => {
    const updateBrandQuery = 'update brands\n' +
        'set name=$1 where id=$2';
    const queryResult = await pool.query(updateBrandQuery, [id, name]);
    const updatedBrand = queryResult.rows[0];
    return {updatedBrand};
};
