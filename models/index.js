const UserModel = require('./user.model');

let db = {};
db.users = UserModel;

module.exports = db;