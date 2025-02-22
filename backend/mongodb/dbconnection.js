const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database');
    } catch (err) {
        console.error('Internal Error while connecting to database', err);
       // process.exit(1);
    }
};

module.exports = connectDB;
