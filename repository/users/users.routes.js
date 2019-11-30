const _userRepository = require('./users.respository');
const dbContext = require('../../db/context');

module.exports = function (router) {
    const userRepository = _userRepository(dbContext);

  
    router.route('/login')
        .post(userRepository.login)
    
    router.route('/register')
    .post(userRepository.register);
    

}
