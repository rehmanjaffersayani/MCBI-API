var Request = require('tedious').Request;
var connection = require('./connect');
var utility = require('./utility');

function spGetExecute(qry, callback) {
    var data = [];
    var dataset = [];
    var resultset = 0;


    request = new Request(qry, function (err, rowCount) {
        utility.sendDbResponse(err, rowCount, dataset, callback);
    });
    request.on('row', function (columns) {
        utility.buildRow(columns, data);
    });
    request.on('doneInProc', function (rowCount, more, rows) {
        dataset.push(data);
        data = [];
    });
    connection.callProcedure(request);
}


function getQueryExecute(qry, params, callback) {

    var data = [];
    var dataset = [];
    request = new Request(qry, function (err, rowCount) {
        utility.sendDbResponse(err, rowCount, dataset, callback);

    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.val);
    });
    request.on('row', function (columns) {
        utility.buildRow(columns, dataset);
    });
    request.on('done', function (rowCount, more) {
        dataset.push(data);
        data = [];
    });
    connection.execSql(request);
}


function postQueryExecute(qry, params, callback) {
    var newdata = [];
    request = new Request(qry, function (err, rowCount) {
        utility.sendDbResponse(err, rowCount, newdata, callback);
    });
    params.forEach(param => {
        request.addParameter(param.name, param.type, param.val);
    });
    request.on('row', function (columns) {
        utility.buildRow(columns, newdata);
    });
    connection.execSql(request);
}

module.exports = {

    getQuery: getQueryExecute,
    post:postQueryExecute
};