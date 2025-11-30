import express from "express";
import {
  logIn_Post,
  LogOut_Get,
  SignUP_Post,
} from "../controllers/Auth.controller.js";

const Authrouter = express.Router();
// login
Authrouter.post("/login", logIn_Post);

// signup
Authrouter.post("/signup", SignUP_Post);

// logout
Authrouter.get("/logout", LogOut_Get);

export default Authrouter;
