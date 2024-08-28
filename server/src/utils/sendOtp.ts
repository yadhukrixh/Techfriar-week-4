
import { sendOtpEmailService } from "../services/emailServices";

export const otpSessions: { [key: string]: string } = {};
export const SendOtpToEmail = async (otp:string,email:string) => {
    
    try{
        await sendOtpEmailService(email,otp);
        console.log("OTP successfully sent")
        console.log();
        
    }catch(error){
        console.error(error,"OTP sending failed");
        
    }
}