const {repairGeneration} = require("./repairs/repairGenerator");
const {ordersGeneration} = require("./orders/orderGeneration");
const {masterGeneration} = require("./masters/masterGeneration");
const {repairFirmGeneration} = require("./repair-firms/repairFirmGenerator");
const {deviceGeneration} = require("./devices/deviceGeneration");
const {clientGeneration} = require("./clients/clientGeneration");

const fullGeneration = async () => {
    const numberOfClients = 10000
    clientGeneration(numberOfClients)
    deviceGeneration(20000)
    repairFirmGeneration()
    masterGeneration()
    ordersGeneration()
    repairGeneration()
}



fullGeneration()