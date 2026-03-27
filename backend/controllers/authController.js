import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    //get user details from body
    const { name, email, password } = req.body;

    //check: user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with email already exists!" });
    }

    //create password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    //save user to database
    await user.save();

    //create and return token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5d" },
      (err, token) => {
        if (err) {
          console.error(err);
          throw new err();
        }
        //return token
        return res.status(201).json(token);
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
};



export const loginUser = async (req, res) => {
  try {
    //get email and password from request
    const { email, password } = req.body;

    //check: if user exists
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //match passwords(password from login request is encrypted and compatred to stored hashed)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5d" },
      (err, token) => {
        if (err) {
          console.error(err);
          throw new err();
        }
        //return token
        return res.status(200).json(token);
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
