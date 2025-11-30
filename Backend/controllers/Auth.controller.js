import { getUserModel } from "../models/Auth.model.js";
import jwt from "jsonwebtoken";

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);

  let errors = { email: "", password: "" };

  // login errors
  if (err.message === "Email isn't registered") {
    errors.email = err.message;
    return errors;
  }
  if (err.message === "Incorrect Password") {
    errors.password = err.message;
    return errors;
  }

  // duplicate email
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }
  // validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// creating token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_Secret, {
    expiresIn: "3d",
  });
};

// Sign UP
export const SignUP_Post = async (req, res) => {
  const { email, password } = req.body;
  // res.status(201).json({ success: true, message: { email, password } });
  try {
    const User = await getUserModel();
    const NewUser = await User.create({ email, password });
    const Token = createToken(NewUser._id);
    res.cookie("JWT", Token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.cookie("User_Registered", true, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user: NewUser });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ success: false, errors });
  }
};

// log in
export const logIn_Post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await getUserModel();
    const user = await User.login(email, password);
    const Token = createToken(user._id);
    res.cookie("JWT", Token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.cookie("User_Registered", true, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user: user });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ success: false, errors });
  }
};

// log out
export const LogOut_Get = async (req, res) => {
  res.cookie("JWT", "", { maxAge: 1 });
  res.cookie("User_Registered", "", { maxAge: 1 });
  res.status(201).json({ success: true, message: "Logged out" });
};
