const { fileToArray } = require('./fileToArray');

exports.fullNameGeneration = async () => {
    let female_firstnames = [];
    female_firstnames = await fileToArray('./full-name-generation/female/female-firstnames', female_firstnames);
    let female_lastnames = [];
    female_lastnames = await fileToArray('./full-name-generation/female/female-lastnames', female_lastnames);
    let female_middlenames = [];
    female_middlenames = await fileToArray('./full-name-generation/female/female-middlenames', female_middlenames);
    let male_firstnames = [];
    male_firstnames = await fileToArray('./full-name-generation/male/male-firstnames', male_firstnames);
    let male_lastnames = [];
    male_lastnames = await fileToArray('./full-name-generation/male/male-lastnames', male_lastnames);
    let male_middlenames = [];
    male_middlenames = await fileToArray('./full-name-generation/male/male-middlenames', male_middlenames);
    if (Math.random() < 0.5) {
        // female full name return
        const randomFirstname = getRandomItemFromArray(female_firstnames);
        const randomLastname = getRandomItemFromArray(female_lastnames);
        const randomMiddlename = getRandomItemFromArray(female_middlenames);
        const femaleFullName = {
            randomLastname,
            randomFirstname,
            randomMiddlename
        };
        return femaleFullName;
    }
    // male full name return
    const randomFirstname = getRandomItemFromArray(male_firstnames);
    const randomLastname = getRandomItemFromArray(male_lastnames);
    const randomMiddlename = getRandomItemFromArray(male_middlenames);
    const maleFullName = {
        randomLastname,
        randomFirstname,
        randomMiddlename
    };
    return maleFullName;
};

const getRandomItemFromArray = (array) => array[Math.floor(Math.random() * array.length)];

exports.randomPhoneNumberGeneration = () => `+380${Math.floor(1000000 + Math.random() * 9000000)}`;
