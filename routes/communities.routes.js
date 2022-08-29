const controller = require('../controllers/communities.controller');
const authJwt = require('../middlewares/authJwt');

module.exports = (app) => {

    //guest
    app.get('/alumni/v1/communities', controller.getCommunities);
    app.get('/alumni/v1/communities/getDetailCommunity/:communityId', controller.getDetailCommunity);

    //user
    app.post('/alumni/v1/communities', [authJwt.verifyToken], controller.createCommunity);
    app.put('/alumni/v1/communities/:communityId', [authJwt.verifyToken], controller.updateCommunity);
    app.delete('/alumni/v1/communities/:communityId', [authJwt.verifyToken], controller.deleteCommunity);
    app.post('/alumni/v1/communuties/addAnswer/:communityId', [authJwt.verifyToken], controller.addAnswer);
    app.delete('/alumni/v1/communuties/deleteAnswer/:communityId/:answerId', [authJwt.verifyToken], controller.deleteAnswer);
    app.post('/alumni/v1/communuties/addVote/:communityId', [authJwt.verifyToken], controller.addVote);
    app.delete('/alumni/v1/communuties/removeVote/:communityId', [authJwt.verifyToken], controller.removeVote);
    app.post('/alumni/v1/communuties/addVoteAnswer/:communityId/:answerId', [authJwt.verifyToken], controller.addVoteAnswer);
    app.post('/alumni/v1/communuties/addVoteAnswer/:communityId/:answerId', [authJwt.verifyToken], controller.addVoteAnswer);
    app.post('/alumni/v1/communuties/share/:communityId', [authJwt.verifyToken], controller.share);
};