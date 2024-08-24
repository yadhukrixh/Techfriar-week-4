"use client";

import React, { useState } from 'react';
import styles from './UserForm.module.css';
import EmailValidation from '@/components/EmailValidation/EmailValidation';
import PhoneNumberValidation from '@/components/PhoneNumberValidation/PhoneNumberValidation';
import AadharValidation from '@/components/AadharValidation/AadharValidation';
import PanCardValidation from '@/components/PanCardValidation/PanCardValidation';

const UserForm = () => {
  const [isEmailIsValid, setIsEmailIsValid] = useState(false); // to set the email validation status
  const [isPhoneNumberIsValid, setIsPhoneNumberIsValid] = useState(false);// to set ph number validation status
  const [isAadharIsValid , setIsAadharIsValid] = useState(false);// to set the aadhar validation status
  const [isPanIsValid , setIsPanIsValid] = useState(false);// to  set the pan validation status

  const [email, setEmail] = useState(''); // State to store the email value
  const [phoneNumber , setPhoneNumber] = useState('');// to stotre phone number
  const [aadharNumber , setAadharNumber] = useState('');// to store aadhar number
  const [panNumber , setPanNumber] = useState(''); // to store pan number

  return (
    <div className={styles.main}>
      <div className={styles.userForm}>
        <h2 className={styles.formHeading}>Signup</h2>
        <div>
          {/* Email validayion component */}
          <EmailValidation 
            validStatus={isEmailIsValid} 
            setValidStatus={(status, emailValue) => {
              setIsEmailIsValid(status);
              if (status && emailValue) setEmail(emailValue); // Set email value when OTP is validated
            }}
          />

          {isEmailIsValid && // only shows if email is valid
            //phone number validation component
            <PhoneNumberValidation 
              validStatus={isPhoneNumberIsValid} 
              setValidStatus={(status, phoneNumberValue) => {
                setIsPhoneNumberIsValid(status);
                if (status && phoneNumberValue) setPhoneNumber(phoneNumberValue); // set phone number after otp validation
              }}/>
          }

          {isPhoneNumberIsValid && // only show if phone number is valid
            //aadhar validation component
            <AadharValidation 
              validStatus={isAadharIsValid}
              setValidStatus={(status, aadharNumberValue)=> {
                setIsAadharIsValid(status);
                if(status && aadharNumberValue) setAadharNumber(aadharNumberValue);
              }}
            />
          }
          {isAadharIsValid &&
            <PanCardValidation
            validStatus={isPanIsValid}
            setValidStatus={(status, panNumberValue)=> {
              setIsAadharIsValid(status);
              if(status && panNumberValue) setPanNumber(panNumberValue);
            }}
            />

          }

        </div>
      </div>
    </div>
  );
}

export default UserForm;
