"use client";

import React, { FC, useState } from 'react';
import styles from './BankAccountValidation.module.css'
import Labels from '../ReUsableComponents/Labels/Labels';
import InputSection from '../ReUsableComponents/InputSection/InputSection';
import CustomizableButton from '../ReUsableComponents/CustomizableButton/CustomizableButton';
import { bankAccountValidation } from '@/utils/ValidationFunctions';

interface BankAccountValidationProps{
    userId:string;
    setBankAccountNumber:(message:string) => void;
    setIsValid:(status:boolean) => void;
    setShowPopup:(status:boolean) => void;
}

const BankAccountValidation:FC<BankAccountValidationProps> = ({userId,setBankAccountNumber,setIsValid,setShowPopup}) => {

    const [accountNumber,setAccountNumber] = useState('');
    const [ifscCode,setIfscCode] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

  return (
    <div className={styles.userForm}>
      <div>
        <Labels value='Bank Account Number :'/>
        <InputSection type='number' value={accountNumber} placeholder='Enter your account number' onChange={setAccountNumber} />
        <Labels value='IFSC Code:' />
        <InputSection type='text' value={ifscCode} placeholder='Enter your IFSC code' onChange={setIfscCode} toUppercase={true}/>
        <CustomizableButton value="Validate" onClickFunction={() => bankAccountValidation(userId,accountNumber,ifscCode,setBankAccountNumber,setErrorMessage,setShowPopup,setIsValid)}/>
          <p>{errorMessage}</p>
      </div>
    </div>
  )
}

export default BankAccountValidation
