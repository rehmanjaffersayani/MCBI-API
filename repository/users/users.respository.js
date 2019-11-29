
var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function UsersRepository(dbContext) {

    function findUser(req, res, next) {
          console.log("ss")
        if (req.params.userId) {
            var parameters = [];

            parameters.push({ name: 'UserId', type: TYPES.Int, val: req.params.userId });

            var query = `select * from users where UserId = @UserId`

            dbContext.getQuery(query, parameters, function (error, data) {
                if (data) {
                    console.log("ss")
                    req.data = data[0];
                    return next();
                }
                return res.sendStatus(404);
            });
        }
    }

    function getUsers(req, res) {

        if (req.query.salary) {
            var parameters = [];

            parameters.push({ name: 'Salary', type: TYPES.Int, val: req.query.salary });

            var query = "select * from users where salary>=@Salary"

            dbContext.get(query, parameters, false, function (error, data) {
                return res.json(response(data, error));
            });
        }
        else {
            dbContext.get("getUsers", function (error, data) {
                
                return res.json(response(data, error));
            });
        }
    }

    function getUser(req, res) {
     
        return res.json(req.data);
    }

    function postUser(req, res) {

        var parameters = [];
        
        parameters.push({ name: 'userName', type: TYPES.VarChar, val: req.body.username });
        parameters.push({ name: 'emailAddress', type: TYPES.VarChar, val: req.body.email });
        parameters.push({ name: 'userPass', type: TYPES.VarChar, val: req.body.password });
        
        

        dbContext.post("INSERT INTO users (userName, emailAddress, userPass) VALUES (@userName, @emailAddress, @userPass)", parameters, function (error, data) {
           
            if (error){
                if(error.number== 2627){

                    return res.status(500).json({
                        message: 'Email Address or Username already exist.',
                        status:false
                    });
                }else{
                    return res.status(500).json({
                        message: 'An error occurred. Please try again later',
                        status:false
                    });
                }
            }else{
            
                return res.status(200).json({
                    message: 'User Created Successfully.',
                    status:true
                });
             
            }
        });
            
     
    }

    function putUser(req, res) {

        var parameters = [];

        Object.entries(req.data).forEach((property) => {

            if (req.body[property[0]]) {
                parameters.push(
                    {
                        name: property[0],
                        val: req.body[property[0]],
                        type: TYPES.VarChar
                    });
            } else {

                parameters.push(
                    {
                        name: property[0],
                        val: property[1],
                        type: TYPES.VarChar
                    });
            }
        });

        // parameters.push({ name: 'FirstName', type: TYPES.VarChar, val: req.body.FirstName });
        // parameters.push({ name: 'LastName', type: TYPES.VarChar, val: req.body.LastName });
        // parameters.push({ name: 'MiddleName', type: TYPES.VarChar, val: req.body.MiddleName });
        // parameters.push({ name: 'DOB', type: TYPES.DateTime, val: new Date(req.body.DOB) });
        // parameters.push({ name: 'Designation', type: TYPES.VarChar, val: req.body.Designation });
        // parameters.push({ name: 'ReportingTo', type: TYPES.VarChar, val: req.body.ReportingTo });
        // parameters.push({ name: 'Salary', type: TYPES.Int, val: req.body.Salary });

        // Object.entries(req.body).forEach((property) => {
        //     parameters.push({ name: '@' + property[0] })
        // });

        dbContext.post("InsertUsers", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }

    function deleteUser(req, res) {

        var parameters = [];

        if (req.data.Id) {
            var parameters = [];

            parameters.push({ name: 'Id', type: TYPES.Int, val: req.data.Id });

            var query = "delete from users where Id = @Id"

            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
        }
    }

    function getEmployeesWothDepartment(req, res) {

        dbContext.get("GetEmployeeWithDepartment", function (error, data) {
            return res.json(response(data, error));
        });
    }

    function searchUser(req, res) {

        var parameters = [];

        parameters.push({ name: 'Salary', type: TYPES.Int, val: req.query.salary });

        var query = "select * from users where salary>=@Salary"

        dbContext.get(query, parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }

    return {
        getAll: getUsers,
        get: getUser,
        post: postUser,
        put: putUser,
        
        find: searchUser,
        intercept: findUser,
        delete: deleteUser
    }
}

module.exports = UsersRepository;