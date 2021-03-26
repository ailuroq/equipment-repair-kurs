const pool = require('./../../../database/pool')
const {repairGeneration} = require("../repairs/repairGeneration");

exports.ordersGeneration = async () => {
    try {
        let seqResetQuery = "SELECT setval('orders_id_seq', 0);"
        await pool.query(seqResetQuery)

        let countDevices = "SELECT count(*) AS exact_count FROM devices;"
        let resultQuery = await pool.query(countDevices)
        const numberOfOrders = resultQuery.rows[0].exact_count

        let countFirmsQuery = "SELECT count(*) AS exact_count FROM repair_firms;"
        resultQuery = await pool.query(countFirmsQuery)
        const numberOfFirms = resultQuery.rows[0].exact_count

        let orderDate
        let completionDate
        let isCompleted = false
        let deviceId
        let firmId

        let insertOrdersQuery = "INSERT INTO orders(receipt_number, order_date, completion_date, order_completed, device_id, firm_id) " +
            "VALUES($1, $2, $3, $4, $5, $6) returning *"

        for (let i = 1; i <= numberOfOrders; i++) {
            orderDate = randomDate(new Date(2000, 0, 1), new Date())
            isCompleted = false
            completionDate = null

            if (Math.random() < 0.65) {
                isCompleted = true
                completionDate = getDateMoreThan(orderDate)
            }
            deviceId = i
            if (i <= numberOfFirms) {
                firmId = i
            } else {
                firmId = Math.floor(Math.random() * numberOfFirms) + 1
            }

            const values = [
                i,
                orderDate,
                completionDate,
                isCompleted,
                deviceId,
                firmId
            ]
            console.log(values)
            await pool.query(insertOrdersQuery, values, (err) => {
                if (err) throw err
            })
        }
        repairGeneration()

    } catch (e) {
        throw e
    }
}


const getRandomArbitrary = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const isLeapYear = (year) => {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

const getFullDate = () => {
    //1999-01-08 - January 8, 1991
    let year
    let month
    let day

    const prettify = (num) => num > 9 ? `${num}` : `0${num}`

    year = getRandomArbitrary(2000, 2021)
    month = getRandomArbitrary(1, 12)

    if (month % 2) {
        day = getRandomArbitrary(1, 31)
    } else {
        day = getRandomArbitrary(1, 30)
        if (month === 2) {
            if (isLeapYear(year)) day = getRandomArbitrary(1, 29)
            else day = getRandomArbitrary(1, 28)
        }
    }
    return year + '-' + prettify(month) + '-' + prettify(day)
}

const getDateMoreThan = (date1) => {
    let date2
    do {
        date2 = randomDate(new Date(200, 0, 1), new Date())
    } while(date1 >= date2)
    return date2
}

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

console.log(randomDate(new Date(2012, 0, 1), new Date()));