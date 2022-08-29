const controller = require('../controllers/events.controller');
const authJwt = require('../middlewares/authJwt');

module.exports = (app) => {

    //guest
    app.get('/alumni/v1/events', controller.getEvents);
    app.get('/alumni/v1/events/getDetailEvent/:eventId', controller.getDetailEvent);


    //user
    app.post('/alumni/v1/events/addInteresting/:eventId', [authJwt.verifyToken], controller.addInteresting);
    app.delete('/alumni/v1/events/removeInteresting/:eventId', [authJwt.verifyToken], controller.removeInteresting);
    app.post('/alumni/v1/events/share/:eventId', [authJwt.verifyToken], controller.share);

    //admin
    app.post('/alumni/v1/events', [authJwt.verifyToken, authJwt.isAdmin], controller.createEvent);
    app.put('/alumni/v1/events/:eventId', [authJwt.verifyToken, authJwt.isAdmin], controller.updateEvent);
    app.delete('/alumni/v1/events/:eventId', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteEvent);
};