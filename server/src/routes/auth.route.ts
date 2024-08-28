// call various routing functions
import express from "express";
import { registerUser, sendOtpToEmail, UpdateUserData, validateOtpForEmail } from "../controllers/auth.controllers";
const router = express.Router();

router.post("/registerUser",registerUser);

router.post("/UpdateUserData",UpdateUserData);

router.post("/SendOtpToEmail",sendOtpToEmail);

router.post("/validateEmailOtp",validateOtpForEmail);







export default router;