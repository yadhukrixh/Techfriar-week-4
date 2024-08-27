import { Request, Response } from 'express';
import { generateOtp } from '../utils/generateOtp'; // function to generate OTP
import express from 'express';
import User from '../models/userModel';
import { SendOtpToEmail } from '../utils/sendOtp';
const app = express();

// Corrected middleware setup
app.use(express.json()); 

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, phoneNumber, dateOfBirth } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create a new user
        user = new User({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            dateOfBirth: dateOfBirth
        });

        // Save the new user to the database
        await user.save();

        // send otp after saved to database
        SendOtpToEmail(email);

    } catch (error) {
        console.error('Error in sendOtpToEmail:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
};




export const validateOtpForEmail = (req: Request, res: Response) => {
    const { email, otp } = req.body;

    // Validate OTP against the stored value here

    res.status(200).json({ message: 'OTP validated successfully' });
};


