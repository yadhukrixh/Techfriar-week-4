// call various routing functions
import express from "express";
import { sendOtpToEmail, validateOtpForEmail } from "../controllers/auth.controllers";
const router = express.Router();

router.post("/sendOtpToEmail",sendOtpToEmail);

router.post("validateEmailOtp",validateOtpForEmail)