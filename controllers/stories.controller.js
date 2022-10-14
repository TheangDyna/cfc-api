const db = require('../models');

//get all stories
const getStories = async (req, res) => {
    // const { page } = req.query;
    // let limitPerPage = 5;
    // let pages;
    // let next = null;
    // let prev = null;

    try {

        //load data
        const data = await db.stories.find();

        // const data = await db.stories.find().skip(limitPerPage * (page - 1)).limit(5);

        // //get total document
        // const count = await db.stories.find().count();

        // //get pages
        // if (count % limitPerPage == 0) {
        //     pages = count / limitPerPage;
        // } else {
        //     pages = parseInt(count / limitPerPage) + 1;
        // };

        // //find prev page url
        // if (page != 1) {
        //     if (page <= pages) {
        //         prev = `http://localhost:3001/alumni/v1/stories?page=${Number(page) - 1}`;
        //     };
        // };

        // //find next page url
        // if (page < pages) {
        //     next = `http://localhost:3001/alumni/v1/stories?page=${Number(page) + 1}`;
        // };

        res.status(200).send({
            message: 'Success',
            // count,
            // amountPerPage: data.length,
            // page: `${page} of ${pages}`,
            // prevPage: prev,
            // nextPage: next,
            // firstPage: `http://localhost:3001/alumni/v1/stories?page=1`,
            // currentPage: `http://localhost:3001/alumni/v1/stories?page=${page}`,
            // lastPage: `http://localhost:3001/alumni/v1/stories?page=${pages}`,
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
    const userId = req.userId;

    try {
        //empty body
        if (Object.keys(body).length == 0) return res.status(400).send({ message: 'Empty body' });

        //create data
        const newStoy = new db.stories({
            createBy: userId,
            title: body.title,
            category: body.category,
            description: body.description,
            coverName: body.coverName,
        });

        //save new story
        const data = await newStoy.save();

        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//update story
const updateStory = async (req, res) => {
    const { storyId } = req.params;
    const body = req.body;

    try {

        //empty body
        if (Object.keys(body).length == 0) return res.status(401).send({ message: 'Empty body' });

        //find story id
        const findId = await db.stories.findById(storyId);
        if (!findId) return res.status(404).send({ message: 'Not find story' });
        await db.stories.findByIdAndUpdate(storyId, body);
        const storyUpdate = await db.stories.findById(storyId);

        res.status(200).send({
            message: 'Succes',
            storyUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//delete story
const deleteStory = async (req, res) => {
    const { storyId } = req.params;
    try {

        //find story id
        const data = await db.stories.findByIdAndDelete(storyId);
        if (!data) return res.status(404).send({ message: 'Not find story id' });
        
        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    };
};

//get detail story
const getDetailStory = async (req, res) => {
    const { storyId } = req.params;

    try {

        //find story id
        const findId = await db.stories.findById(storyId);
        if (!findId) return res.status(404).send({ message: 'Not find story' });

        res.status(200).send({
            message: 'Success',
            data: findId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

module.exports = {
    getStories,
    createStory,
    updateStory,
    deleteStory,
    getDetailStory,
};