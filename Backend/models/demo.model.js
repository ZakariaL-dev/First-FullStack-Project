import mongoose from "mongoose";
import { ConnectDemoDB } from "../config/db.js";

const DemoSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    // Description
    Description: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //when you added the data => createdAt, updatedAt
  }
);

export const getDemoModel = () => {
  if (ConnectDemoDB && ConnectDemoDB.models && ConnectDemoDB.models.Demo) {
    return ConnectDemoDB.models.Demo;
  }
  if (!ConnectDemoDB) {
    throw new Error("Demo DB connection is not yet established.");
  }
  return ConnectDemoDB.model("Demo", DemoSchema);
};
