const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    await mongoose.connect( `mongodb+srv://${process.env.MYDBUSER}:${process.env.MYDBPASS}@myatlasclusteredu.3ebfqvk.mongodb.net/blogDB-v2`);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};
module.exports = connectDB;
