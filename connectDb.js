const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cfc-api');
    console.log("=== Database is connecting ===");
  } catch (error) {
    console.error(error);
  }
}
module.exports = connectDb;