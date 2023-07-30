const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://amantiwari:tiWARI1947@cluster0.yxl3447.mongodb.net/CloudNotes';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to the database successfully!');
  } 
  catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

module.exports = connectToMongo;
