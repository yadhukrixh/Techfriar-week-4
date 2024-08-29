
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();



export const sendOtpToPhoneNumberService = async (phoneNumber: string, otp:string) => {
    try {
        const serviceSid = process.env.TWILIO_ACCOUNT_SID;
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        await client.messages.create({
            body:`Your otp is ${otp}`,
            from:process.env.TWILIO_PHONE_NO,
            to:phoneNumber
        });
        console.log('sms sent')
    } catch (error) {
        console.error('Error sending OTP to phone number:', error);
        throw new Error('Failed to send OTP to phone number');
    }
};