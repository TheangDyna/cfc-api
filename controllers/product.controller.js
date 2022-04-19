const db = require("./../models");
const product = async (req, res) => {
    const { name, category, price, coverFileName } = req.body;
    try {
        const newProduct = new db.products({
            name,
            category,
            price,
            coverFileName,
        });
        const data = await newProduct.save();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error })
    }
};

const getProduct = async (req, res) => {
    try {
        const data = await db.products.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error })
    }
};

const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const body = req.body;
    if (Object.keys(body).length === 0) {
        return res.status(400).send({message: 'bad request'});
    }
    try {
        const data = await db.products.findByIdAndUpdate(productId, body);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: error});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const data = await db.products.findByIdAndDelete(productId);
        res.status(200).send({ message: 'Deleted Succesful' })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

module.exports = {
    product,
    getProduct,
    updateProduct,
    deleteProduct
}