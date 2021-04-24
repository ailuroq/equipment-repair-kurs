const pool = require('../../../database/pool');
const { repairFirmGeneration } = require('../repair-firms/repairFirmGeneration');

exports.deviceGeneration = async () => {
    try {
        const seqResetQuery = "SELECT setval('devices_id_seq', 0);";
        await pool.query(seqResetQuery);

        const countClientsQuery = 'SELECT count(*) AS exact_count FROM clients;';
        const resultQuery = await pool.query(countClientsQuery);
        const numberOfDevices = resultQuery.rows[0].exact_count * 2;

        let nameId;
        let photo;
        let countryId;
        let brandId;
        let clientId;
        let model;
        const photos = [
            'laptop.jpg',
            'phone.jpg',
            'tablet.jpg',
            'camera.jpg',
            'watch.jpg',
            'keyboard.jpg',
            'mouse.jpg',
            'speaker.jpg',
            'headphones.jpg',
            'refrigerator.jpg',
            'player.jpg',
            'gamepad.jpg',
            'quadcopter.jpg',
            'screen.jpg',
            'printer.jpg',
            'fax.jpg',
            'microphone.jpg',
            'web-camera.jpg',
            'pult.jpg'
        ];

        const getRandomBrandQuery = 'SELECT * FROM brands\n'
                                  + 'ORDER BY random()\n'
                                  + 'LIMIT 1;';

        const getRandomDeviceNameQuery = 'SELECT * FROM device_names\n'
                                       + 'WHERE id = $1\n'
                                       + 'LIMIT 1';

        const getRandomCountryNameQuery = 'SELECT * FROM country \n'
                                        + 'ORDER BY random()\n'
                                        + 'LIMIT 1;';

        const insertDeviceQuery = 'INSERT INTO devices(name_id, photo, country_id, brand_id, client_id, model) '
                                + 'VALUES($1, $2, $3, $4, $5, $6) returning *';

        for (let i = 1; i <= numberOfDevices; i++) {
            const randomNumber = Math.floor(Math.random() * photos.length);
            let requestData = await pool.query(getRandomDeviceNameQuery, [randomNumber]);
            nameId = requestData.rows[0].id;
            requestData = await pool.query(getRandomCountryNameQuery);
            countryId = requestData.rows[0].id;
            requestData = await pool.query(getRandomBrandQuery);
            brandId = requestData.rows[0].id;
            model = Math.random().toString(36).substring(7);
            photo = photos[randomNumber];

            if (i <= numberOfDevices / 2) clientId = i;
            else clientId = Math.floor(Math.random() * numberOfDevices / 2) + 1;

            const values = [
                nameId,
                photo,
                countryId,
                brandId,
                clientId,
                model
            ];
            console.log(values);
            await pool.query(insertDeviceQuery, values, (err) => {
                if (err) throw err;
            });
        }
        repairFirmGeneration();
    }
    catch (e) {
        throw e;
    }
};
