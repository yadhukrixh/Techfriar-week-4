import axios from "axios";
import { aadharRegex } from "./RegexFunctions";

// validate otp function for the email
export const validateOtpForEmail = async(
    otp: string,
    userID:string,
    setValidStatus: (status: boolean) => void,
    setErrorMessage: (message:string) => void,
    setShowPopUp:(status:boolean) => void,
    setPhoneNumber:(message:string) => void
) => {
    if (!otp) {
        setErrorMessage('Field can not be empty!')
    }
    try{
        const response = await axios.post("http://localhost:3400/api/auth/validateOtp", { otp , userID });
        if(response.data.isValid){
            const number = response.data.phoneNumber;
            setPhoneNumber(number);
            setValidStatus(true);
            setShowPopUp(true)
        }
        else{
            setErrorMessage("Invalid OTP, Try again!")
        }
    }catch(error){

    }
};




//   Validate otp function for phone
export const validateOtpForPhoneNumber = async (
    otp: string,
    userID:string,
    setValidStatus: (status: boolean) => void,
    setErrorMessage: (message:string) => void,
    setShowPopUp: (show: boolean) => void
) => {
    if (!otp) {
        setErrorMessage('Field can not be empty!')
    }
    try{
        console.log("client function worked");
        const response = await axios.post("http://localhost:3400/api/auth/validateOtp", { otp , userID });
        if(response.data.isValid){
            setValidStatus(true);
            setShowPopUp(true)
        }
        else{
            setErrorMessage("Invalid OTP, Try again.")
        }
    }catch(error){

    }
};




export const validateAadhaar =  async (
    userId:string,
    aadhaarNumber: string,
    setValidStatus: (status: boolean, aadharNumber?: string) => void,
    setShowPopUp: (show: boolean) => void,
    setErrorMessage:(message:string) => void
) => {
    if (!aadhaarNumber || !aadharRegex.test(aadhaarNumber)){
        setErrorMessage("Enter a Valid Aadhaar Number");
    } 
    try{
        const response = await axios.post("http://localhost:3400/api/auth/validateAadhaar",{ userId , aadhaarNumber})
        if(response.data.isValid){
            setValidStatus(true);
            setShowPopUp(true);
        }
        setErrorMessage(response.data.message)
    }catch(error){

    }
};



// // validate otp function for pan card
// export const validateOtpForPanCard = (
//     otp: string,
//     setValidStatus: (status: boolean, panNumber?: string) => void,
//     panNumber: string,
//     setIsEditable: (editable: boolean) => void,
//     setShowOtpSection: (show: boolean) => void
// ) => {
//     if (otp === '123456') {
//         setValidStatus(true , panNumber);
//         setIsEditable(true);
//         setShowOtpSection(false);
//     } else {
//         alert('Invalid OTP');
//         setValidStatus(false);
//     }
// };