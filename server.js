//init
const express = require('express');
const connectDb = require('./connectDb');
const app = express();
const port = process.env.PORT||8000;
const morgan = require('morgan')
//bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config();
morgan('tiny')
//connectDb
connectDb();

//load all route

//users routes
require('./routes/users.routes')(app);
//news routes
require('./routes/news.routes')(app);
//stories routes
require('./routes/stories.routes')(app);
//students routes
require('./routes/students.routes')(app);
//statuses routes
require('./routes/events.routes')(app);
//communities routes
require('./routes/communities.routes')(app);

//console port
app.listen(port, () => {
  console.log(`server is start http://localhost:${port}`);
});

