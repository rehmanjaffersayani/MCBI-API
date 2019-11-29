const _userRepository = require('./users.respository');
const dbContext = require('../../db/context');

module.exports = function (router) {
    const userRepository = _userRepository(dbContext);

    router.route('/users')
        .get(userRepository.getAll)
        .post(userRepository.post);
  
    router.use('/users/:userId', userRepository.intercept);

    router.route('/users/:userId')
        .get(userRepository.get)
        .put(userRepository.put)
        .delete(userRepository.delete);

}
