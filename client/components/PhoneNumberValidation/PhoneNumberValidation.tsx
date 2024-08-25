"use client";

import React, { FC, useState } from 'react';
import styles from './PhoneNumberValidation.module.css';
import Labels from '../ReUsableComponents/Labels/Labels';
import InputSection from '../ReUsableComponents/InputSection/InputSection';
import CustomizableButton from '../ReUsableComponents/CustomizableButton/CustomizableButton';
import { useCountdownTimer ,formatTime } from '@/utils/TimeSetter';
import { sendOtpForPhoneNumberValidation } from '@/utils/SendOtpFunctions';
import { validateOtpForPhoneNumber } from '@/utils/ValidationFunctions';

interface PhoneNumberValidationProps{
  validStatus:boolean;
  setValidStatus:(status: boolean, phoneNumber?:string) => void;
}




const PhoneNumberValidation:FC<PhoneNumberValidationProps> = ({validStatus,setValidStatus}) => {

    const [phoneNumber , setNumber] = useState('');
    const [otp , setOtp] = useState('');
    const [errorMessage , setErrorMessage] = useState('');
    const [otpButtonClicks , setOtpButtonClicks] = useState(0);

    const [isEditable, setIsEditable] = useState(false); // Controls whether the email input is editable
    const [showOtpSection, setShowOtpSection] = useState(false); // Controls the visibility of the OTP section
    const [timeLeft, isButtonDisabled, resetTimer] = useCountdownTimer(30); // Use the countdown timer hook






  return (
    <div className={styles.mainClass}>
      <div>
        <Labels value="Phone number :"/>
        <InputSection 
            type="number"
            value={phoneNumber}
            placeholder="Enter phone number"
            onChange={setNumber}
            editableStatus={isEditable}
        />

        {!validStatus &&
            <CustomizableButton 
                value={
                    otpButtonClicks > 0? isButtonDisabled?formatTime(timeLeft):'Resend':'Send OTP' }
                onClickFunction={() => sendOtpForPhoneNumberValidation(phoneNumber, otpButtonClicks, setOtpButtonClicks, resetTimer, setErrorMessage, setShowOtpSection)}
                disabled={isButtonDisabled}
            />
        }
      </div>
      <p>{errorMessage}</p>

      {showOtpSection && isButtonDisabled &&
        <div>
            <Labels value="OTP :" />
            <InputSection
                type="number"
                value={otp}
                placeholder="Enter OTP"
                onChange={setOtp}
            />
          <CustomizableButton value="Validate" onClickFunction={() => validateOtpForPhoneNumber(otp, setValidStatus, phoneNumber, setIsEditable, setShowOtpSection)} />
        </div>
      }
    </div>
  )
}

export default PhoneNumberValidation;
