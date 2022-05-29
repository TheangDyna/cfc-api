const db = require('../models');

//get all stories
const getStories = async (req, res) => {
    try {
        const data = await db.stories.find();
        res.status(200).send({
            message: 'Success',
            count: data.length,
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    };
};

//create story
const createStory = async (req, res) => {
    const body = req.body;
    try {
        // empty body
        if (Object.keys(body).length == 0) {
            return res.status(400).send({ message: 'Empty body' });
        };

        const newStories = new db.stories({
            title: body.title,
            description: body.description,
            coverName: body.coverName,
        });

        //save new story
        const data = await newStories.save();
        res.status(500).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
        });
    };
};

//update story
const updateStory = async (req, res) => {
    const { storyId } = req.params;
    const body = req.body;
    try {
        // empty body
        if (Object.keys(body).length == 0) {
            return res.status(401).send({ message: 'Empty body' });
        };

        //find story id
        const findId = await db.stories.findById(storyId);
        if (!findId) return res.status(404).send({ message: 'Not find story id' });
        await db.stories.findByIdAndUpdate(storyId, body);
        const storyUpdate = await db.stories.findById(storyId);
        res.status(200).send({
            message: 'Update succes',
            storyUpdate,
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    };
};

//delete story
const deleteStory = async (req, res) => {
    const { storyId } = req.params;

    try {
        const data = await db.stories.findByIdAndDelete(storyId);
        if (!data) return res.status(404).send({
            message: 'Not find story id',
        });
        res.status(200).send({
            message: 'Delete success',
            data: data,
        });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    };
};



module.exports = {
    getStories,
    createStory,
    updateStory,
    deleteStory,
};