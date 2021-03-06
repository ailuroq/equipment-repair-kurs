const pool = require('../database/pool');

//Выбор всех выполненных заказов мастера за определенный период
exports.ordersDoneByMaster = async (mastersId, from, to) => {
    const query = 'select orders.id, receipt_number, to_char(order_date, \'dd-mm-yyyy\') as order_date, to_char(completion_date, \'dd-mm-yyyy\') as completion_date, device_names.name from orders\n' +
        'inner join masters on masters.id = orders.master_id\n' +
        'inner join devices on devices.id = orders.device_id\n' +
        'inner join device_names on device_names.id = devices.name_id\n' +
        'where orders.order_date >= $1\n' +
        'and orders.order_date < $2\n' +
        'and masters.id = $3\n' +
        'and orders.completion_date is not null';
    const queryResult = await pool.query(query, [from, to, mastersId]);
    const orders = queryResult.rows;
    return orders;
};
exports.ordersNotDoneByMaster = async (mastersId, from, to) => {
    const query = 'select orders.id, receipt_number, to_char(order_date, \'dd-mm-yyyy\') as order_date, to_char(completion_date, \'dd-mm-yyyy\') as completion_date, device_names.name from orders\n' +
        'inner join masters on masters.id = orders.master_id\n' +
        'inner join devices on devices.id = orders.device_id\n' +
        'inner join device_names on device_names.id = devices.name_id\n' +
        'where orders.order_date >= $1\n' +
        'and orders.order_date < $2\n' +
        'and masters.id = $3\n' +
        'and orders.completion_date is null';
    const queryResult = await pool.query(query, [from, to, mastersId]);
    const orders = queryResult.rows;
    return orders;
};

//Подсчет всех невыполненных заказов
exports.notMadeOrders = async () => {
    const query = 'select orders.id, receipt_number, to_char(order_date, \'dd-mm-yyyy\') as order_date, to_char(completion_date, \'dd-mm-yyyy\') as completion_date, device_names.name from orders\n' +
        'inner join devices on devices.id = orders.device_id\n' +
        'inner join device_names on device_names.id = devices.name_id\n' +
        'where completion_date is null\n' +
        'order by devices.id asc';
    const queryResult = await pool.query(query);
    const orders = queryResult.rows;
    return {orders};
};
//Группировка работ по типу
exports.groupRepairByType = async () => {
    const query = 'select repairs.id, repairs.completion, work.type, repairs.price from repairs\n' +
        'right join work on work.id = repairs.work_id\n' +
        'right join orders on orders.id = repairs.order_id\n' +
        'group by work.type, repairs.id\n' +
        'order by repairs.id asc';
    const queryResult = await pool.query(query);
    const repairs = queryResult.rows;
    return {repairs};
};
//Подсчет мастеров в каждой фирме
exports.countMastersPerFirm = async () => {
    const query = 'select count(masters.id), repair_firms.name, repair_firms.id from repair_firms\n' +
        'inner join masters on masters.firm_id = repair_firms.id\n' +
        'group by repair_firms.name, repair_firms.id\n';
    const queryResult = await pool.query(query);
    const firms = queryResult.rows;
    return {firms};
};
//Выбрать производителя и всю его технику
exports.findDevicesByBrand = async (id) => {
    const query = 'select devices.id, device_names.name as name, devices.photo, country.name as country, brands.name as brand, devices.model, clients.lastname as client from devices\n' +
        'inner join clients on clients.id = devices.client_id\n' +
        'inner join country on country.id = devices.country_id\n' +
        'inner join brands on brands.id = devices.brand_id\n' +
        'inner join device_names on device_names.id = devices.name_id\n' +
        'where devices.brand_id = $1\n' +
        'order by devices.id';
    const queryResult = await pool.query(query, [id]);
    const devices = queryResult.rows;
    return {devices};
};


