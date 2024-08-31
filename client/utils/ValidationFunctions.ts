import axios from "axios";
import { aadharRegex, bankRegex, ifscRegex, panRegex } from "./RegexFunctions";

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
        return error;
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
        return error;
    }
};




export const validateAadhaar =  async (
    userId:string,
    aadhaarNumber: string,
    setValidStatus: (status: boolean) => void,
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
        return error;
    }
};



// validate otp function for pan card
export const validatePan = async(
    userId:string,
    panNumber: string,
    setValidStatus: (status: boolean) => void,
    setShowPopUp: (show: boolean) => void,
    setErrorMessage:(message:string) => void
) => {
    if (!panNumber || !panRegex.test(panNumber)){
        setErrorMessage("Enter a Valid Pan Number");
    } 
    try{
        const response = await axios.post("http://localhost:3400/api/auth/validatePan",{ userId , panNumber})
        if(response.data.isValid){
            setValidStatus(true);
            setShowPopUp(true);
        }
        setErrorMessage(response.data.message)
    }catch(error){
        return error;
    }
};


// For bank validation
export const bankAccountValidation = async(
    userId:string,
    accountNumber:string,
    ifscCode:string,
    setBankAccountNumber:(message:string)=>void,
    setErrorMessage:(meassage:string)=>void,
    setShowPopup:(status:boolean)=>void,
    setIsValid:(status:boolean)=>void
) => {
    if(!bankRegex.test(accountNumber) || !ifscRegex.test(ifscCode)){
        setErrorMessage("Enter a valid format document");
    }

    try{
        const response = await axios.post("http://localhost:3400/api/auth/validateBankAccount", {userId,accountNumber,ifscCode});
        if(!response.data.isValid){
            setErrorMessage(response.data.message);
            setIsValid(response.data.isValid);
            setShowPopup(response.data.isValid);
        }
        else{
            setIsValid(response.data.isValid);
            setShowPopup(response.data.isValid);
            setBankAccountNumber(accountNumber);
        }
    }
    catch(error){
        return error
    }
}