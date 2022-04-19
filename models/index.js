const UserModel = require('./user.model');
const ProductModel = require('./product.model');
const BookModel = require('./book.model');

let db = {};
db.users = UserModel;
db.product = ProductModel;
db.book = BookModel;


module.exports = db;