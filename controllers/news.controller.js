const db = require('./../models')

//get all news
const getNews = async (req, res) => {
    try {
        const data = await db.news.find();
        res.status(200).send({
            message: 'Success',
            count: data.length,
            data: data,
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    };
};

//create news
const createNews = async (req, res) => {
    const body = req.body;
    try {
        // empty body
        if (Object.keys(body).length == 0) {
            return res.status(400).send({ message: 'Empty body' });
        };

        const newNews = new db.news({
            category: body.category,
            coverName: body.coverName,
            title: body.title,
            description: body.description,
        });

        //save new news
        const data = await newNews.save();
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

//update news
const updateNews = async (req, res) => {
    const { newsId } = req.params;
    const body = req.body;
    try {
        // empty body
        if (Object.keys(body).length == 0) {
            return res.status(401).send({ message: 'Empty body' });
        };

        //find news id
        const findId = await db.news.findById(newsId);
        if (!findId) return res.status(404).send({ message: 'Not find news id' });
        await db.news.findByIdAndUpdate(newsId, body);
        const newsUpdate = await db.news.findById(newsId);
        res.status(200).send({
            message: 'Update succes',
            newsUpdate,
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    };
};

//delete news
const deleteNews = async (req, res) => {
    const { newsId } = req.params;

    try {
        const data = await db.news.findByIdAndDelete(newsId);
        if (!data) return res.status(404).send({
            message: 'Not find news id',
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
    getNews,
    createNews,
    updateNews,
    deleteNews,
};