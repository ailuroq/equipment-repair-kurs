const {clientGeneration} = require("./clients/clientGeneration");
const pool = require('./../../database/pool')


const fullGeneration = async (numberOfClients) => {
    let deleteAllTables = "DELETE FROM repairs;" +
                          "DELETE FROM orders;" +
                          "DELETE FROM masters;" +
                          "DELETE FROM repair_firms;" +
                          "DELETE FROM devices;" +
                          "DELETE FROM clients;"
    await pool.query(deleteAllTables, (err) => {
        if (err) throw err
        if (numberOfClients % 2) numberOfClients+=1
        console.log(numberOfClients)
        clientGeneration(numberOfClients)
    })

}



fullGeneration(111)