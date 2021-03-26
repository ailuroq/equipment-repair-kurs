const pool = require('./../../../database/pool')

exports.deviceGeneration = async (numberOfDevices) => {
    try {
        let seqResetQuery = "SELECT setval('devices_id_seq', 0);"
        await pool.query(seqResetQuery)
        let nameId
        let photo
        let countryId
        let brandId
        let clientId
        let model
        let photos = [
            'camera.jpg',
            'fax.jpg',
            'gamapad.jpg',
            'headphones.jpg',
            'keyboard.jpg',
            'laptop.jpg',
            'micriphone.jpg',
            'mouse.jpg',
            'phone.jpg',
            'player.jpg',
            'printer.jpg',
            'pult.jpg',
            'quadcopter.jpg',
            'refrigerator.jpg',
            'screen.jpg',
            'speaker.jpg',
            'tablet.jpg',
            'watch.jpg',
            'web-camera.jpg',
        ]

        let getRandomBrandQuery = "SELECT * FROM brands\n" +
                                  "ORDER BY random()\n" +
                                  "LIMIT 1;"

        let getRandomDeviceNameQuery = "SELECT * FROM device_names \n" +
                                  "ORDER BY random()\n" +
                                  "LIMIT 1;"

        let getRandomCountryNameQuery = "SELECT * FROM country \n" +
                                   "ORDER BY random()\n" +
                                   "LIMIT 1;"

        let insertDeviceQuery = "INSERT INTO devices(name_id, photo, country_id, brand_id, client_id, model) " +
                                "VALUES($1, $2, $3, $4, $5, $6) returning *"

        for (let i = 1; i <= numberOfDevices; i++) {
            let requestData = await pool.query(getRandomDeviceNameQuery)
            nameId = requestData.rows[0].id
            requestData = await pool.query(getRandomCountryNameQuery)
            countryId = requestData.rows[0].id
            requestData = await pool.query(getRandomBrandQuery)
            brandId = requestData.rows[0].id
            if (i <= numberOfDevices/2) {
                clientId = i
            } else {
                clientId = Math.floor(Math.random() * numberOfDevices/2) + 1
            }
            model = Math.random().toString(36).substring(7)
            photo = photos[Math.floor(Math.random() * photos.length)]
            //nameId, photo, countryId, brandId, clientId, model
            const values = [
                nameId,
                photo,
                countryId,
                brandId,
                clientId,
                model
            ]
            console.log(values)
            await pool.query(insertDeviceQuery,values, (err) => {
                if (err) throw err
            })

        }
    } catch (e) {
        throw e
    }
}