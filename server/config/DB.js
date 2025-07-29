const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL;

const DB = async ()=>{
    try {
        await mongoose.connect(DB_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to database:', error);
    }
}

module.exports = DB