//Группировка техники по странам
exports.groupDevicesByCountries = async () => {
    const query = 'select devices.id, device_names.name, devices.photo, devices.model, country.name as country, brands.name as brand from devices\n' +
        'inner join brands on brands.id = devices.brand_id\n' +
        'inner join device_names on device_names.id = devices.name_id\n' +
        'inner join country on country.id = devices.country_id\n' +
        'group by devices.id, country.name, device_names.name, devices.photo, brands.name';
    const queryResult = await pool.query(query);
    const devices = queryResult.rows;
    return {devices};
};
//Запрос на запросе по принципу левого соединения
exports.noOrderPerPeriod = async (from, to) => {
    /*const query = 'select * from (\n' +
        '\tselect count(orders.id), repair_firms.id, repair_firms.name, repair_firms.phone,orders.order_date, orders.completion_date from repair_firms\n' +
        '\tleft join masters on masters.firm_id = repair_firms.id\n' +
        '\tleft join orders on orders.master_id = masters.id\n' +
        '\tgroup by repair_firms.id, repair_firms.name, repair_firms.phone, orders.order_date, orders.completion_date\n' +
        '\torder by repair_firms.id\n' +
        ') result\n' +
        'where result.count = 0 \n' +
        'and (result.order_date >= $1 or result.completion_date < $2) or\n' +
        '(result.order_date is null and result.completion_date is null)';*/
    const query = 'select * from (\n' +
        '\tselect count(orders.id), repair_firms.id, repair_firms.name, repair_firms.phone,orders.order_date, orders.completion_date from repair_firms\n' +
        '\tleft join masters on masters.firm_id = repair_firms.id\n' +
        '\tleft join orders on orders.master_id = masters.id and orders.order_date >= $1 and  orders.completion_date < $2\n' +
        '\tgroup by repair_firms.id, repair_firms.name, repair_firms.phone, orders.order_date, orders.completion_date\n' +
        '\torder by repair_firms.id\n' +
        ') result\n' +
        'where result.count = 0';
    const queryResult = await pool.query(query, [from, to]);
    const firms = queryResult.rows;
    return {firms};
};


//Итоговый запрос без условия
exports.countOrdersPerFirm = async () => {
    const countQuery = 'select count(orders.id), repair_firms.name, repair_firms.id from repair_firms\n' +
        'inner join masters on masters.firm_id = repair_firms.id\n' +
        'inner join orders on orders.master_id = masters.id\n' +
        'group by repair_firms.id\n' +
        'order by repair_firms.id';
    const queryResult = await pool.query(countQuery);
    const firms = queryResult.rows;
    return {firms};
};

exports.groupOrdersByCities = async () => {
    const groupQuery = 'select count(orders.id) as orders, cities.name as orders from repair_firms\n' +
        'inner join masters on masters.firm_id = repair_firms.id\n' +
        'inner join orders on orders.master_id = masters.id\n' +
        'inner join cities on cities.id = repair_firms.city_id\n' +
        'group by cities.name, cities.id\n' +
        'order by cities.id';
    const queryResult = await pool.query(groupQuery);
    const group = queryResult.rows;
    return {group};
};

//Итоговый запрос на данные и на группы
exports.countOrdersPerPeriod = async (from, to, id) => {
    const countQuery = 'select count(orders.id) as orders from repair_firms\n' +
        'inner join masters on masters.firm_id = repair_firms.id\n' +
        'inner join orders on orders.master_id = masters.id\n' +
        'inner join cities on cities.id = repair_firms.city_id\n' +
        'where orders.order_date >= $1\n' +
        'and orders.order_date < $2\n' +
        'and repair_firms.id = $3';
    const queryResult = await pool.query(countQuery, [from, to, id]);
    const orders = queryResult.rows[0];
    return {orders};
};

//Самый дорогой заказ
exports.theMostExpensiveOrder = async () => {
    const query = 'select sum(repairs.price), orders.id, to_char(order_date, \'dd-mm-yyyy\') as order_date, to_char(completion_date, \'dd-mm-yyyy\') as completion_date from orders\n' +
        'inner join masters on orders.master_id = masters.id\n' +
        'inner join repair_firms on masters.firm_id = repair_firms.id\n' +
        'inner join repairs  on repairs.order_id = orders.id\n' +
        'group by orders.id\n' +
        'having orders.completion_date is not null\n' +
        'order by sum desc\n' +
        'limit 1';
    const queryResult = await pool.query(query);
    const order = queryResult.rows[0];
    return {order};
};

//Фирмы, где средний опыт работы сотрудников больше среднего
exports.mastersExpMoreAvg = async () => {
    const query = 'select * from (\n' +
        '\tselect repair_firms.id, repair_firms.name, round(avg(experience)) as avgexp from repair_firms\n' +
        '\tinner join masters on masters.firm_id = repair_firms.id\n' +
        '\tgroup by repair_firms.id\n' +
        '\torder by repair_firms.id\n' +
        ') result\n' +
        'where result.avgexp > (select round(avg(experience)) as avgExp from masters)';
    const queryResult = await pool.query(query);
    const firms = queryResult.rows;
    return firms;
};
