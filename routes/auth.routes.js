import express from "express";
const router = express.Router();
import { loginUser } from "../controllers/auth.controller.js";
import { registerUser } from "..//controllers//auth.controller.js"


router.post("/register", registerUser)
router.post("/login", loginUser)

export default router;