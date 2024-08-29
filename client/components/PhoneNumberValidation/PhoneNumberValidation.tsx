"use client";

import React, { FC, useState, useEffect } from "react";
import styles from "./PhoneNumberValidation.module.css";
import Labels from "../ReUsableComponents/Labels/Labels";
import InputSection from "../ReUsableComponents/InputSection/InputSection";
import CustomizableButton from "../ReUsableComponents/CustomizableButton/CustomizableButton";
import { useCountdownTimer, formatTime } from "@/utils/TimeSetter";
import { sendOtpForPhoneNumberValidation } from "@/utils/SendOtpFunctions";
import { validateOtpForPhoneNumber } from "@/utils/ValidationFunctions";
import { saveProperty } from "@/utils/ValuesUpdator";

interface PhoneNumberValidationProps {
  phoneNumber:string;
  setPhoneNumber:(message:string) => void,
  userId:string;
  setValidStatus: (status: boolean) => void;
  setShowPopUp:(status:boolean) => void;
}

const PhoneNumberValidation: FC<PhoneNumberValidationProps> = ({
  phoneNumber,
  setPhoneNumber,
  userId,
  setValidStatus,
  setShowPopUp
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
          <Labels value="Phone Number :" />
          <InputSection
            type="number"
            value={phoneNumber}
            placeholder="Enter your Email"
            onChange={setPhoneNumber}
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
                  sendOtpForPhoneNumberValidation(
                    phoneNumber,
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
                  phoneNumber,
                  userId,
                  'phoneNumber',
                  setIsReadOnly,
                  setPhoneNumber
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
                  validateOtpForPhoneNumber(
                    otp,
                    userId,
                    setValidStatus,
                    setErrorMessage,
                    setShowPopUp
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

export default PhoneNumberValidation;
