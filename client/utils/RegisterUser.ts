
import axios from "axios";

export const RegisterUser = async (
    name:string,
    email:string,
    phoneNumber:string,
    dateOfBirth:Date,
    setErrorMessage: (message: string) => void,
    setIsRegistered: (status: boolean) => void,
    setEmailErrorMessage: (message: string) => void,
    setPhoneErrorMessage: (message: string) => void,
    setUserId: (message: string) => void
) =>{
    if(!name && !email && !phoneNumber ){
        setErrorMessage("Folowing fields cant be empty");
    }
    else{
        const response = await axios.post('http://localhost:3400/api/auth/registerUser', {name, email ,phoneNumber,dateOfBirth });
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