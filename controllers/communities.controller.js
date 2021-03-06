const db = require('../models');
const { v4: uuidv4 } = require('uuid');

//get all community
const getCommunities = async (req, res) => {
    try {

        //find community id
        const data = await db.communities.find();

        res.status(200).send({
            message: 'Success',
            count: data.length,
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//create community
const createCommunity = async (req, res) => {
    const body = req.body;
    const userId = req.userId;

    try {

        //empty body
        if (Object.keys(body).length == 0) return res.status(400).send({ message: 'Empty body' });

        //create data
        const newCommunity = new db.communities({
            createBy: userId,
            title: body.title,
            category: body.category,
            description: body.descripton,
        });

        //save new community
        const data = await newCommunity.save();

        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//update community
const updateCommunity = async (req, res) => {
    const { communityId } = req.params;
    const body = req.body;

    try {

        //empty body
        if (Object.keys(body).length == 0) return res.status(400).send({ message: 'Empty body' });

        //find community id
        const findId = await db.communities.findById(communityId);
        if (!findId) return res.status(404).send({ message: 'Not find community' });

        //save community
        await db.communities.findByIdAndUpdate(communityId, body);
        const communityUpdate = await db.communities.findById(communityId);

        res.status(200).send({
            message: 'Succes',
            communityUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//delete community
const deleteCommunity = async (req, res) => {
    const { communityId } = req.params;

    try {

        //find community id
        const data = await db.communities.findByIdAndDelete(communityId);
        if (!data) return res.status(404).send({ message: 'Not find community' });
        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    };
};

//add answer
const addAnswer = async (req, res) => {
    const userId = req.userId;
    const body = req.body;
    const { communityId } = req.params;

    try {
        //find community id
        const findId = await db.communities.findById(communityId);
        if (!findId) return res.status(404).send({ message: 'Not find community' });

        //empty body
        if (Object.keys(body).length == 0) {
            return res.status(400).send({ message: 'Empty body' });
        };

        //add new answer
        const newAnswer = {
            _id: uuidv4(),
            userId,
            text,
        };

        const data = await findId.answer.unshift(newAnswer);
        findId.save();
        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//remove answer
const deleteAnswer = async (req, res) => {
    const { communityId, answerId } = req.params;
    const userId = req.userId;
    try {
        //find community id
        const findId = await db.communities.findById(communityId);
        if (!findId) return res.status(404).send({ message: 'Not find community' });

        //find answer id
        const answer = findId.answer.find((data) => data._id == answerId);
        if (!answer) return res.status(404).send({ message: 'Not find answer' });

        //check own answer
        if (answer.userId != userId) {
            return res.status(400).send({ message: 'Not own answer' })
        }

        //covert object to array of answer id
        const arrCommentId = findId.answer.map((data) => data._id);

        //find indexOf answer id
        const indexOf = arrCommentId.indexOf(answerId);

        //remove answer
        const data = findId.answer.splice(indexOf, 1);
        await findId.save();
        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

//add vote
const addVote = async (req, res) => {
    const userId = req.userId;
    const { communityId } = req.params;

    try {

        //find community id
        const findId = await db.communities.findById(communityId);
        if (!findId) return res.status(404).send({ message: 'Not find community' });

        //who vote
        if (!userId) return res.status(401).send({ message: 'No current user' });

        //check exist
        const isExist = await findId.vote.find((vote) => vote == userId);
        if (isExist == userId) return res.status(400).send({ message: 'Have alrady vote' });

        //add vote
        const newVote = userId;
        await findId.vote.unshift(newVote)
        findId.save();

        res.status(200).send({
            message: 'Success',
            count: findId.vote.length,
            data: newVote,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//remove vote
const removeVote = async (req, res) => {
    const { communityId } = req.params;
    const userId = req.userId;

    try {

        //find community id
        const findId = await db.communities.findById(communityId);
        if (!findId) return res.status(404).send({ message: 'Not find communities id' });

        //check own vote
        const vote = findId.vote.find((vote) => vote == userId);
        if (vote != userId) return res.status(400).send({ message: 'Do not have vote yet!' });

        //find indexOf vote
        const indexOf = findId.vote.indexOf(userId);

        //remove comment
        const data = findId.vote.splice(indexOf, 1);
        await findId.save();

        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

//remove answer
const addVoteAnswer = async (req, res) => {
    const { communityId, answerId } = req.params;
    const userId = req.userId;

    try {

        //find community id
        const findId = await db.communities.findById(communityId);
        if (!findId) return res.status(404).send({ message: 'Not find community' });

        //find answer id
        const answer = findId.answer.find((data) => data._id == answerId);
        if (!answer) return res.status(404).send({ message: 'Not find answer' });

        const isExist = await answer.vote.find((vote) => vote == userId);
        if (isExist == userId) return res.status(400).send({ message: 'Have alrady vote' });

        //add vote on answer
        const newVote = userId;
        await answer.vote.unshift(newVote)
        findId.save();

        res.status(200).send({
            message: 'Success',
            count: answer.vote.length,
            data: newVote,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

//share
const share = async (req, res) => {
    const userId = req.userId;
    const { communityId } = req.params;

    try {

        //find community id
        const findId = await db.communities.findById(communityId);
        if (!findId) return res.status(404).send({ message: 'Not find communities' });

        //who share
        if (!userId) {
            return res.status(401).send({ message: 'No current user' });
        };

        const newShare = userId;
        const data = await findId.share.unshift(newShare)
        findId.save();
        
        res.status(200).send({
            message: 'Success',
            count: findId.share.length,
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

module.exports = {
    getCommunities,
    createCommunity,
    updateCommunity,
    deleteCommunity,
    addAnswer,
    deleteAnswer,
    addVote,
    removeVote,
    addVoteAnswer,
    share,
};