const express = require('express'); 

function eRoutes() {
    const router = express.Router();
    var employee = require('./repository/users/users.routes')(router);
    
    return router;
}

module.exports = eRoutes;