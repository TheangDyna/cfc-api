const db = require('../models');
module.exports = async (app) => {
    app.get('/api/v1/users', async (req, res) => {
        const data = await db.users.find();
        res.status(200).send({ message: data })
    });
    app.post('/api/v1/signup', async (req, res) => {
        const { name, email, role } = req.body;
        const newUser = new db.users({
            name: name,
            email: email,
            role: role
        })
        const data = await newUser.save();
        res.status(200).send(data);
    });
}