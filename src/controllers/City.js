const pool = require('../database/pool');

exports.getAllCities = async () => {
    const getAllCitiesQuery = 'select * from cities order by id asc';
    const queryResult = await pool.query(getAllCitiesQuery);
    const cities = queryResult.rows;
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
    for (const id of ids) {
        await pool.query(deleteCityQuery, [id]);
    }
    const getAllQuery = 'select * from cities';
    const getAllResult = await pool.query(getAllQuery);
    const cities = getAllResult.rows;
    return {cities};
};

exports.getPotentialCityDataToDelete = async (id) => {
    const getPotentialDataQuery = 'select \n' +
                                'count(distinct repair_firms.id) as firm,\n' +
                                'count(distinct masters.id) as master,\n' +
                                'count(distinct orders.id) as order,\n' +
                                'count(distinct repairs.id) as repair\n' +
                                'from cities\n' +
                                'inner join repair_firms on repair_firms.city_id = cities.id\n' +
                                'inner join masters on repair_firms.id = masters.firm_id\n' +
                                'inner join orders on orders.master_id = masters.id\n' +
                                'inner join repairs on repairs.order_id = orders.id\n' +
                                'where cities.id = $1';
    const queryResult = await pool.query(getPotentialDataQuery, [id]);
    const problems = queryResult.rows[0];
    return {problems};
};

exports.updateCity = async (id, name) => {
    const updateCityQuery = 'update cities\n' +
        'set name=$1 where id=$2';
    const queryResult = await pool.query(updateCityQuery, [name, id]);
    const updatedCity = queryResult.rows[0];
    return {updatedCity};
};

exports.findCities = async (name) => {
    if (!name) {
        const getAllCitiesQuery = 'select * from cities order by id asc';
        const queryResult = await pool.query(getAllCitiesQuery);
        const cities = queryResult.rows;
        return {cities};
    }
    const findCitiesQuery = 'select * from cities where name ilike $1';
    const queryResult = await pool.query(findCitiesQuery, [name + '%']);
    const cities = queryResult.rows;
    return {cities};
};
