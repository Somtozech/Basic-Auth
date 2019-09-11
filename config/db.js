const mongoose = require('mongoose');
const config = require('./index');

async function initDB() {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Connection to Database was successful');
  } catch (error) {
    console.error('An Error Occured when connecting to db');
    console.error(error.message);
  }
}

module.exports = initDB;
