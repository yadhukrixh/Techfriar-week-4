// call various routing functions
import express from "express";
import { registerUser, sendOtp, UpdateUserData, validateAadhaar, validateOtp } from "../controllers/auth.controllers";
import session from "express-session";


const router = express.Router();

router.post("/registerUser",registerUser);

router.post("/UpdateUserData",UpdateUserData);

router.post("/SendOtp",sendOtp);

router.post("/validateOtp",validateOtp);

router.post("/validateAadhaar",validateAadhaar);







export default router;