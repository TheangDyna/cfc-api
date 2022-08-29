const controller = require('../controllers/students.controller');
const authJwt = require('../middlewares/authJwt');

module.exports = (app) => {

    //guest
    app.get('/alumni/v1/students', controller.getStudents);
    app.get('/alumni/v1/events/getDetailStudent/:studentId', controller.getDetailStudent);

    //user
    app.post('/alumni/v1/students/join', [authJwt.verifyToken], controller.joinClass);
    app.delete('/alumni/v1/students/leave/:studentId', [authJwt.verifyToken], controller.leaveClass);


    //admin or teacher
    app.post('/alumni/v1/students', [authJwt.verifyToken, authJwt.isNotUser], controller.createStudent);
    app.put('/alumni/v1/students/:studentId', [authJwt.verifyToken, authJwt.isNotUser], controller.updateStudent);
    app.delete('/alumni/v1/students/:studentId', [authJwt.verifyToken, authJwt.isNotUser], controller.deleteStudent);
};