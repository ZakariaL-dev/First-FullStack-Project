import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import { ConnectUserDB } from "../config/db.js";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please Enter a valide Email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [12, "Minimum password length is 12 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// password hashing
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// login user
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    let auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Email isn't registered");
};

// exporting model
export const getUserModel = () => {
  if (ConnectUserDB && ConnectUserDB.models && ConnectUserDB.models.User) {
    return ConnectUserDB.models.User;
  }
  if (!ConnectUserDB) {
    throw new Error("User DB connection is not yet established.");
  }
  return ConnectUserDB.model("User", UserSchema);
};
