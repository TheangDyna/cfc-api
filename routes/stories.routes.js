const controller = require('../controllers/stories.controller');
const authJwt = require('../middlewares/authJwt');

module.exports = (app) => {

    //guest
    app.get('/alumni/v1/stories', controller.getStories);

    // admin
    app.post('/alumni/v1/stories', [authJwt.verifyToken, authJwt.isAdmin], controller.createStory);
    app.put('/alumni/v1/stories/:storyId', [authJwt.verifyToken, authJwt.isAdmin], controller.updateStory);
    app.delete('/alumni/v1/stories/:storyId', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteStory);
};