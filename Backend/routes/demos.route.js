import express from "express";

import {
  getAllDemos,
  GetDemo,
  CreateNewDemo,
  DeleteDemo,
  UpdateDemo,
} from "../controllers/demos.controller.js";

const router = express.Router();

// getting all demos
router.get("/", getAllDemos);

// get a specifique demo
router.get("/:id", GetDemo);

// Adding new demo
router.post("/", CreateNewDemo);

// updating a demo
router.patch("/:id", UpdateDemo);

// delete a demo
router.delete("/:id", DeleteDemo);

export default router;
