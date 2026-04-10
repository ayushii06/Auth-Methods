import express from "express"
import { basicAuth } from "../middleware/basicAuth.js";
import { jwtAuth, refreshAuth } from "../middleware/jwtAuth.js";
import { callback, redirect } from "../middleware/openIDConnectAuth.js";

const router = express.Router();

router.get('/basicAuth',basicAuth,(req,res)=>{ return res.status(200).json({messsage:"Authenticated ✔ "})});
router.get('/jwtAuth',jwtAuth,(req,res)=>{ return res.status(200).json({messsage:"Authenticated ✔ "})});
router.get('/refresh',refreshAuth,(req,res)=>{ return res.status(200).json({messsage:"New Token Generated ✔ "})});
router.get("/google",redirect);
router.get("/callback",callback);
export default router;