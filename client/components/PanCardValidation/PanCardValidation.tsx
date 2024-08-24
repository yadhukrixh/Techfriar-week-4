import React, { FC, useState } from 'react';
import styles from './PanCardValidation.module.css';
import Labels from '../ReUsableComponents/Labels/Labels';
import InputSection from '../ReUsableComponents/InputSection/InputSection';
import CustomizableButton from '../ReUsableComponents/CustomizableButton/CustomizableButton';
import { formatTime, useCountdownTimer } from '@/utils/TimeSetter';

interface PanCardValidationProps{
    validStatus:boolean;
    setValidStatus: (status:boolean, panCardNumber?:string) => void;
}


const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;


const PanCardValidation:FC <PanCardValidationProps> = ({validStatus,setValidStatus}) => {
    const [panNumber, setPanNumber] = useState('');
    const [otpButtonClicks , setOtpButtonClicks] = useState(0);
    const [timeLeft, isButtonDisabled, resetTimer] = useCountdownTimer(30);
    const [errorMessage,setErrorMessage] = useState('');
    const [otp,setOtp] = useState('');



    const [isEditable, setIsEditable] = useState(false);
    const [showOtpSection, setShowOtpSection] = useState(false);
    

    const sendOtp = () => {
        if (panNumber && panRegex.test(panNumber)){
            setOtpButtonClicks(otpButtonClicks + 1);
            setShowOtpSection(true); // Show OTP section
            resetTimer();//count down start and reset timer
            setErrorMessage('');
          } else {
            setErrorMessage('Please Enter a valid PAN Number');
          }
    }


    const validateOtp = () =>{
        if (otp === '123456') {
            setValidStatus(true, panNumber);
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
            <Labels value='PAN Number :'/>
            <InputSection 
                type='number'
                value={panNumber}
                placeholder='PAN Card Number'
                onChange={setPanNumber}
                editableStatus={isEditable}
            />
            {!validStatus &&
                <CustomizableButton
                    value={
                        otpButtonClicks > 0?
                        isButtonDisabled?
                        formatTime(timeLeft):"Resend":"Send OTP"
                    }
                    onClickFunction={sendOtp}
                    disabled={isButtonDisabled}
                />
            }
        </div>
        <p>{errorMessage}</p>

        {!showOtpSection && isButtonDisabled &&
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

export default PanCardValidation
