const pool = require('./../../../database/pool')
const generations = require("../full-name-generation/generations");
exports.repairFirmGeneration = async () => {
    try {
        let seqResetQuery = "SELECT setval('repair_firms_id_seq', 0);"
        await pool.query(seqResetQuery)
        let name
        let address
        let phone
        let cityId

        let firmName = [
            'СмартМастер',
            'СмартСервис',
            'СмартТехник',
            'АйДоктор',
            'Плаза',
            'Фазза',
            'Gadget-Market',
            'Device-Сервис',
            'Центр коммуникаций',
            'Телемах',
            'Почин',
            'Герц',
            'Феникс',
            'Перезагрузка',
        ]

        let streets = [
            'Речная',
            'Нагорная',
            'Пролетарская',
            'Школьная',
            'Озерная',
            'Рабочая',
            'Заводская',
            'Парковая',
            'Горького',
            'Дорожная',
            'Победы',
            'Центральная',
            'Лесная',
            'Советская',
            'Набережная',
            'Мира',
            'Ленина',
            'Зеленая',
            'Садовая',
            'Луговая',
            'Октябрьская',
            'Гагарина'
        ]
        let firmInsertQuery = "INSERT INTO repair_firms(name, address, phone, city_id) " +
                              "VALUES($1, $2, $3, $4) returning *"

        let getRandomCityQuery = "SELECT * FROM cities\n" +
                                 "ORDER BY random()\n" +
                                 "LIMIT 1;"

        for (let i = 1; i <= 10000; i++) {
            name = firmName[Math.floor(Math.random() * firmName.length)]
            address = streets[Math.floor(Math.random() * streets.length)] + ' ' + Math.floor(Math.random()*10)+1
            let requestData = await pool.query(getRandomCityQuery)
            cityId = requestData.rows[0].id
            phone = generations.randomPhoneNumberGeneration()
            const values = [
                name,
                address,
                phone,
                cityId
            ]
            console.log(values)
            await pool.query(firmInsertQuery, values, (err) => {
                if (err) throw err
            })
        }

    } catch (e) {
        console.log(e)
    }
}