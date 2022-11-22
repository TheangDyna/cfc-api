const db = require('../models');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//get curernt user
const getCurrentUser = async (req, res) => {
    const userId = req.userId; //catch from middlewares

    try {

        //find user id
        const user = await db.users.findById(userId);
        if (!user) return req.status(401).send({ message: 'Not a current user' });

        res.status(200).send({
            message: 'Success',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

//get all users
const getUsers = async (req, res) => {
    const { page } = req.query;
    let limitPerPage = 5;
    let pages;
    let next = null;
    let prev = null;

    try {

        //load data
        const data = await db.users.find().skip(limitPerPage * (page - 1)).limit(5);

        //get total document
        const count = await db.users.find().count();

        //get pages
        if (count % limitPerPage == 0) {
            pages = count / limitPerPage;
        } else {
            pages = parseInt(count / limitPerPage) + 1;
        };

        //find prev page url
        if (page != 1) {
            if (page <= pages) {
                prev = `http://localhost:3001/alumni/v1/users?page=${Number(page) - 1}`;
            };
        }

        //find next page url
        if (page < pages) {
            next = `http://localhost:3001/alumni/v1/users?page=${Number(page) + 1}`;
        }

        res.status(200).send({
            message: 'Success',
            count,
            amountPerPage: data.length,
            page: `${page} of ${pages}`,
            prevPage: prev,
            nextPage: next,
            firstPage: `http://localhost:3001/alumni/v1/users?page=1`,
            currentPage: `http://localhost:3001/alumni/v1/users?page=${page}`,
            lastPage: `http://localhost:3001/alumni/v1/users?page=${pages}`,
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

//get all students
const getStudents = async (req, res) => {
    const { page } = req.query;
    let limitPerPage = 5;
    let pages;
    let next = null;
    let prev = null;

    try {

        //load data
        const data = await db.users.find({ role: 'user' }).skip(limitPerPage * (page - 1)).limit(5);

        //get total document
        const count = await db.users.find({ role: 'user' }).count();

        //get pages
        if (count % limitPerPage == 0) {
            pages = count / limitPerPage;
        } else {
            pages = parseInt(count / limitPerPage) + 1;
        };

        //find prev page url
        if (page != 1) {
            if (page <= pages) {
                prev = `http://localhost:3001/alumni/v1/users?page=${Number(page) - 1}`;
            };
        }

        //find next page url
        if (page < pages) {
            next = `http://localhost:3001/alumni/v1/users?page=${Number(page) + 1}`;
        }

        res.status(200).send({
            message: 'Success',
            count,
            amountPerPage: data.length,
            page: `${page} of ${pages}`,
            prevPage: prev,
            nextPage: next,
            firstPage: `http://localhost:3001/alumni/v1/users?page=1`,
            currentPage: `http://localhost:3001/alumni/v1/users?page=${page}`,
            lastPage: `http://localhost:3001/alumni/v1/users?page=${pages}`,
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

//get all teacher
const getTeachers = async (req, res) => {
    const { page } = req.query;
    let limitPerPage = 5;
    let pages;
    let next = null;
    let prev = null;

    try {

        //load data
        const data = await db.users.find({ role: 'teacher' }).skip(limitPerPage * (page - 1)).limit(5);

        //get total document
        const count = await db.users.find({ role: 'teacher' }).count();

        //get pages
        if (count % limitPerPage == 0) {
            pages = count / limitPerPage;
        } else {
            pages = parseInt(count / limitPerPage) + 1;
        };

        //find prev page url
        if (page != 1) {
            if (page <= pages) {
                prev = `http://localhost:3001/alumni/v1/users?page=${Number(page) - 1}`;
            };
        }

        //find next page url
        if (page < pages) {
            next = `http://localhost:3001/alumni/v1/users?page=${Number(page) + 1}`;
        }

        res.status(200).send({
            message: 'Success',
            count,
            amountPerPage: data.length,
            page: `${page} of ${pages}`,
            prevPage: prev,
            nextPage: next,
            firstPage: `http://localhost:3001/alumni/v1/users?page=1`,
            currentPage: `http://localhost:3001/alumni/v1/users?page=${page}`,
            lastPage: `http://localhost:3001/alumni/v1/users?page=${pages}`,
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

//get all admin
const getAdmins = async (req, res) => {
    const { page } = req.query;
    let limitPerPage = 5;
    let pages;
    let next = null;
    let prev = null;

    try {

        //load data
        const data = await db.users.find({ role: 'admin' }).skip(limitPerPage * (page - 1)).limit(5);

        //get total document
        const count = await db.users.find({ role: 'admin' }).count();

        //get pages
        if (count % limitPerPage == 0) {
            pages = count / limitPerPage;
        } else {
            pages = parseInt(count / limitPerPage) + 1;
        };

        //find prev page url
        if (page != 1) {
            if (page <= pages) {
                prev = `http://localhost:3001/alumni/v1/users?page=${Number(page) - 1}`;
            };
        }

        //find next page url
        if (page < pages) {
            next = `http://localhost:3001/alumni/v1/users?page=${Number(page) + 1}`;
        }

        res.status(200).send({
            message: 'Success',
            count,
            amountPerPage: data.length,
            page: `${page} of ${pages}`,
            prevPage: prev,
            nextPage: next,
            firstPage: `http://localhost:3001/alumni/v1/users?page=1`,
            currentPage: `http://localhost:3001/alumni/v1/users?page=${page}`,
            lastPage: `http://localhost:3001/alumni/v1/users?page=${pages}`,
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

//user register for student
const register = async (req, res) => {
    const body = req.body;
    const { role } = req.body;
    try {

        //empty body
        if (Object.keys(body).length == 0) return res.status(401).send({ message: 'Empty body' });

        if (role) return res.status(401).send({ message: 'Can not add role' });

        //create data
        const newUser = new db.users({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: bcrypt.hashSync(body.password, 8),
        });

        //check email in system
        const isExist = await db.users.findOne({ email: body.email });
        if (isExist) return res.status(401).send({ message: 'This email already in use' });

        //check email format
        if (!isEmail(body.email)) return res.status(401).send({ message: 'Invalid email format' });

        //check password digits
        if (body.password.length < 6) return res.status(401).send({ message: 'Password at least 6 digits' });

        //add new user
        const data = await newUser.save();

        //generate token
        const user = await db.users.findOne({ email: body.email });
        const token = jwt.sign({ userId: user._id }, 'TOKEN_STRING', { expiresIn: '24h' });

        res.status(200).send({
            message: 'Success',
            data,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    };
};

//add teacher or admin
const addUser = async (req, res) => {
    const body = req.body;

    try {

        //empty body
        if (Object.keys(body).length == 0) return res.status(401).send({ message: 'Empty body' });

        //create data
        const newUser = new db.users({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: bcrypt.hashSync(body.password, 8),
            role: body.role,
        });

        //check email in system
        const isExist = await db.users.findOne({ email: body.email })
        if (isExist) return res.status(401).send({ message: 'This email already in use' });

        //check email format
        if (!isEmail(body.email)) return res.status(401).send({ message: 'Invalid email format' });

        //check password digits
        if (body.password.length < 6) return res.status(401).send({ message: 'Password at least 6 digits' });

        //add new user
        const data = await newUser.save();

        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    };
};

//login
const login = async (req, res) => {
    const body = req.body;
    try {

        //empty body
        if (Object.keys(body).length == 0) return res.status(401).send({ message: 'Empty body' });

        //find user record
        const user = await db.users.findOne({ email: body.email });
        if (!user) {
            return res.status(401).send({
                message: 'User not found',
            });
        };

        //compare password
        const match = bcrypt.compareSync(body.password, user.password);
        if (!match) return res.status(401).send({ message: 'Wrong Password' });

        //generate token
        const token = jwt.sign({ userId: user._id }, 'TOKEN_STRING', { expiresIn: '24h' });

        res.status(200).send({
            message: 'Success',
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

//update user password
const updateUserPassword = async (req, res) => {
    //const { userId } = req.params;
    const userId = req.userId;
    const body = req.body;
    const { currentPassword, newPassword } = req.body;

    try {

        //empty body
        if (Object.keys(body).length == 0) return res.status(401).send({ message: 'Empty body' });

        //find user id
        const findId = await db.users.findById(userId);
        if (!findId) return res.status(404).send({ message: 'Not find user' });

        //enter old password
        if (!currentPassword) return res.status(401).send({ message: 'Enter current password' });
        //compare old password

        const match = bcrypt.compareSync(currentPassword, findId.password);
        if (!match) return res.status(401).send({ message: 'Enter worng current password' });

        //enter new password
        if (!newPassword) return res.status(401).send({ message: 'Enter new password' });

        //check password digits
        if (body.newPassword.length < 6) return res.status(401).send({ message: 'Password at least 6 digits' });

        //incrypt new password
        const password = await bcrypt.hashSync(newPassword, 8);

        //save new password
        await db.users.findByIdAndUpdate(userId, { password });
        const userUpdate = await db.users.findById(userId);

        res.status(200).send({
            message: 'Success',
            oldPassword: currentPassword,
            newPassword,
            userUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//update user
const updateUser = async (req, res) => {
    //const { userId } = req.params;
    const userId = req.userId;
    const body = req.body;
    const { email, role, password } = req.body;

    try {

        //empty body
        if (Object.keys(body).length == 0) return res.status(401).send({ message: 'Empty body' });

        //find user id
        const findId = await db.users.findById(userId);
        if (!findId) return res.status(404).send({ message: 'Not find user' });

        //can not update these
        if (email) return res.status(401).send({ message: 'Can not update email' });
        if (role) return res.status(401).send({ message: 'Can not update role' });
        if (password) return res.status(401).send({ message: 'Can not update password' });

        //save update
        await db.users.findByIdAndUpdate(userId, body);
        const userUpdate = await db.users.findById(userId);

        res.status(200).send({
            message: 'Success',
            userUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//delete user for admin
const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {

        //user empty
        if (!userId) return res.status(401).send({ message: 'No user' });

        //find user id and delete
        const data = await db.users.findByIdAndDelete(userId);
        if (!data) return res.status(404).send({ message: 'Not find user' });

        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    };
};

module.exports = {
    getCurrentUser,
    getUsers,
    getTeachers,
    getStudents,
    getAdmins,
    register,
    addUser,
    login,
    updateUserPassword,
    updateUser,
    deleteUser,
};