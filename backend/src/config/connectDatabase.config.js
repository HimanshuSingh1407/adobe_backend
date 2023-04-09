const mongoose = require("mongoose");

const ConnectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = ConnectDatabase;
