const fs = require('fs')
const pool = require('../../../database/pool')

clientGeneration = async () => {
    let query = `INSERT INTO client(lastname, firstname, middlename, phone) VALUES($1, $2, $3, $4) returning *`
    try {
        for (let i = 0; i <= 10000; i++) {
            const fullName = await fullNameGeneration()
            const values = [
                fullName.randomLastname,
                fullName.randomFirstname,
                fullName.randomMiddlename,
                randomPhoneNumberGeneration()
            ]
            pool.connect((err, client, done) => {
                client.query(query, values, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    done()
                })
            })
        }

    } catch (e) {

    }
}


const fileToArray = (filePath, array) => {
    return new Promise((res, rej) => {
        try {
            const lineReader = require('readline').createInterface({
                input: fs.createReadStream(filePath),
            });
            lineReader.on('line', (line) => {
                array.push(line);
            });
            lineReader.on('close', () => {
                res(array)
            })
        } catch (e) {
            rej(e)
        }
    })
}

const fullNameGeneration = async () => {
    let female_firstnames = []
    female_firstnames = await fileToArray("./female/female-firstnames", female_firstnames)
    let female_lastnames = []
    female_lastnames = await fileToArray("./female/female-lastnames", female_lastnames)
    let female_middlenames = []
    female_middlenames = await fileToArray("./female/female-middlenames", female_middlenames)
    let male_firstnames = []
    male_firstnames = await fileToArray("./male/male-firstnames", male_firstnames)
    let male_lastnames = []
    male_lastnames = await fileToArray("./male/male-lastnames", male_lastnames)
    let male_middlenames = []
    male_middlenames = await fileToArray("./male/male-middlenames", male_middlenames)
    if (Math.random() < 0.5) {
        //female full name return
        const randomFirstname = getRandomItemFromArray(female_firstnames)
        const randomLastname = getRandomItemFromArray(female_lastnames)
        const randomMiddlename = getRandomItemFromArray(female_middlenames)
        const femaleFullName = {
            randomLastname,
            randomFirstname,
            randomMiddlename
        }
        console.log(femaleFullName)
        return femaleFullName
    }
    //male full name return
    const randomFirstname = getRandomItemFromArray(male_firstnames)
    const randomLastname = getRandomItemFromArray(male_lastnames)
    const randomMiddlename = getRandomItemFromArray(male_middlenames)
    const maleFullName = {
        randomLastname,
        randomFirstname,
        randomMiddlename
    }
    console.log(maleFullName)

    return maleFullName
}

const getRandomItemFromArray = (array) => array[Math.floor(Math.random() * array.length)]

const randomPhoneNumberGeneration = () => {
    return '+' + Math.floor(1000000000 + Math.random() * 9000000000)
}

clientGeneration()