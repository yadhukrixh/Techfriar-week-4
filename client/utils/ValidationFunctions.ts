import axios from "axios";

// validate otp function for the email
export const validateOtpForEmail = async(
    otp: string,
    userID:string,
    setValidStatus: (status: boolean) => void,
    setErrorMessage: (message:string) => void
) => {
    if (!otp) {
        setErrorMessage('Field can not be empty!')
    }
    try{
        await axios.post("http://localhost:3400/api/auth/validateEmailOtp", { otp , userID });
        
        setValidStatus(true);
    }catch(error){

    }
};




//   Validate otp function for phone
export const validateOtpForPhoneNumber = (
    otp: string,
    setValidStatus: (status: boolean, phoneNumber?: string) => void,
    phoneNumber: string,
    setIsEditable: (editable: boolean) => void,
    setShowOtpSection: (show: boolean) => void
) => {
    if (otp === '123456') {
        setValidStatus(true, phoneNumber);
        setIsEditable(true);
        setShowOtpSection(false);
    } else {
        alert('Invalid OTP');
        setValidStatus(false);
    }
};




// Validate otp function for aadhar
export const validateOtpForAadhar = (
    otp: string,
    setValidStatus: (status: boolean, aadharNumber?: string) => void,
    aadharNumber: string,
    setIsEditable: (editable: boolean) => void,
    setShowOtpSection: (show: boolean) => void
) => {
    if (otp === '123456') {
        setValidStatus(true, aadharNumber);
        setIsEditable(true);
        setShowOtpSection(false);
    } else {
        alert('Invalid OTP');
        setValidStatus(false);
    }
};



// validate otp function for pan card
export const validateOtpForPanCard = (
    otp: string,
    setValidStatus: (status: boolean, panNumber?: string) => void,
    panNumber: string,
    setIsEditable: (editable: boolean) => void,
    setShowOtpSection: (show: boolean) => void
) => {
    if (otp === '123456') {
        setValidStatus(true , panNumber);
        setIsEditable(true);
        setShowOtpSection(false);
    } else {
        alert('Invalid OTP');
        setValidStatus(false);
    }
};