import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';


const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`)
        console.log(`\nDB_NAME: ${connectionInstance.connection.name}`)
        console.log(`\n MongoDB connected: Hosted on: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('MongoDB connection FAILED: ', error)
        process.exit(1) //process is a global object in nodejs
        
    }
}

export default connectDB