import mongoose from "mongoose";

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

const Demo = mongoose.model("Demo", DemoSchema);
export default Demo;
