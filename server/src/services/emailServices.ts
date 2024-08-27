import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USER_EMAIL, // your Gmail address
        pass: process.env.EMAIL_PASSWORD, // your Gmail password
    },
});

export const sendOtpEmailService = async (recipientEmail: string, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: 'Your OTP for Email Validation',
        text: `Your OTP code is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send email'); // Ensure you handle or re-throw the error properly
    }
};
