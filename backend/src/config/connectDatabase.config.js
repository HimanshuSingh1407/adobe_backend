const mongoose = require("mongoose");


const ConnectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://himanshu_singh:Singh789@cluster1.jort8y2.mongodb.net/adobe?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = ConnectDatabase;