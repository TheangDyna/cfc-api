const controller = require('../controllers/news.controller');

module.exports = (app) => {
    app.get('/alumni/v1/news', controller.getNews);
    app.post('/alumni/v1/news', controller.createNews);
    app.put('/alumni/v1/news/:newsId', controller.updateNews);
    app.delete('/alumni/v1/news/:newsId', controller.deleteNews);
};