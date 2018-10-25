const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbName = 'DoStuffDB';

const connect = () => {
    mongoose.connect('mongodb://localhost:27017', { dbName }).then(() => {
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('Mongoose disconnected on app termination');
                process.exit();
            });
        });
    });
};

module.exports = {
    connect
};


