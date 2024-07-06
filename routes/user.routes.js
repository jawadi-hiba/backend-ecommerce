import express from "express";
import authJwt from "../middlewares/authjwt.js";

const router = express.Router();

router.get("/", authJwt.verifyToken, authJwt.isSuperAdmin, (req, res) => {
  res.json({ name: "user" });
});

export default router;
