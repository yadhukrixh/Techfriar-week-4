import { Request, Response } from 'express';
import User from '../models/userModel';
import { SendOtpToEmail } from '../utils/sendOtp';
import { generateOtp } from '../utils/generateOtp';
import { SessionData } from '../../types/express-session';
import mongoose from 'mongoose';
import { sendOtpEmailService } from '../services/emailServices';

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, phoneNumber, dateOfBirth } = req.body;
    console.log(name, email, phoneNumber, dateOfBirth);

    if (!email) {
        return res.json({ message: 'Email is required' });
    }

    try {
        // Check if user already exists by email
        let user = await User.findOne({ email });
        if (user) {
            return res.json({ message: 'User with this email already exists', emailExist: true });
        }

        // Check if user already exists by phone number
        user = await User.findOne({ phoneNumber });
        if (user) {
            return res.json({ message: 'User with this phone number already exists', phoneNumberExist: true });
        }

        // Create a new user
        user = new User({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            dateOfBirth: dateOfBirth,
            UserRegisteredAt: Date.now()
        });

        // Save the new user to the database
        await user.save();

        // Send a response indicating user registration success
        res.json({ message: "User registered successfully", isUserRegistered: true, userId: user._id.toString() });

    } catch (error) {
        console.error('Error in registerUser:', error);
        // Send a response indicating failure
        res.status(500).json({ error: 'Failed to register user', isUserRegistered: false });
    }
};






export const UpdateUserData = async (req:Request, res:Response) =>{
    const { updatedValue, userID, propertyModelName } = req.body;
    console.log("updation function")
    console.log(userID);

    try {
        // Find the user by userID
        const objectId = new mongoose.Types.ObjectId(userID);

        const user = await User.findOne({  _id: objectId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (propertyModelName in user) {
            // Dynamically update the property with the correct type assertion
            (user as any)[propertyModelName] = updatedValue;

            // Save the updated user document
            await user.save();

            res.status(200).json({ message: 'User updated successfully', user });
        } else {
            res.status(400).json({ message: `Property ${propertyModelName} does not exist on the user model` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }

}


// Send otp to email function
export const sendOtpToEmail = async (req:Request,res:Response) => {
    const { email } = req.body;
    const otp = generateOtp()
    if(!email){
        return res.json({message:'email is required'});
    }
    try{
        // Store OTP, email, and user ID in the session
        (req.session as SessionData).email = email;
        (req.session as SessionData).otp = otp;
        console.log(req.session)

        await sendOtpEmailService(email,otp);
        
    }catch(error){

    }

}




export const validateOtpForEmail = async (req: Request, res: Response) => {
    const { otp , userID } = req.body;

    const objectId = new mongoose.Types.ObjectId(userID);
    try{
        let user = await User.findOne({  _id: objectId });
        const email = user?.email;
        const session = req.session as SessionData;
        console.log(email);
        if(!user){
            return res.status(404);
        }

        if(user.email === (req.session as SessionData).email && (req.session as SessionData).otp === otp){
            res.json({message:'Email Validated', isEmailValid:true});
            (req.session as SessionData).email = '';
            (req.session as SessionData).otp = '';
        }
    }catch(error){

    }
};


