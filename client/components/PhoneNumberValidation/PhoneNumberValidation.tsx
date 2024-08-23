"use client";

interface PhoneNumberValidationProps{
    validStatus:boolean;
    setValidStatus:(status: boolean, PhoneNumber?:string) => void;
}

import React, { FC, useState } from 'react';
import styles from './PhoneNumberValidation.module.css';
import Labels from '../ReUsableComponents/Labels/Labels';
import InputSection from '../ReUsableComponents/InputSection/InputSection';
import CustomizableButton from '../ReUsableComponents/CustomizableButton/CustomizableButton';
import { useCountdownTimer ,formatTime } from '@/utils/TimeSetter';

// Define the regex pattern for phone number validation
const phoneNumberRegex = /^\d{10}$/;

const PhoneNumberValidation:FC<PhoneNumberValidationProps> = ({validStatus,setValidStatus}) => {

    const [phoneNumber , setNumber] = useState('');
    const [otp , setOtp] = useState('');
    const [errorMessage , setErrorMessage] = useState('');
    const [otpButtonClicks , setOtpButtonClicks] = useState(0);

    const [isEditable, setIsEditable] = useState(false); // Controls whether the email input is editable
    const [showOtpSection, setShowOtpSection] = useState(false); // Controls the visibility of the OTP section
    const [timeLeft, isButtonDisabled, resetTimer] = useCountdownTimer(30); // Use the countdown timer hook

    const sendOtp= ()=> {
        if(phoneNumber && phoneNumberRegex.test(phoneNumber)){
            setOtpButtonClicks(otpButtonClicks + 1);
            setShowOtpSection(true); // Show OTP section
            setErrorMessage('');
            resetTimer();
        }
        else{
            setErrorMessage("Enter a valid Phone number");
        }

    }


    const validateOtp = () =>{
        if (otp === '123456') {
            setValidStatus(true, phoneNumber);
            setIsEditable(true);
            setShowOtpSection(false);
          } else {
            alert('Invalid OTP');
            setValidStatus(false);
          }
    }



  return (
    <div className={styles.mainClass}>
      <div>
        <Labels value="Phone number:"/>
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
                onClickFunction={sendOtp}
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
          <CustomizableButton value="Validate" onClickFunction={validateOtp} />
        </div>
      }
    </div>
  )
}

export default PhoneNumberValidation;
