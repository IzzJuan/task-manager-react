import mongoose, { ConnectOptions } from 'mongoose';
import config from './config/config';

const DBOptions: ConnectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}

mongoose.connect(config.DB.URI, DBOptions);


const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB is on fire');

});

connection.on('error', err => {
    console.log(err);
    process.exit(0);
})