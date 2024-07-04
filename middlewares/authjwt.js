import jwt from "jsonwebtoken"
import config from "../config/auth.config.js"
import User from "../models/User.js"
import Role from "../models/Role.model.js"

const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    try {
        const decoded = await jwt.verify(token, config.secret);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).send({ message: "Unauthorized!" });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).exec();
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        const roles = await Role.find({ _id: { $in: user.roles } }).exec();
        if (roles.some(role => role.name === "admin")) {
            return next();
        }

        res.status(403).send({ message: "Require Admin Role!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).exec();
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        const roles = await Role.find({ _id: { $in: user.roles } }).exec();
        if (roles.some(role => role.name === "moderator")) {
            return next();
        }

        res.status(403).send({ message: "Require Moderator Role!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};

export default authJwt;
