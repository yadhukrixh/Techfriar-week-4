// call various routing functions
import express from "express";
import { registerUser, validateOtpForEmail } from "../controllers/auth.controllers";
const router = express.Router();

router.post("/registerUser",registerUser);

router.post("/validateEmailOtp",validateOtpForEmail);





export default router;