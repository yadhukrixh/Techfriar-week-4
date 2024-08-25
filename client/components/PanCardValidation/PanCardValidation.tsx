import React, { FC, useState } from 'react';
import styles from './PanCardValidation.module.css';
import Labels from '../ReUsableComponents/Labels/Labels';
import InputSection from '../ReUsableComponents/InputSection/InputSection';
import CustomizableButton from '../ReUsableComponents/CustomizableButton/CustomizableButton';
import { formatTime, useCountdownTimer } from '@/utils/TimeSetter';
import { sendOtpForPanValidation } from '@/utils/SendOtpFunctions';
import { validateOtpForPanCard } from '@/utils/ValidationFunctions';


interface PanCardValidationProps{
    validStatus:boolean;
    setValidStatus: (status:boolean, panCardNumber?:string) => void;
}



const PanCardValidation:FC <PanCardValidationProps> = ({validStatus,setValidStatus}) => {
    const [panNumber, setPanNumber] = useState('');
    const [otpButtonClicks , setOtpButtonClicks] = useState(0);
    const [timeLeft, isButtonDisabled, resetTimer] = useCountdownTimer(30);
    const [errorMessage,setErrorMessage] = useState('');
    const [otp,setOtp] = useState('');



    const [isEditable, setIsEditable] = useState(false);
    const [showOtpSection, setShowOtpSection] = useState(false);
    

    


  return (
    <div className={styles.mainClass}>
        <div>
            <Labels value='PAN Number :'/>
            <InputSection 
                type='text'
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
                    onClickFunction={() => sendOtpForPanValidation(panNumber, otpButtonClicks, setOtpButtonClicks, resetTimer, setErrorMessage, setShowOtpSection)}
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
                <CustomizableButton value="Validate" onClickFunction={() => validateOtpForPanCard(otp, setValidStatus, panNumber, setIsEditable, setShowOtpSection)} />
            </div>
        }
    </div>
  )
}

export default PanCardValidation
