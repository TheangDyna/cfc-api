const db = require("./../models");
const book = async (req, res) => {
    const { name, category, author, year, price } = req.body;
    try {
        const newBook = new db.books({
            name,
            category,
            author,
            year,
            price,
        });
        const data = await newBook.save();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error })
    }
};

const getBook = async (req, res) => {
    try {
        const data = await db.books.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error })
    }
};

const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const body = req.body;
    if (Object.keys(body).length === 0) {
        return res.status(400).send({message: 'bad request'});
    }
    try {
        const data = await db.books.findByIdAndUpdate(bookId, body);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: error});
    }
};

const deleteBook = async (req, res) => {
    try {
        const data = await db.books.findByIdAndDelete(bookId);
        res.status(200).send({ message: 'Deleted Succesful' })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

module.exports = {
    book,
    getBook,
    updateBook,
    deleteBook
}