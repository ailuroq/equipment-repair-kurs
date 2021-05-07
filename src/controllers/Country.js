const pool = require('../database/pool');

exports.getAllCountries = async () => {
    const getAllCountriesQuery = 'select * from country order by id asc';
    const queryResult = await pool.query(getAllCountriesQuery);
    const countries = queryResult.rows[0];
    return {countries};
};

exports.createCountry = async (name) => {
    const createCountryQuery = 'insert into country(name) values($1)';
    const queryResult = await pool.query(createCountryQuery, [name]);
    const country = queryResult.rows[0];
    return {country};
};

exports.deleteCountries = async (ids) => {
    const deleteCountriesQuery = 'delete from country where id=$1';
    for (const id of ids) {
        await pool.query(deleteCountriesQuery, [id]);
    }
};

exports.getPotentialCountryDataToDelete = async (id) => {
    const getPotentialProblemsQuery = 'select \n' +
        'count(distinct devices.id) as devices,\n' +
        'count(distinct orders.id) as orders,\n' +
        'count(distinct repairs.id) as repairs\n' +
        'from country\n' +
        'inner join devices on devices.country_id = country.id\n' +
        'inner join orders on orders.device_id = devices.id\n' +
        'inner join repairs on repairs.order_id = orders.id\n' +
        'where country.id = $1';
    const queryResult = await pool.query(getPotentialProblemsQuery, [id]);
    const problems = queryResult.rows;
    return { problems };
};

exports.updateCountry = async (id, name) => {
    const updateCountryQuery = 'update country\n' +
        'set name=$1 where id=$2';
    const queryResult = await pool.query(updateCountryQuery, [id, name]);
    const updatedCountry = queryResult.rows[0];
    return {updatedCountry};
};
