//we will handle connectivity bettween express and mongodb here
//const mpngoose=require('mongoose'); commonjs syntax
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB Atlas connection failed:", err.message);
    process.exit(1);
  }
};
export default connectDb;
