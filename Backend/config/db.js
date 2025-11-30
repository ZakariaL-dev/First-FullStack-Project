import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let ConnectDemoDB;
let ConnectUserDB;

export const connectDemoDB = async () => {
  try {
    ConnectDemoDB = await mongoose
      .createConnection(process.env.Mongo_URL)
      .asPromise();
    console.log(`MongoDB Demo Connected: ${ConnectDemoDB.host}`);
  } catch (error) {
    console.log(`Error Demo db: ${error.message}`);
    process.exit(1); // 1 => exit with failure, 0 => success
  }
};

export const connectUserDB = async () => {
  try {
    ConnectUserDB = await mongoose
      .createConnection(process.env.Mongo_User_URL)
      .asPromise();
    console.log(`MongoDB User Connected: ${ConnectUserDB.host}`);
  } catch (error) {
    console.log(`Error User db: ${error.message}`);
    process.exit(1); // 1 => exit with failure, 0 => success
  }
};

export { ConnectDemoDB, ConnectUserDB };
