import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USER_EMAIL, // your Gmail address
        pass: process.env.EMAIL_PASSWORD, // your Gmail password
    },
});

export const sendOtpEmailService = async (to: string, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Your OTP for Email Validation',
        text: `Your OTP code is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent');
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
};
