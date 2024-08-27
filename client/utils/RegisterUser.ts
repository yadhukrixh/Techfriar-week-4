import axios from "axios";

export const RegisterUser = async (
    name:string,
    email:string,
    phoneNumber:string,
    dateOfBirth:Date,
    setErrorMessage: (message: string) => void
) =>{
    if(!name && !email && !phoneNumber ){
        setErrorMessage("Folowing fields cant be empty");
    }
    else{
        const response = await axios.post('http://localhost:3400/api/auth/registerUser', {name, email ,phoneNumber,dateOfBirth });
        setErrorMessage('');
    }

}