const db = require('../models')

//get all event
const getEvents = async (req, res) => {
    const { page } = req.query;
    let limitPerPage = 5;
    let pages;
    let next = null;
    let prev = null;

    try {

        //load data
        const data = await db.events.find().skip(limitPerPage * (page - 1)).limit(5);

        //get total document
        const count = await db.events.find().count();

        //get pages
        if (count % limitPerPage == 0) {
            pages = count / limitPerPage;
        } else {
            pages = parseInt(count / limitPerPage) + 1;
        };

        //find prev page url
        if (page != 1) {
            if (page <= pages) {
                prev = `http://localhost:3001/alumni/v1/events?page=${Number(page) - 1}`;
            };
        };

        //find next page url
        if (page < pages) {
            next = `http://localhost:3001/alumni/v1/events?page=${Number(page) + 1}`;
        };

        res.status(200).send({
            message: 'Success',
            count,
            amountPerPage: data.length,
            page: `${page} of ${pages}`,
            prevPage: prev,
            nextPage: next,
            firstPage: `http://localhost:3001/alumni/v1/events?page=1`,
            currentPage: `http://localhost:3001/alumni/v1/events?page=${page}`,
            lastPage: `http://localhost:3001/alumni/v1/events?page=${pages}`,
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//create event
const createEvent = async (req, res) => {
    const body = req.body;
    const userId = req.userId;

    try {

        //empty body
        if (Object.keys(body).length == 0) return res.status(400).send({ message: 'Empty body' });

        const newEvents = new db.events({
            createBy: userId,
            title: body.title,
            coverName: body.coverName,
            date: body.date,
            category: body.category,
            description: body.description,
        });

        //save new event
        const data = await newEvents.save();

        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//update event
const updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const body = req.body;

    try {

        //empty body
        if (Object.keys(body).length == 0) return res.status(400).send({ message: 'Empty body' });

        //find event id
        const findId = await db.events.findById(eventId);
        if (!findId) return res.status(404).send({ message: 'Not find event' });
        await db.events.findByIdAndUpdate(eventId, body);

        //update 
        const eventUpdate = await db.events.findById(eventId);
        res.status(200).send({
            message: 'Update succes',
            eventUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//delete event
const deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {

        //find event id
        const data = await db.events.findByIdAndDelete(eventId);
        if (!data) return res.status(404).send({ message: 'Not find event' });

        res.status(200).send({
            message: 'success',
            data: data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    };
};

const addInteresting = async (req, res) => {
    const userId = req.userId;
    const { eventId } = req.params;

    try {

        //find events id
        const findId = await db.events.findById(eventId);
        if (!findId) return res.status(404).send({ message: 'Not find event' });

        //check exist
        const isExist = await findId.interesting.find((interesting) => interesting == userId);
        if (isExist == userId) return res.status(400).send({ message: 'Have alrady interesting' });

        //add interesting
        const newInterest = userId;
        await findId.interesting.unshift(newInterest)
        findId.save();

        res.status(200).send({
            message: 'Success',
            count: findId.interesting.length,
            data: newInterest,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//remove interesting
const removeInteresting = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.userId;

    try {

        //find events id
        const findId = await db.events.findById(eventId);
        if (!findId) return res.status(404).send({ message: 'Not find event' });

        //check own interesting
        const interesting = findId.interesting.find((interesting) => interesting == userId);
        if (interesting != userId) return res.status(400).send({ message: 'Do not have interesting yet!' });

        //find indexOf interesting
        const indexOf = findId.interesting.indexOf(userId);

        //remove comment
        const data = findId.interesting.splice(indexOf, 1);
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

//share
const share = async (req, res) => {
    const userId = req.userId;
    const { eventId } = req.params;

    try {

        //find events id
        const findId = await db.events.findById(eventId);
        if (!findId) return res.status(404).send({ message: 'Not find events' });

        //who share
        if (!userId) {
            return res.status(401).send({ message: 'No current user' });
        };

        //save share
        await findId.share.unshift(userId)
        findId.save();
        res.status(200).send({
            message: 'Success',
            count: findId.share.length,
            data: userId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    addInteresting,
    removeInteresting,
    share,
};