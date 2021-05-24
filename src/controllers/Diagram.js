const pool = require('../database/pool');

exports.get1DDiagram = async () => {
    let labels = [], data = [];
    const query = 'select count(distinct masters.id) as value, posts.name as label from masters\n' +
        'inner join posts on posts.id = masters.post_id\n' +
        'group by posts.name';
    const queryResult = await pool.query(query);
    for (let i = 0; i < queryResult.rows.length; i++) labels.push(queryResult.rows[i].label);
    for (let i = 0; i < queryResult.rows.length; i++) data.push(queryResult.rows[i].value);
    return {
        queryResult: queryResult.rows,
        result: {
            labels,
            datasets: [
                {
                    label: 'Должности',
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(0,255,11)',
                        'rgb(0,255,217)',
                        'rgb(255,0,0)',
                        'rgb(201,255,0)'
                    ],
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data
                }
            ]
        }
    };
};

exports.get2DDiagram = async () => {
    let labels = [], data = [];
    const query = 'select repair_firms.id, repair_firms.name as label, round(avg(experience)) as value from repair_firms\n' +
        'inner join masters on masters.firm_id = repair_firms.id\n' +
        'group by repair_firms.id\n' +
        'order by repair_firms.id';
    const queryResult = await pool.query(query);
    for (let i = 0; i < queryResult.rows.length; i++) labels.push(queryResult.rows[i].label);
    for (let i = 0; i < queryResult.rows.length; i++) data.push(queryResult.rows[i].value);
    return {
        labels,
        datasets: [
            {
                label: 'Средний опыт работы',
                backgroundColor: [
                    'rgb(255, 205, 86)',
                ],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data
            }
        ]
    };
};

exports.get3DDiagram = async (cityId) => {
    const query = 'select brands.name as brand, cities.name,  count(*) from brands\n' +
        'left join devices on brand_id = brands.id\n' +
        'left join orders on orders.device_id = devices.id\n' +
        'left join masters on masters.id = orders.master_id\n' +
        'left join repair_firms on masters.firm_id = repair_firms.id\n' +
        'inner join cities on cities.id = repair_firms.id\n' +
        'where cities.id = $1\n' +
        'group by brands.name, cities.name\n' +
        'order by count(*) desc\n' +
        'limit 3';
    const queryResult = await pool.query(query, [cityId]);
    const result = queryResult.rows;
    return {result};
};
