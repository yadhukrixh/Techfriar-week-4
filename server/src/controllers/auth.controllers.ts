import { Request, Response } from 'express';
import User from '../models/userModel';
import { generateOtp } from '../utils/generateOtp';
import { SessionData } from '../../types/express-session';
import mongoose from 'mongoose';
import { sendOtpEmailService } from '../services/emailServices';
import { sendOtpToPhoneNumberService } from '../services/phoneServices';
import { aadhaarApi } from '../services/aadhaarServices';
import { panApi } from '../services/panServices';
import { bankAccountValidation, getRequestId} from '../services/bankAccountService';

const sessionStore: { [key: string]: SessionData } = {};

let globalSessionID: string;

// register user
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, phoneNumber, dateOfBirth, password } = req.body;
    console.log(name,email,phoneNumber,dateOfBirth,password);

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
            UserRegisteredAt: Date.now(),
            password:password
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





// update user data
export const UpdateUserData = async (req:Request, res:Response) =>{
    const { updatedValue, userID, propertyModelName } = req.body;
    

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

            res.status(200).json({ message: 'User updated successfully', user, propertyValue:updatedValue });
        } else {
            res.status(400).json({ message: `Property ${propertyModelName} does not exist on the user model` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }

}


// Send otp to email / phone number function
export const sendOtp = async (req:Request,res:Response) => {
    const { field,value } = req.body;
    const otp = generateOtp()
    if(!value){
        return res.json({message:`${field} is required`});
    }
    try{
        // Store OTP, email, and user ID in the session
        (req.session as SessionData).field = field;
        (req.session as SessionData).value = value;
        (req.session as SessionData).otp = otp;
        globalSessionID = req.sessionID;

        sessionStore[req.sessionID] = req.session as SessionData;

        if(field === 'email'){
            await sendOtpEmailService(value,otp);
        }
        else{
            const updatedValue = `+91${value}`
            await sendOtpToPhoneNumberService(updatedValue,otp);
        }
        
    }catch(error){

    }

}



// validate otp of email / phone number
export const validateOtp = async (req: Request, res: Response) => {
    const { otp , userID } = req.body;

    const objectId = new mongoose.Types.ObjectId(userID);
    const session =await sessionStore[globalSessionID];
    

    try{
        let user = await User.findOne({  _id: objectId });
          // Log session data

        if(!user){
            return res.status(404);
        }

        let data: string | undefined;

        if(session.field === 'email'){
            data = user.email?.toString();
        }
        else if(session.field === 'phoneNumber'){
            data = user.phoneNumber?.toString();
        }


        if (data === session.value && session.otp === otp) {
            // OTP is valid
            if(session.field === "email"){
                await User.updateOne(
                    { _id: objectId },
                    { 
                      $set: {
                        emailValidatedAt: new Date(),
                      }
                })
                return res.status(200).json({ message: 'Email validated successfully', isValid: true,phoneNumber:user.phoneNumber });
            }else{
                await User.updateOne(
                    { _id: objectId },
                    { 
                      $set: {
                        phoneNumberValidatedAt: new Date(),
                      }
                }) 
                return res.status(200).json({ message: 'Email validated successfully', isValid: true});
            }

            session.field = '';
            session.otp = '';
            session.value = '';
              
        } else {
            // OTP is invalid
            return res.status(400).json({ message: 'Invalid OTP or email', isValid: false });
        }
    }catch(error){

    }
};


//validate aadhaar
export const validateAadhaar = async(req:Request,res:Response)=>{
    const {userId,aadhaarNumber} = req.body;
    const objectId = new mongoose.Types.ObjectId(userId);
    try{
        let user = await User.findOne({  _id: objectId });
        if(user?.aadharNumber === aadhaarNumber){
            res.json({ message: 'Aadhaar is already exist'});
        }
        else{
            const response = await aadhaarApi(aadhaarNumber);
            if(response){
                await User.updateOne(
                    { _id: objectId },
                    { 
                    $set: {
                        aadharNumber: aadhaarNumber,
                        aadharValidatedAt: new Date(),
                    }
                    }
                );
                res.json({message:"Aadhaar validated",isValid:true});
            }else{
                res.json({message:"Enter a valid aadhaar",isValid:false});
            } 
        }
    }catch(error)
    {
        res.status(404).json({message:error,isValid:false});
    }
}


//validate pan card
export const validatePan = async(req:Request,res:Response) => {
    const{userId , panNumber} = req.body;
    const objectId = new mongoose.Types.ObjectId(userId);
    try{
        let user = await User.findOne({_id: objectId});
        if(user?.panNumber === panNumber){
            res.json({ message: 'Pan is already exist'});
        }
        else{
            const response = await panApi(panNumber);
            if(response){
                await User.updateOne(
                    { _id: objectId },
                    { 
                    $set: {
                        panNumber: panNumber,
                        panValidatedAt: new Date(),
                    }
                    }
                );
                res.json({message:"Pan validated",isValid:true});
            }else{
                res.json({message:"Enter a valid Pan number",isValid:false});
            }
        }
    }catch(error){
        res.status(404).json({message:error,isValid:false});
    }
}



// validate bank account details
export const validateBankAccount = async (req:Request,res:Response) => {
    const {userId,accountNumber,ifscCode} = req.body;
    const objectId = new mongoose.Types.ObjectId(userId);
    try{
        let user = await User.findOne({_id: objectId});
        if(user?.bankAccountNumber === accountNumber){
            res.json({ message: 'Bank Account is already validated', isValid:false});
        }
        else{
            const requestId:any = await getRequestId(accountNumber,ifscCode);

            const response = await bankAccountValidation(requestId)

            if(response){
                await User.updateOne(
                    { _id: objectId },
                    { 
                    $set: {
                        bankAccountNumber: accountNumber,
                        ifscCode:ifscCode,
                        bankAccountValidatedAt: new Date(),
                    }
                    }
                );
                res.json({message:"Bank account validated",isValid:true});
            }else{
                res.json({message:"Enter a valid bank account number",isValid:false});
            }
        }
    }catch(error){
        res.status(404).json({message:error,isValid:false});
    }
}


