const db = require("./../models");
const user = async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = new db.users({
            name,
            email
        });
        const data = await newUser.save();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error })
    }
};

const getUser = async (req, res) => {
    try {
        const data = await db.users.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error })
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const body = req.body;
    if (Object.keys(body).length === 0) {
        return res.status(400).send({message: 'bad request'});
    }
    try {
        const data = await db.users.findByIdAndUpdate(userId, body);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: error});
    }
};

const deleteUser = async (req, res) => {
    try {
        const data = await db.users.findByIdAndDelete(userId);
        res.status(200).send({ message: 'Deleted Succesful' })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

module.exports = {
    user,
    getUser,
    updateUser,
    deleteUser
}