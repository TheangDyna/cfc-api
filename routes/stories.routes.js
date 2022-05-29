const controller = require('../controllers/stories.controller');

module.exports = (app) => {
    app.get('/alumni/v1/stories', controller.getStories);
    app.post('/alumni/v1/stories', controller.createStory);
    app.put('/alumni/v1/stories/:storyId', controller.updateStory);
    app.delete('/alumni/v1/stories/:storyId', controller.deleteStory);
};