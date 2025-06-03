const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL ||
        "mongodb+srv://mehulrathod9254:6Nk7E4SQwIDdMyWC@cluster0.g2gssqd.mongodb.net/"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
