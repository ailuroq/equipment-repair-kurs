const { clientGeneration } = require('./clients/clientGeneration');
const pool = require('../../database/pool');
const { deleteAndFillReferences } = require('./references/references');


const fullGeneration = async (numberOfClients) => {
    const deleteAllTables = 'DELETE FROM repairs;'
                          + 'DELETE FROM orders;'
                          + 'DELETE FROM masters;'
                          + 'DELETE FROM repair_firms;'
                          + 'DELETE FROM devices;'
                          + 'DELETE FROM clients;';
    await deleteAndFillReferences();
    await pool.query(deleteAllTables, (err) => {
        if (err) throw err;
        clientGeneration(numberOfClients);
    });
};

fullGeneration(1500);
