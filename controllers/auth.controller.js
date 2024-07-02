import { secret } from "../config/auth.config.js"
import User from "../models/User.js";
// const user = db.user;
// const Role = db.role;
import bcrypt from 'crypto-js';
import jwt from "jsonwebtoken";



//singup
export const registerUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
  res.send({ message: "User was registered successfully!" });

};

//signin 
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("wrong credentials!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.pass_sec
    );

    const originalPassword = hashedPassword.toString(CryptoJS.env.utf8);
    password !== req.body.password &&
      res.status(401).json("wrong credentials!");
    const accessToken = jwt.sign({
      id: user._id
    })
    const { password, ...others } = user;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }

}