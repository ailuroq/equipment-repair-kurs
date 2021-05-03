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
};

exports.getPotentialCountryDataToDelete = async (id) => {

};

exports.updateCountry = async (id, name) => {
    const updateCountryQuery = 'update country\n' +
        'set name=$1 where id=$2';
    const queryResult = await pool.query(updateCountryQuery, [id, name]);
    const updatedCountry = queryResult.rows[0];
    return {updatedCountry};
};
