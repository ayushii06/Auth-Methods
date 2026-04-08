import express from "express"
import { basicAuth } from "../middleware/basicAuth.js";

const router = express.Router();

router.get('/login',basicAuth,(req,res)=>{ return res.status(200).json({messsage:"Authenticated ✔ "})});

export default router;