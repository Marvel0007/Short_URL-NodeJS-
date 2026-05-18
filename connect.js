const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);

    console.log("MongoDB Connected");

  } catch (error) {
    console.log("MongoDB Connection Error:", error);

    process.exit(1);
  }
}

module.exports = {
  connectToMongoDB,
};