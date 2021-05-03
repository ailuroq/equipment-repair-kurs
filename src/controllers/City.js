const pool = require('../database/pool');

exports.getAllCities = async () => {
    const getAllCitiesQuery = 'select * from cities order by id asc';
    const queryResult = await pool.query(getAllCitiesQuery);
    const cities = queryResult.rows[0];
    return {cities};
};

exports.createCity = async (name) => {
    const createCityQuery = 'insert into cities(name) values($1)';
    const queryResult = await pool.query(createCityQuery, [name]);
    const city = queryResult.rows[0];
    return {city};
};

exports.deleteCities = async (ids) => {
    const deleteCityQuery = 'delete from cities where id=$1';
};

exports.getPotentialCityDataToDelete = async (id) => {

};

exports.updateCity = async (id, name) => {
    const updateCityQuery = 'update cities\n' +
        'set name=$1 where id=$2';
    const queryResult = await pool.query(updateCityQuery, [id, name]);
    const updatedCity = queryResult.rows[0];
    return {updatedCity};
};
