"use client";

import React, { useState } from 'react';
import styles from './FInancialDocumentsValidation.module.css'
import BankAccountValidation from '@/components/BankAccountValidation/BankAccountValidation';
import { useSearchParams } from 'next/navigation';
import ShowPopUpComponent from '@/components/ShowPopUp/ShowPopUp';


const page = () => {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState(searchParams.get("userId") || "");
  const [isBankAccountValid,setIsBankAccountValid] = useState(false);
  const [accountNumber,setAccountNumber] = useState('');
  const [showPopup,setShowPopUp] = useState(false);
  return (
    <div className={styles.main}>
      {!isBankAccountValid &&
        <BankAccountValidation userId={userId} setBankAccountNumber={setAccountNumber} setIsValid={setIsBankAccountValid} setShowPopup={setShowPopUp}/>      
      }
      {!isBankAccountValid && !showPopup &&
        <ShowPopUpComponent valueType='Bank account Number' value={accountNumber} setShowPopUp={setShowPopUp} />
      }
    </div>
  )
}

export default page
