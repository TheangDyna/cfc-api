const express = require('express');
const app = express();

PORT = 9999;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))

const coonnectDb = require('./connectDb');
coonnectDb();

require('./routes/user.routes')(app);

app.listen(PORT, ()=>{
    console.log(`server is starting http://localhost:${PORT}`);
});

