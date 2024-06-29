import express from "express";
import { getUsers } from "../controllers/user.controller.js";

const router =  express.Router();

router.get("/", (req, res) => { 
    res.json({ name: "user" });
  })


export default router; 