const db = require('./../models');
const { v4: uuidv4 } = require('uuid');


// get all news
const getNews = async (req, res) => {
    // const { page } = req.query;
    // let limitPerPage = 5;
    // let pages;
    // let next = null;
    // let prev = null;

    try {

        //load data
        const data = await db.news.find().populate({ path: "comment.userId", select: 'firstName lastName profile' });

        // const data = await db.news.find().skip(limitPerPage * (page - 1)).limit(5);
        
        // // get total document
        // const count = await db.news.find().count();

        // //get pages
        // if (count % limitPerPage == 0) {
        //     pages = count / limitPerPage;
        // } else {
        //     pages = parseInt(count / limitPerPage) + 1;
        // };

        // //find prev page url
        // if (page != 1) {
        //     if (page <= pages) {
        //         prev = `http://localhost:3001/alumni/v1/news?page=${Number(page) - 1}`;
        //     };
        // };

        // //find next page url
        // if (page < pages) {
        //     next = `http://localhost:3001/alumni/v1/news?page=${Number(page) + 1}`;
        // };

        res.status(200).send({
            message: 'Success',
            // count,
            // amountPerPage: data.length,
            // page: `${page} of ${pages}`,
            // prevPage: prev,
            // nextPage: next,
            // firstPage: `http://localhost:3001/alumni/v1/news?page=1`,
            // currentPage: `http://localhost:3001/alumni/v1/news?page=${page}`,
            // lastPage: `http://localhost:3001/alumni/v1/news?page=${pages}`,
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

// create news
const createNews = async (req, res) => {
    const body = req.body;
    const userId = req.userId;

    try {

        // empty body
        if (Object.keys(body).length == 0) return res.status(400).send({ message: 'Empty body' });

        if (!Boolean(body.coverName || body.title)) return res.status(400).send({ message: 'What to create?' });

        // create data
        const newNews = new db.news({
            createBy: userId,
            category: body.category,
            coverName: body.coverName,
            title: body.title,
            description: body.description,
        });

        // save new news
        const data = await newNews.save();

        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

// update news
const updateNews = async (req, res) => {
    const { newsId } = req.params;
    const body = req.body;

    try {

        // empty body
        if (Object.keys(body).length == 0) return res.status(400).send({ message: 'Empty body' });

        if (!Boolean(body.coverName || body.title)) return res.status(400).send({ message: 'Cover and title must have one' });

        // find news id and update
        const findId = await db.news.findById(newsId);
        if (!findId) return res.status(404).send({ message: 'Not find news id' });
        await db.news.findByIdAndUpdate(newsId, body);
        const newsUpdate = await db.news.findById(newsId);

        res.status(200).send({
            message: 'Success',
            newsUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

// delete news
const deleteNews = async (req, res) => {
    const { newsId } = req.params;

    try {

        // find new id
        const data = await db.news.findByIdAndDelete(newsId);
        if (!data) return res.status(404).send({ message: 'Not find news' });

        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    };
};

// add comment
const addComment = async (req, res) => {
    const userId = req.userId;
    const body = req.body;
    const { text } = body;
    const { newsId } = req.params;

    try {

        //find news id
        const findId = await db.news.findById(newsId);
        if (!findId) return res.status(404).send({ message: 'Not find news' });

        // empty body
        if (Object.keys(body).length == 0) return res.status(400).send({ message: 'Empty body' });

        //add new comment
        const newComment = {
            _id: uuidv4(),
            userId,
            text,
        };

        const data = await findId.comment.unshift(newComment);
        findId.save();

        res.status(200).send({
            message: 'Success',
            userId,
            text,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

// remove comment
const deleteComment = async (req, res) => {
    const { newsId, commentId } = req.params;
    const userId = req.userId;

    try {

        //find news id
        const findId = await db.news.findById(newsId);
        if (!findId) return res.status(404).send({ message: 'Not find news' });

        //find comment id
        const comment = findId.comment.find((data) => data._id == commentId);
        if (!comment) return res.status(404).send({ message: 'Not find comment' });

        //check own comment
        if (comment.userId != userId) return res.status(400).send({ message: 'Not own comment' });

        //covert object to array of comment id
        const arrCommentId = findId.comment.map((data) => data._id);

        //find indexOf comment id
        const indexOf = arrCommentId.indexOf(commentId);

        //remove comment
        const data = findId.comment.splice(indexOf, 1);
        await findId.save();

        res.status(200).send({
            message: 'Success',
            data,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

// add react
const addReact = async (req, res) => {
    const userId = req.userId;
    const { newsId } = req.params;

    try {

        //find news id
        const findId = await db.news.findById(newsId);
        if (!findId) return res.status(404).send({ message: 'Not find news' });

        //who react
        if (!userId) return res.status(401).send({ message: 'No current user' });

        //check exist
        const isExist = await findId.react.find((react) => react == userId);
        if (isExist == userId) return res.status(400).send({ message: 'Have alrady react' });

        // add react
        const newReact = userId;
        await findId.react.unshift(newReact);
        findId.save();

        res.status(200).send({
            message: 'Success',
            count: findId.react.length,
            data: newReact,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

// remove react
const removeReact = async (req, res) => {
    const { newsId } = req.params;
    const userId = req.userId;

    try {

        //find news id
        const findId = await db.news.findById(newsId);
        if (!findId) return res.status(404).send({ message: 'Not find news id' });

        //check own react
        const react = findId.react.find((react) => react == userId);
        if (react != userId) return res.status(400).send({ message: 'Do not have react yet!' });

        //find indexOf react
        const indexOf = findId.react.indexOf(userId);

        //remove comment
        const data = findId.react.splice(indexOf, 1);
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

// share
const share = async (req, res) => {
    const userId = req.userId;
    const { newsId } = req.params;

    try {

        //find news id
        const findId = await db.news.findById(newsId);
        if (!findId) return res.status(404).send({ message: 'Not find news' });

        //who share
        if (!userId) return res.status(401).send({ message: 'No current user' });

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

//get detail news
const getDetailNews = async (req, res) => {
    const { newsId } = req.params;

    try {

        //find news id
        const findId = await db.news.findById(newsId);
        if (!findId) return res.status(404).send({ message: 'Not find news' });

        res.status(200).send({
            message: 'Success',
            countReact: findId.react.length,
            countComment: findId.comment.length,
            countShare: findId.share.length,
            data: findId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

module.exports = {
    getNews,
    createNews,
    updateNews,
    deleteNews,
    addComment,
    deleteComment,
    addReact,
    removeReact,
    share,
    getDetailNews,
};