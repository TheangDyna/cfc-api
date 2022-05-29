const UsersModel = require('./users.model');
const NewsModel = require('./news.model');
const StoriesModel = require('./stories.model');

let db = {}

db.users = UsersModel;
db.news = NewsModel;
db.stories = StoriesModel;
module.exports = db;