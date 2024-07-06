import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import Role from "../models/Role.js";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    if (req.body.role) {
      const role = await Role.findOne({ name: req.body.role });
      savedUser.role = role._id;
    }

    if (!req.body.role) {
      const defaultRole = await Role.findOne({ name: "user" });
      savedUser.role = defaultRole._id;
    }

    const newuser = await savedUser.save();
    res.send({ message: "User was registered successfully!", user: newuser });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    }).populate("role", "-__v");
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!",
      });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role.name,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
