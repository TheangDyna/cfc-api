const mongoose = require('mongoose');

const coonnectDb = async ()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/cfc-db')
        console.log('===Database is connected===');
    }catch(error){
        console.error(error);
    }
}

module.exports = coonnectDb;