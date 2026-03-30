//authorization

import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const authProtect = async (req, res, next) => {
  // get token from request header
  //Bearer token format we want the token part only ['Bearer', 'token']
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }
  try {
    const tokenArr = req.headers.authorization.split(" ");
    const token = tokenArr[1];

    //token has info about user  it has id and role as we put it in payload
    //decode the token based on our jwt secret key first
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.user.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
