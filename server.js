//init
const express = require('express');
const connectDb = require('./connectDb');
const app = express();
const port = 3001;

//bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connectDb
connectDb();

//load all route

//users routes
require('./routes/users.routes')(app);
//News Routes
require('./routes/news.routes')(app);
//Stories Routes
require('./routes/stories.routes')(app);

//console port
app.listen(port, () => {
  console.log(`server is start http://localhost:${port}`);
});

