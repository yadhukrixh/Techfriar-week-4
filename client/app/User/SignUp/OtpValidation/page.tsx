"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./OtpValidation.module.css";
import Labels from "@/components/ReUsableComponents/Labels/Labels";
import { useSearchParams } from "next/navigation"; // to acess the params
import InputSection from "@/components/ReUsableComponents/InputSection/InputSection";
import CustomizableButton from "@/components/ReUsableComponents/CustomizableButton/CustomizableButton";
import { formatTime, useCountdownTimer } from "@/utils/TimeSetter";
import { sendOtpForEmailValidation } from "@/utils/SendOtpFunctions";
import { saveProperty } from "@/utils/ValuesUpdator";
import { validateOtpForEmail } from "@/utils/ValidationFunctions";


const page: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const [otpButtonClicks, setOtpButtonClicks] = useState(0); // Counts the number of times the OTP button is clicked
  const [timeLeft, isButtonDisabled, resetTimer] = useCountdownTimer(30); // Use the countdown timer hook
  const [errorMessage,setErrorMessage] = useState('');
  const [isPropertyIsValid,setIsPropertyIsValid] = useState(false);

  
  const [userId,setUserId] = useState(
    searchParams.get("userId") || ""
  );

  const [propertyModelName,setPropertyModelName] = useState(
    searchParams.get('propertyModelName') || ""
  );

  const [propertyValue, setPropertyValue] = useState(
    searchParams.get("propertyValue") || ""
  );



  const [isReadOnly, setIsReadOnly] = useState(true);
  const [otpSentStatus , setOtpSentStatus] = useState(false);

  const editProperty= () => {
    setIsReadOnly(false);
  }



  

  return (
    <div className={styles.main}>
      <div className={styles.userForm}>
        <div>
          <Labels value={searchParams.get("propertyLabel") || ""} />
          <InputSection
            type={searchParams.get("type") || "email"}
            value={propertyValue}
            placeholder={searchParams.get("placeholder") || ""}
            onChange={setPropertyValue}
            editableStatus={isReadOnly}
          />
          <p>{errorMessage}</p>
          {isReadOnly && (
            <div>
                <CustomizableButton value="Edit" onClickFunction={editProperty} />
                <CustomizableButton
                    value={
                        otpButtonClicks > 0
                        ? isButtonDisabled
                        ? formatTime(timeLeft)
                        : 'Resend'
                        : 'Send OTP'
                    }
                    onClickFunction={() => sendOtpForEmailValidation(propertyValue, otpButtonClicks, setOtpButtonClicks, resetTimer, setErrorMessage, setOtpSentStatus)}
                    disabled={isButtonDisabled}
                />
            </div>
          )}
          {!isReadOnly && (
            <CustomizableButton value="Save" onClickFunction={() => saveProperty(propertyValue,userId,propertyModelName,setIsReadOnly)} />
          )}
        
          {isReadOnly && otpSentStatus &&
            <div>
                <Labels value="OTP:" />
                <InputSection
                    type='number'
                    value={otp}
                    placeholder="Enter your otp"
                    onChange={setOtp}
                    editableStatus = {false}
                />
                <CustomizableButton value="validate OTP" onClickFunction={()=> validateOtpForEmail(otp,userId,setIsPropertyIsValid,setErrorMessage)}  disabled={false}/>
            </div>
          }
        

        </div>
      </div>
    </div>
  );
};

export default page;
