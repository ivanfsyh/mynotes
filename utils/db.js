const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mynotes');
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1); // keluar dari app kalau gagal connect
    }
};

module.exports = connectDB;