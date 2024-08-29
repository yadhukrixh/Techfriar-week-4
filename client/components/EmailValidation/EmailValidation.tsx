"use client";

import React, { FC, useState, useEffect } from "react";
import styles from "./EmailValidation.module.css";
import Labels from "../ReUsableComponents/Labels/Labels";
import InputSection from "../ReUsableComponents/InputSection/InputSection";
import CustomizableButton from "../ReUsableComponents/CustomizableButton/CustomizableButton";
import { useCountdownTimer, formatTime } from "@/utils/TimeSetter";
import { sendOtpForEmailValidation } from "@/utils/SendOtpFunctions";
import { validateOtpForEmail } from "@/utils/ValidationFunctions";
import { saveProperty } from "@/utils/ValuesUpdator";

interface EmailValidationProps {
  email:string;
  setEmail:(message:string) => void,
  userId:string;
  setValidStatus: (status: boolean) => void;
  setShowPopUp:(status:boolean) => void;
  setPhoneNumber:(message:string) => void;
}

const EmailValidation: FC<EmailValidationProps> = ({
  email,
  setEmail,
  userId,
  setValidStatus,
  setShowPopUp,
  setPhoneNumber
}) => {


  const [otp, setOtp] = useState("");
  const [otpButtonClicks, setOtpButtonClicks] = useState(0); // Counts the number of times the OTP button is clicked 
  const [timeLeft, isButtonDisabled, resetTimer] = useCountdownTimer(30); // Use the countdown timer hook // component variable
  const [errorMessage, setErrorMessage] = useState("");// component variable
  const [isReadOnly, setIsReadOnly] = useState(true);//component variable
  const [otpSentStatus, setOtpSentStatus] = useState(false);//component varibale

  //function to set editable or not
  const editProperty = () => {
    setIsReadOnly(false);
  }


  return (
    <div className={styles.main}>
      <div className={styles.userForm}>
        <div>
          <Labels value="Email :" />
          <InputSection
            type="email"
            value={email}
            placeholder="Enter your Email"
            onChange={setEmail}
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
                      : "Resend"
                    : "Send OTP"
                }
                onClickFunction={() =>
                  sendOtpForEmailValidation(
                    email,
                    otpButtonClicks,
                    setOtpButtonClicks,
                    resetTimer,
                    setErrorMessage,
                    setOtpSentStatus
                  )
                }
                disabled={isButtonDisabled}
              />
            </div>
          )}
          {!isReadOnly && (
            <CustomizableButton
              value="Save"
              onClickFunction={() =>
                saveProperty(
                  email,
                  userId,
                  'email',
                  setIsReadOnly,
                  setEmail
                )
              }
            />
          )}

          {isReadOnly && otpSentStatus && (
            <div>
              <Labels value="OTP:" />
              <InputSection
                type="number"
                value={otp}
                placeholder="Enter your otp"
                onChange={setOtp}
                editableStatus={false}
              />
              <CustomizableButton
                value="validate OTP"
                onClickFunction={() =>
                  validateOtpForEmail(
                    otp,
                    userId,
                    setValidStatus,
                    setErrorMessage,
                    setShowPopUp,
                    setPhoneNumber
                  )
                }
                disabled={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailValidation;
