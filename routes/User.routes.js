import express from "express";
import { getUsers } from "../Controller/User.Controller";

const router =  express.Router();

router.get("/", (req, res) => { 
    res.json({ name: "nooo" });
  })


export default router; 