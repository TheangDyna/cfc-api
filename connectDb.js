const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("=== Database is connecting ===");
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDb;
