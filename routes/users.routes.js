const controller = require('../controllers/users.controller');
const authJwt = require('../middlewares/authJwt');

module.exports = (app) => {
    // app.get('/alumni/v1/users', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isTeacher], controller.getUsers);
    app.get('/alumni/v1/users', controller.getUsers); // Unauthorized
    app.post('/alumni/v1/users', controller.register);
    app.post('/alumni/v1/users/login', controller.login);
    app.put('/alumni/v1/users/:userId', controller.updateUser);
    app.delete('/alumni/v1/users/:userId', controller.deleteUser);
};