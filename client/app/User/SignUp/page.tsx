"use client";

import React, { useState } from 'react';
import styles from './UserForm.module.css';
import EmailValidation from '@/components/EmailValidation/EmailValidation';
import PhoneNumberValidation from '@/components/PhoneNumberValidation/PhoneNumberValidation';
import AadharValidation from '@/components/AadharValidation/AadharValidation';

const UserForm = () => {
  const [isEmailIsValid, setIsEmailIsValid] = useState(false); // to set the email validation status
  const [isPhoneNumberIsValid, setIsPhoneNumberIsValid] = useState(false);
  const [isAadharIsValid , setIsAadharIsValid] = useState(false);


  const [email, setEmail] = useState(''); // State to store the email value
  const [phoneNumber , setPhoneNumber] = useState('');// to stotre phone number
  const [aadharNumber , setAadharNumber] = useState('');// to store aadhar number

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
              ValidStatus={isAadharIsValid}
              setValidStatus={(status, aadharNumberValue)=> {
                setIsAadharIsValid(status);
                if(status && aadharNumberValue) setAadharNumber(aadharNumberValue);
              }}
            />
          }

        </div>
      </div>
    </div>
  );
}

export default UserForm;
