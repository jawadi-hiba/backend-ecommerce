import express from "express";
import { getUsers } from "../controller/user.controller.js";

const router =  express.Router();

router.get("/", (req, res) => { 
    res.json({ name: "nooo" });
  })


export default router; 