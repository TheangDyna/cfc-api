const jwt = require('jsonwebtoken');
const db = require('../models');

//verify token
const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ message: 'Unauthorized, no token' });

    jwt.verify(token, 'TOKEN_STRING', (error, decoded) => {
        if (error) {
            console.log(error);
            return res.status(401).send({ message: 'Unauthorized, no token' });
        };
        req.userId = decoded.userId;
        next();
    });
};

//check role

//check teacher
const isTeacher = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await db.users.findById(userId);
        if (!user) return res.status(404).send({ message: 'No user found' });

        if (user.role != 'teacher') return res.status(400).send({ message: 'Not a teacher role' });

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal Server error' });
    };
};

//check admin
const isAdmin = async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await db.users.findById(userId);
        if (!user) return res.status(404).send({ message: 'No user found' });

        if (user.role != 'admin') return res.status(400).send({ message: 'Not an admin role' });

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    };
};

//check admin or teacher
const isNotUser = async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await db.users.findById(userId);
        if (!user) return res.status(404).send({ message: 'No user found' });

        if (user.role == 'user') return res.status(400).send({ message: 'An user role' });

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    };
};

module.exports = {
    verifyToken,
    isTeacher,
    isAdmin,
    isNotUser,
};