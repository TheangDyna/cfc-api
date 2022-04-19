const express = require('express');
const app = express();

PORT = 9999;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))

// connect to database

const connectDb = require('./connectDb');
connectDb();

// load route

require('./routes/user.routes')(app);
require('./routes/product.routes')(app);
require('./routes/book.routes')(app);

// start server in port

app.listen(PORT, ()=>{
    console.log(`server is starting http://localhost:${PORT}`);
});

