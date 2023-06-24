const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://<username>:<password>@<clustername>.qirliav.mongodb.net`
    );
    console.log("Database connected.");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDb;
