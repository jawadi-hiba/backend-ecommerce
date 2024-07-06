import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import Role from "../models/Role.js";
import User from "../models/User.js";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send({ message: "Unauthorized!" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const role = await Role.findById(user.role);
    if (!role) {
      return res.status(404).send({ message: "Role not found!" });
    }

    if (role.name === "admin") {
      return next();
    }

    res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isSuperAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const role = await Role.findById(user.role);
    if (!role) {
      return res.status(404).send({ message: "Role not found!" });
    }

    if (role.name === "superadmin") {
      return next();
    }

    res.status(403).send({ message: "Require Super Admin Role!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isSuperAdmin,
};

export default authJwt;
