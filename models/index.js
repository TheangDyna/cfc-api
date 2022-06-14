const UsersModel = require('./users.model');
const NewsModel = require('./news.model');
const StoriesModel = require('./stories.model');
const StudentsModel = require('./students.model');
const EventsModel = require('./events.model');
const CommunitiesModel = require('./communities.model');

let db = {}

db.users = UsersModel;
db.news = NewsModel;
db.stories = StoriesModel;
db.students= StudentsModel;
db.events = EventsModel;
db.communities = CommunitiesModel;
module.exports = db;