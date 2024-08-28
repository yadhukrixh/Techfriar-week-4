

import { emailRegex , phoneNumberRegex , aadharRegex , panRegex } from '@/utils/RegexFunctions';
import axios from 'axios';



// send otp to validate aadhar
export const sendOtpForEmailValidation = async (
    email: string,
    otpButtonClicks: number,
    setOtpButtonClicks: (clicks: number) => void,
    resetTimer: () => void,
    setErrorMessage: (message: string) => void,
    setShowOtpSection: (show: boolean) => void
) => {
    try {
        if (email && emailRegex.test(email)) {
            axios.post('http://localhost:3400/api/auth/sendOtpToEmail', { email });
            setOtpButtonClicks(otpButtonClicks + 1);
            setShowOtpSection(true); // Show OTP section
            resetTimer(); // Start and reset the countdown timer
            setErrorMessage('OTP emailed to your mail');
        } else {
            setErrorMessage('Please Enter a valid email');
        }
    } catch (error: any) {
        console.error("Error on frontend:", error);
        // You can extract and set a more specific error message based on the response
        setErrorMessage(error?.response?.data?.error || 'Failed to send OTP. Please try again.');
    }
};




// send otp to validate Phone number
export const sendOtpForPhoneNumberValidation = (
    phoneNumber: string,
    otpButtonClicks: number,
    setOtpButtonClicks: (clicks: number) => void,
    resetTimer: () => void,
    setErrorMessage: (message: string) => void,
    setShowOtpSection: (show: boolean) => void
) => {
    if (phoneNumber && phoneNumberRegex.test(phoneNumber)) {
        setOtpButtonClicks(otpButtonClicks + 1);
        setShowOtpSection(true); // Show OTP section
        resetTimer(); // Start and reset the countdown timer
        setErrorMessage('');
    } else {
        setErrorMessage('Please Enter a valid Phone Number');
    }
};








// send otp to validate aadhar
export const sendOtpForAadharValidation = (
    aadharNumber: string,
    otpButtonClicks: number,
    setOtpButtonClicks: (clicks: number) => void,
    resetTimer: () => void,
    setErrorMessage: (message: string) => void,
    setShowOtpSection: (show: boolean) => void
) => {
    if (aadharNumber && aadharRegex.test(aadharNumber)) {
        setOtpButtonClicks(otpButtonClicks + 1);
        setShowOtpSection(true); // Show OTP section
        resetTimer(); // Start and reset the countdown timer
        setErrorMessage('');
    } else {
        setErrorMessage('Please Enter a valid Aadhar Number');
    }
};






//  send otp to validate pan
export const sendOtpForPanValidation = (
    panNumber: string,
    otpButtonClicks: number,
    setOtpButtonClicks: (clicks: number) => void,
    resetTimer: () => void,
    setErrorMessage: (message: string) => void,
    setShowOtpSection: (show: boolean) => void
) => {
    if (panNumber && panRegex.test(panNumber)) {
        setOtpButtonClicks(otpButtonClicks + 1);
        setShowOtpSection(true); // Show OTP section
        resetTimer(); // Start and reset the countdown timer
        setErrorMessage('');
    } else {
        setErrorMessage('Please Enter a valid Pan Number');
    }
};
