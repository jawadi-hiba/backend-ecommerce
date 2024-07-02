import { secret } from "../config/auth.config.js"
import Role from "../models/Role.js";
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
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
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