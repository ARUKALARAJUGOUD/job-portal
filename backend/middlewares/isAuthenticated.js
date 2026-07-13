import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log(req.cookies);
    console.log(req.cookies.token);

    if (!token) {
      return res.status(401).json({
        message: "Not Authenticated ",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    req.id = decode.userId;
    const Id = decode.userId;
    const user = await User.findById(Id);
    req.resumeId = user.resume;

    next();
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: "Server error ",
      error,
    });
  }
};
