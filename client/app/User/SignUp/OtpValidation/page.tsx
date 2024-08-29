"use client";

import { useEffect, useState } from "react";
import styles from "./OtpValidation.module.css";
import { useRouter, useSearchParams } from "next/navigation"; // to acess the params
import EmailValidation from "@/components/EmailValidation/EmailValidation";
import ShowPopUpComponent from "@/components/ShowPopUp/ShowPopUp";
import PhoneNumberValidation from "@/components/PhoneNumberValidation/PhoneNumberValidation";

const page: React.FC = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("propertyValue") || "");
  const [isEmailIsValid, setIsEmailIsValid] = useState(false);
  const [isPhoneNumberIsValid, setIsPhoneNumberIsValid] = useState(false);
  const [ShowPopUp, setShowPopUp] = useState(false);
  const [userId, setUserId] = useState(searchParams.get("userId") || "");
  const [propertyModelName, setPropertyModelName] = useState(
    searchParams.get("propertyModelName") || ""
  );
  const [phoneNumber, setPhoneNumber] = useState("");


  const router = useRouter();
  const queryParams = new URLSearchParams({
    userId : userId
  });

  useEffect(()=>{
    if(isEmailIsValid && isPhoneNumberIsValid && !ShowPopUp){
      router.push(`/User/SignUp/KYCValidation?${queryParams}`);
    }
  },[])

  return (
    <div className={styles.main}>
      <div className={styles.userForm}>
        {!isEmailIsValid && (
          <EmailValidation
            email={email}
            setEmail={setEmail}
            userId={userId}
            setValidStatus={setIsEmailIsValid}
            setShowPopUp={setShowPopUp}
            setPhoneNumber={setPhoneNumber}
          />
        )}
        {isEmailIsValid && (
          <PhoneNumberValidation
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            userId={userId}
            setValidStatus={setIsPhoneNumberIsValid}
            setShowPopUp={setShowPopUp}
          />
        )}
      </div>

      {ShowPopUp && isEmailIsValid && (
        <ShowPopUpComponent
          valueType="Email"
          value={email}
          setShowPopUp={setShowPopUp}
        />
      )}

      {isEmailIsValid && isPhoneNumberIsValid && ShowPopUp && (
        <ShowPopUpComponent
          valueType="Phone Number"
          value={phoneNumber}
          setShowPopUp={setShowPopUp}
        />
      )}
    </div>
  );
};

export default page;
