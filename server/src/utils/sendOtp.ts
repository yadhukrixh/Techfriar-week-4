import { sendOtpEmailService } from "../services/emailServices";
import { generateOtp } from "./generateOtp"



export const SendOtpToEmail = async (email:string) => {
    const otp = generateOtp();
    try{
        await sendOtpEmailService(email,otp);
        console.log("OTP successfully sent")
    }catch(error){
        console.error(error,"OTP sending failed");
        
    }
}