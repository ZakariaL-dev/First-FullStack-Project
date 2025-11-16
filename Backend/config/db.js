import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conect = await mongoose.connect(process.env.Mongo_URL);
    console.log(`MongoDB Connected: ${conect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // 1 => exit with failure, 0 => success
  }
};
