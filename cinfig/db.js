const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.GYM_DB);
    console.log(`GYM_DB Connected : ${conn.connection.host} `.bgMagenta);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
