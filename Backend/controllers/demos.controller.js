import Demo from "../models/demo.model.js";
import mongoose from "mongoose";

// getting all demos
export const getAllDemos = async (req, res) => {
  try {
    const demos = await Demo.find({});
    res.status(201).json({ success: true, Backdata: demos });
  } catch (error) {
    console.log(`Error in getting all demos: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get a specifique Demo
export const GetDemo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.send(404).json({ success: false, message: "Invalid id demo" });
  }
  try {
    const DemoFind = await Demo.find({ _id: id });
    res
      .status(201)
      .json({ success: true, message: "Demo Found", data: DemoFind });
  } catch (error) {
    console.log(`Error in updating demo: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Adding new demo function
export const CreateNewDemo = async (req, res) => {
  const demo = req.body;
  if (!demo.Title || !demo.Description || !demo.Image) {
    return res
      .status(404)
      .json({ success: false, message: "Please provide all fields !!!" });
  }
  const newDemo = new Demo(demo);
  try {
    await newDemo.save();
    res.status(201).json({ success: true, Backdata: newDemo });
  } catch (error) {
    console.log(`Error in adding new demo: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a specifique Demo
export const UpdateDemo = async (req, res) => {
  const { id } = req.params;
  const demo = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.send(404).json({ success: false, message: "Invalid id demo" });
  }
  try {
    const updatedDemo = await Demo.findByIdAndUpdate(id, demo, { new: true });
    res
      .status(201)
      .json({ success: true, message: "Demo Updated", Backdata: updatedDemo });
  } catch (error) {
    console.log(`Error in updating demo: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a specifique Demo
export const DeleteDemo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.send(404).json({ success: false, message: "Invalid id demo" });
  }

  try {
    await Demo.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: "Demo delted" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: `Error in deleting demo: ${error.message}`,
      });
  }
};
