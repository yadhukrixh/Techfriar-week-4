"use client";

import React, { FC, useState, useEffect } from 'react';
import styles from './EmailValidation.module.css';
import Labels from '../ReUsableComponents/Labels/Labels';
import InputSection from '../ReUsableComponents/InputSection/InputSection';
import CustomizableButton from '../ReUsableComponents/CustomizableButton/CustomizableButton';
import { useCountdownTimer , formatTime } from '@/utils/TimeSetter';
import { sendOtpForEmailValidation } from '@/utils/SendOtpFunctions';
import { validateOtpForEmail } from '@/utils/ValidationFunctions';



interface EmailValidationProps {
  validStatus: boolean;
  setValidStatus: (status: boolean, email?: string) => void;
}

const EmailValidation: FC<EmailValidationProps> = ({ validStatus, setValidStatus}) => {
  const [email, setEmail] = useState(''); // State to manage email input
  const [otp, setOtp] = useState(''); // State to manage OTP input
  const [errorMessage, setErrorMessage] = useState(''); // Manages error or validation messages
  const [otpButtonClicks, setOtpButtonClicks] = useState(0); // Counts the number of times the OTP button is clicked
  const [timeLeft, isButtonDisabled, resetTimer] = useCountdownTimer(30); // Use the countdown timer hook


  const [isEditable, setIsEditable] = useState(false); // Controls whether the email input is editable
  const [showOtpSection, setShowOtpSection] = useState(false); // Controls the visibility of the OTP section
  
  

  return (
    <div className={styles.mainClass}>
      <div>
        {/* Label and Input for Email */}
        <Labels value="Email :" />
        <InputSection
          type="email"
          value={email}
          placeholder="Email"
          onChange={setEmail}
          editableStatus={isEditable}
        />

        {/* OTP Button: Show the button with a timer and disabled state */}
        {!validStatus &&
        <CustomizableButton
          value={
            otpButtonClicks > 0
            ? isButtonDisabled
              ? formatTime(timeLeft)
              : 'Resend'
              : 'Send OTP'
          }
          onClickFunction={() => sendOtpForEmailValidation(email, otpButtonClicks, setOtpButtonClicks, resetTimer, setErrorMessage, setShowOtpSection)}
          disabled={isButtonDisabled}
        />}
      </div>

      {/* Display Error Message */}
      <p>{errorMessage}</p>

      {/* OTP Section: Show only if showOtpSection is true */}
      {showOtpSection && isButtonDisabled &&
        <div>
          <Labels value="OTP :" />
          <InputSection
            type="number"
            value={otp}
            placeholder="Enter OTP"
            onChange={setOtp}
          />
          <CustomizableButton value="Validate" onClickFunction={() => validateOtpForEmail(otp, setValidStatus, email, setIsEditable, setShowOtpSection)} />
        </div>
      }
    </div>
  );
};

export default EmailValidation;
