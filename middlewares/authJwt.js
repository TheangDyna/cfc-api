const jwt = require('jsonwebtoken');
const db = require('../models');

//verify token
const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized, No Token' });
    };
    jwt.verify(token, 'cfc-api', (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized, No Token' });
        };
        req.usersId = decoded.usersId;
        next();
    });
};

//check role
//check admin
const isAdmin = async (req, res, next) => {
    const usersId = req.usersId;
    try {
        const user = await db.users.findById(usersId);
        if (!user) {
            return res.status(404).send({ message: 'No user found' });
        };
        if (user.role != 'admin') {
            return res.status(400).send({ message: 'Not an admin role' });
        };
        next();
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error' });
    };
};

//check teacher
const isTeacher = async (req, res, next) => {
    const usersId = req.usersId;
    try {
        const user = await db.users.findById(usersId);
        if (!user) {
            return res.status(404).send({ message: 'No user found' });
        };
        if (user.role != 'teacher') {
            return res.status(400).send({ message: 'Not a teacher role' });
        };
        next();
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server error' });
    };
};

module.exports = {
    verifyToken,
    isAdmin,
    isTeacher,
};