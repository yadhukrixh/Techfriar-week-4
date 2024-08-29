"use client";

import React, { useState } from 'react';
import styles from './GovIDsValidation.module.css'
import Labels from '../ReUsableComponents/Labels/Labels';
import InputSection from '../ReUsableComponents/InputSection/InputSection';
import CustomizableButton from '../ReUsableComponents/CustomizableButton/CustomizableButton';
import ShowPopUpComponent from '../ShowPopUp/ShowPopUp';
import { useSearchParams } from 'next/navigation';
import { validateAadhaar } from '@/utils/ValidationFunctions';






const GovIDsValidation = () => {
    const searchParams = useSearchParams();
    const [value,setValue] = useState('');
    const [isAadhaarValid,setIsAadhaarValid] = useState(false);
    const [userId, setUserId] = useState(searchParams.get("userId") || "");
    const [panNumber,setPanNumber] = useState('');
    const [isPanValid,setIsPanValid] = useState(false);
    const [showPopup,setShowPopup] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');

  return (
    <div className={styles.main}>
        <div className={styles.userForm}>
            {isAadhaarValid &&
                <div>  
                    <Labels value='Aadhaar Number:'/>
                    <InputSection type='number' value={value} placeholder='Your aadhaar number' onChange={setValue} editableStatus={isAadhaarValid}/>
                    <p>{errorMessage}</p>
                    {!isAadhaarValid &&
                        <CustomizableButton value='Validate' onClickFunction={()=>validateAadhaar(userId,value,setIsAadhaarValid,setShowPopup,setErrorMessage)} />
                    } 
                </div>
            }
            {!isAadhaarValid &&
                <div>  
                    <Labels value='Pan Card Number:'/>
                    <InputSection type='number' value={value} placeholder='Your Pan card number' onChange={setValue} editableStatus={isPanValid}/>
                    <p>{errorMessage}</p>
                    {!isPanValid &&
                        <CustomizableButton value='Validate' />
                    } 
                </div>
            }
            {showPopup && isAadhaarValid &&
                <ShowPopUpComponent valueType='Aadhaar Number' value={value} setShowPopUp={setShowPopup}/>
            }
        </div>
      
    </div>
  )
}

export default GovIDsValidation;
