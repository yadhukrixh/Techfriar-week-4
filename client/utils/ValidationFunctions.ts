
// validate otp function for the email
export const validateOtpForEmail = (
    otp: string,
    setValidStatus: (status: boolean, email?: string) => void,
    email: string,
    setIsEditable: (editable: boolean) => void,
    setShowOtpSection: (show: boolean) => void
) => {
    if (otp === '123456') {
        setValidStatus(true, email);
        setIsEditable(true);
        setShowOtpSection(false);
    } else {
        alert('Invalid OTP');
        setValidStatus(false);
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
        setValidStatus(true, panNumber);
        setIsEditable(true);
        setShowOtpSection(false);
    } else {
        alert('Invalid OTP');
        setValidStatus(false);
    }
};