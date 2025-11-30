import { getUserModel } from "../models/Auth.model.js";
import jwt from "jsonwebtoken";

const checkUser = async (req, res, next) => {
  const token = req.cookies.JWT;

  if (token) {
    const User = await getUserModel();
    jwt.verify(token, process.env.JWT_Secret, async (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decoded);
        let user = await User.findbyId(decoded.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export default checkUser;
