
import axios from "axios";
import { passwordRegex } from "./RegexFunctions";

export const RegisterUser = async (
    name:string,
    email:string,
    phoneNumber:string,
    dateOfBirth:Date,
    password:string,
    setErrorMessage: (message: string) => void,
    setIsRegistered: (status: boolean) => void,
    setEmailErrorMessage: (message: string) => void,
    setPhoneErrorMessage: (message: string) => void,
    setUserId: (message: string) => void,
    setPasswordErrorMessage:(message:string) => void
) =>{
    if(!name && !email && !phoneNumber && !password){
        setErrorMessage("Folowing fields cant be empty");
    }
    else if(!passwordRegex.test(password)){
        setPasswordErrorMessage("Password must contain upper case,lower case,special caharacter and also minimum 8 letters")
    }
    else{
        const response = await axios.post('http://localhost:3400/api/auth/registerUser', {name, email ,phoneNumber,dateOfBirth, password });
        const message = response.data.message;
        setIsRegistered(response.data.isUserRegistered);
        setUserId(response.data.userId);

        if(response.data.emailExist){
            setEmailErrorMessage(message);
            setPhoneErrorMessage('');
        }

        if(response.data.phoneNumberExist){
            setPhoneErrorMessage(message);
            setEmailErrorMessage('');
        }
        
    }

}