const controller = require('../controllers/news.controller');
const authJwt = require('../middlewares/authJwt');

module.exports = (app) => {

    //guest
    app.get('/alumni/v1/news', controller.getNews);
    app.get('/alumni/v1/news/getDetailNews/:newsId', controller.getDetailNews);

    //user
    app.post('/alumni/v1/news/addComments/:newsId', [authJwt.verifyToken], controller.addComment);
    app.delete('/alumni/v1/news/deleteComments/:newsId/:commentId', [authJwt.verifyToken], controller.deleteComment);
    app.post('/alumni/v1/news/addReact/:newsId', [authJwt.verifyToken], controller.addReact);
    app.delete('/alumni/v1/news/removeReact/:newsId', [authJwt.verifyToken], controller.removeReact);
    app.post('/alumni/v1/news/share/:newsId', [authJwt.verifyToken], controller.share);

    //admin
    app.post('/alumni/v1/createNews', [authJwt.verifyToken, authJwt.isAdmin], controller.createNews);
    app.put('/alumni/v1/news/:newsId', [authJwt.verifyToken, authJwt.isAdmin], controller.updateNews);
    app.delete('/alumni/v1/news/:newsId', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteNews);
};