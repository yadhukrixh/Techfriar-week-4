// write various routed functions, functions will exported
import { Request, Response } from 'express';
import { generateOtp } from '../utils/generateOtp';// function to generate otp
import { sendOtpEmailService } from '../services/emailServices';// otp send to email




export const sendOtpToEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    const otp = generateOtp();
    
    // Save OTP to the database or in-memory store here

    await sendOtpEmailService(email, otp);
    res.status(200).json({ message: 'OTP sent to your email' });
};


export const validateOtpForEmail = (req: Request, res: Response) => {
    const { email, otp } = req.body;

    // Validate OTP against the stored value here

    res.status(200).json({ message: 'OTP validated successfully' });
};
