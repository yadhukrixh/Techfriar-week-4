import React, { FC, useState } from 'react';
import styles from './AadharValidation.module.css';
import Labels from '../ReUsableComponents/Labels/Labels';
import InputSection from '../ReUsableComponents/InputSection/InputSection';
import CustomizableButton from '../ReUsableComponents/CustomizableButton/CustomizableButton';
import { formatTime, useCountdownTimer } from '@/utils/TimeSetter';
import { validateOtpForAadhar } from '@/utils/ValidationFunctions';
import { sendOtpForAadharValidation } from '@/utils/SendOtpFunctions';

interface AadharValidationProps{
    validStatus: boolean;
    setValidStatus: (status: boolean, aadharNumber?:string) => void;
}



const AadharValidation:FC<AadharValidationProps> = ({validStatus , setValidStatus}) => {
    const [aadharNumber , setAadharNumber] = useState('');
    const [otpButtonClicks , setOtpButtonClicks] = useState(0);
    const [errorMessage , setErrorMessage] = useState('');
    const [otp , setOtp] = useState('');


    const [isEditable , setIsEditable] = useState(false);
    const [timeLeft, isButtonDisabled, resetTimer] = useCountdownTimer(30);
    const [showOtpSection , setShowOtpSection] = useState(false);




  return (
    <div className={styles.mainClass}>
      <div>
        <Labels value='Aadhar Number :' />
        <InputSection 
            type='number'
            value={aadharNumber}
            placeholder='Aadhar Number'
            onChange={setAadharNumber}
            editableStatus={isEditable}
        />

        {!validStatus &&
            <CustomizableButton
                value={
                    otpButtonClicks>0 ? isButtonDisabled ? formatTime(timeLeft) : 'Resend' : 'Send OTP'}
                onClickFunction={() => sendOtpForAadharValidation(aadharNumber, otpButtonClicks, setOtpButtonClicks, resetTimer, setErrorMessage, setShowOtpSection)}
                disabled={isButtonDisabled}
            />
        }
      </div>
      <p>{errorMessage}</p>

      {showOtpSection && isButtonDisabled &&
        <div>
            <Labels value='OTP :' />
            <InputSection
                type="number"
                value={otp}
                placeholder="Enter OTP"
                onChange={setOtp}
            />
            <CustomizableButton value="Validate" onClickFunction={() => validateOtpForAadhar(otp, setValidStatus, aadharNumber, setIsEditable, setShowOtpSection)} />
        </div>
        }


    </div>
    
  )
}

export default AadharValidation;
