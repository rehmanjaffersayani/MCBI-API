
var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

const bcrypt = require('bcrypt');
const saltRounds = 10;

function UsersRepository(dbContext) {


    function loggedIn(req, res) {

        if (req.body.email && req.body.password) {
            var parameters = [];


            parameters.push({ name: 'email', type: TYPES.VarChar, val: req.body.email });

            var query = "select * from users where emailAddress = @email"
            
            dbContext.getQuery(query, parameters, function (error, data) {
                if (data.length  > 0){
                   
                    bcrypt.compare(req.body.password, data[0]['userPass'], function(err, bres) {
                        if (bres){
                            return res.status(200).json({
                                message: 'LogIn successfull',
                                status: true,
                                userData:data[0]['userName']
                            });
                        }else{

                        
                     
                            return res.status(200).json({
                                message: 'Email Address or password mismatch',
                                status: false
                            });
                       
                    }
                    });
            }else{
                return res.status(200).json({
                    message: 'Email Address doesn\'t exist.',
                    status: false
                });
            }
                
            });
        }
        else {
            return res.status(200).json({
                message: 'AAn error occurred. Please try again later.',
                status: false
            });
        }
    }

    function register(req, res) {

        var parameters = [];

        parameters.push({ name: 'userName', type: TYPES.VarChar, val: req.body.username });
        parameters.push({ name: 'emailAddress', type: TYPES.VarChar, val: req.body.email });
        
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                parameters.push({ name: 'userPass', type: TYPES.VarChar, val: hash });
                dbContext.post("INSERT INTO users (userName, emailAddress, userPass) VALUES (@userName, @emailAddress, @userPass)", parameters, function (error, data) {

                    if (error) {
                        if (error.number == 2627) {
        
                            return res.status(500).json({
                                message: 'Email Address or Username already exist.',
                                status: false
                            });
                        } else {
                            return res.status(500).json({
                                message: 'An error occurred. Please try again later.',
                                status: false
                            });
                        }
                    } else {
        
                        return res.status(200).json({
                            message: 'User Created Successfully.',
                            status: true
                        });
        
                    }
                });
            });
        });

        


    }


    return {
        login: loggedIn,
        register: register
    }
}

module.exports = UsersRepository;
