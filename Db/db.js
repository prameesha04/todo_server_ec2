//we will handle connectivity bettween express and mongodb here
//const mpngoose=require('mongoose'); commonjs syntax
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDb =  () => {
   try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
   } catch (err) {
    console.log(err);
   }
}
export default connectDb;
