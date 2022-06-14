const controller = require('../controllers/users.controller');
const authJwt = require('../middlewares/authJwt');

module.exports = (app) => {

    // guest
    app.post('/alumni/v1/users/register', controller.register);

    // get current user
    app.get('/alumni/v1/users/getCurrentUser', [authJwt.verifyToken], controller.getCurrentUser);

    // user
    app.post('/alumni/v1/users/login', controller.login);
    app.put('/alumni/v1/users/updateUserPassword', [authJwt.verifyToken], controller.updateUserPassword);
    app.put('/alumni/v1/users/updateUser', [authJwt.verifyToken], controller.updateUser);

    // for admin
    app.get('/alumni/v1/users/Users', [authJwt.verifyToken, authJwt.isAdmin], controller.getUsers);
    app.get('/alumni/v1/users/getStudents', [authJwt.verifyToken, authJwt.isAdmin], controller.getStudents);
    app.get('/alumni/v1/users/getTeachers', [authJwt.verifyToken, authJwt.isAdmin], controller.getTeachers);
    app.get('/alumni/v1/users/getAdmins', [authJwt.verifyToken, authJwt.isAdmin], controller.getAdmins);
    app.post('/alumni/v1/users/addUser', controller.addUser);
    app.delete('/alumni/v1/users/deleteUser/:userId', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);


};