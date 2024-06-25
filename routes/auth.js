import express from "express";
import User from "../models/User.js";
const router =  express.Router();
import CryptoJS from "crypto-js"

//register

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: crypto-js.AES.encrypt(req.body.password, process.env.pass_sec)  
   });

  try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
