import express from "express"
import { basicAuth } from "../middleware/basicAuth.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const router = express.Router();

router.get('/basicAuth',basicAuth,(req,res)=>{ return res.status(200).json({messsage:"Authenticated ✔ "})});
router.get('/jwtAuth',jwtAuth,(req,res)=>{ return res.status(200).json({messsage:"Authenticated ✔ "})});

export default router;