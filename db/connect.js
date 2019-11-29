var Connection = require('tedious').Connection;
var config = {
    server: 'localhost',
    
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'Dad0341__'
        }
    },
    options: {
        database: 'mcbi',
        rowCollectionOnDone: true,
        useColumnNames: false
    }
}
var connection = new Connection(config);
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
});
module.exports = connection;