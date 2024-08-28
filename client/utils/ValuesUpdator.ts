import axios from "axios"

export const saveProperty = async(
    updatedValue:string ,
     userID:string , 
     propertyModelName:string,
     setIsReadOnly: (show:boolean) => void
    ) =>{
    const response = await axios.post('http://localhost:3400/api/auth/UpdateUserData',{updatedValue,userID,propertyModelName});
    setIsReadOnly(true);
}