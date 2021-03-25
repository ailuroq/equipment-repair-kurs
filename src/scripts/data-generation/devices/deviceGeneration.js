const pool = require('./../../../database/pool')

exports.deviceGeneration = async () => {
    try {
        let getRandomModelQuery = "SELECT * FROM model\n" +
                                  "ORDER BY random()\n" +
                                  "LIMIT 1;"

        let insertDeviceQuery = "INSERT INTO device(name, photo, countryId, brandId, clientId, modelId) " +
            "VALUES($1, $2, $3, $4, $5, $6) returning *"

        pool.connect((err, client, done) => {
            let modelId
            let countryId
            let brandId
            let clientId
            client.query(getRandomModelQuery, (err, result) => {
                if (err) {
                    throw err;
                }
                modelId = result.rows[0].id
                console.log(modelId)
                done()
            })
        })
    } catch (e) {
        throw e
    }
}