const db = require('../models');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// get all users
const getUsers = async (req, res) => {
    try {
        const data = await db.users.find();
        res.status(200).send({
            message: 'Success',
            count: data.length,
            data,
        });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};

// user register / add teacher and admin
const register = async (req, res) => {
    const body = req.body;
    try {

        // empty body
        if (Object.keys(body).length == 0) {
            return res.status(401).send({ message: 'Empty body' });
        };
        const newUser = new db.users({
            fristName: body.fristName,
            lastName: body.lastName,
            gender: body.gender,
            email: body.email,
            password: bcrypt.hashSync(body.password, 8),
            // profileName: body.profileName,
            // birthdate: body.birthdate,
            // grade: body.grade,
            // contact: body.contact,
            // status: body.status,
            // bio: body.bio,
            // role: body.role,
        });

        //check email in system
        const isExist = await db.users.findOne({ email: body.email })
        if (isExist) {
            return res.status(401).send({ message: 'This email already in use.' });
        };

        //check email format
        if (!isEmail(body.email)) {
            return res.status(400).send({ message: 'Invalid email format' });
        };

        //check password digits
        if (body.password.length < 6) {
            return res.status(401).send({ message: 'Password at least 6 digits' });
        };

        //add new user
        const data = await newUser.save();
        res.status(201).send({
            message: 'Success',
            data: data,
        });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    };
};

const login = async (req, res) => {
    const body = req.body;
    try {

        // empty body
        if (Object.keys(body).length == 0) {
            return res.status(401).send({ message: 'Empty body' });
        };

        //find user record
        const user = await db.users.findOne({ email: body.email });
        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                message: 'No User',
            });
        };

        //compare password
        const match = bcrypt.compareSync(body.password, user.password);
        if (!match) {
            return res.status(401).send({
                statusCode: 401,
                message: 'Wrong Password',
            });
        };

        //generate token
        const token = jwt.sign({ userId: user._id }, 'cfc-api', { expiresIn: '24h' });
        res.status(200).send({ user, token });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
};

//update user by param
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const body = req.body;

    //user empty
    // if (!userId) {
    //     return res.status(401).send({ message: 'No user id' })
    // };

    try {

        // empty body
        if (Object.keys(body).length == 0) {
            return res.status(401).send({ message: 'Empty body' });
        };

        //find user id
        const findId = await db.users.findById(userId);
        if (!findId) return res.status(404).send({ message: 'Not find user id' });

        //update email
        if (!isEmail(body.email)) {
            return res.status(401).send({ message: 'Invalid email format' });
        };

        //check email in system
        const user = await db.users.findOne({ email: body.email })
        if (user) {
            return res.status(401).send({ message: 'This email already in use.' });
        };

        await db.users.findByIdAndUpdate(userId, body);
        const userUpdate = await db.users.findById(userId);
        res.status(200).send({
            message: 'Update succes',
            userUpdate,
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    };
};

//delete user by param
const deleteUser = async (req, res) => {
    const { userId } = req.params;

    //user empty
    // if (!userId) {
    //     return res.status(401).send({ message: 'No user id' })
    // };

    try {
        const data = await db.users.findByIdAndDelete(userId);
        if (!data) return res.status(404).send({
            message: 'Not find user id',
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
    getUsers,
    register,
    login,
    updateUser,
    deleteUser,

};