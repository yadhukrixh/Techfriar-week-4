"use client";

import styles from './UserRegistration.module.css';
import React, { useState, useEffect, useId } from 'react';
import InputSection from '@/components/ReUsableComponents/InputSection/InputSection';
import Labels from '@/components/ReUsableComponents/Labels/Labels';
import CustomizableButton from '@/components/ReUsableComponents/CustomizableButton/CustomizableButton';
import { RegisterUser } from '@/utils/RegisterUser';
import { DateFormatter } from '@/utils/DateFormatter';
import { useRouter } from 'next/navigation';



const UserRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // State to store the email value
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState(''); // to store phone number
  const [errorMessage, setErrorMessage] = useState(''); // to set various error messages
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [numberErrorMessage, setNumberErrorMessage] = useState('')
  const [isRegistered, setIsRegistered] = useState(false);
  const [userId ,setUserId] = useState('');
  const [password,setPassword] = useState('');
  const [passwordErrorMessage,setPasswordErrorMessage] = useState('');

  


  


  const router = useRouter();

  const queryParams = new URLSearchParams({
    propertyLabel: 'Email :',
    propertyValue: email,
    type: 'email',
    propertyModelName:"email",
    placeholder:"Your Email",
    sendFunction: 'sendOtp',
    validateFunction: 'validateOtp',
    userId: userId
  }).toString();
  

  // Handle date of birth change
  const handleDateChange = (value: string) => {
    const newDate = new Date(value);
    setDateOfBirth(newDate);
  };

  // Redirect if the user is registered
  useEffect(() => {
    if (isRegistered) {
      router.push(`/User/SignUp/OtpValidation?${queryParams}`);
    }
  }, [isRegistered, router]);


  

  return (
    <div className={styles.main}>
      <div className={styles.userForm}>
        <h2 className={styles.formHeading}>Register User</h2>
        <div>
          {/* Name label and input */}
          <div>
            <Labels value='Name :' />
            <InputSection
              type='text'
              value={name}
              placeholder='Your Name'
              onChange={setName}
            />
          </div>

          {/* Email label and input */}
          <div>
            <Labels value='Email :' />
            <InputSection
              type='email'
              value={email}
              placeholder='Your Email'
              onChange={setEmail}
            />
            <p>{emailErrorMessage}</p>
          </div>

          {/* Phone number label and input */}
          <div>
            <Labels value='Phone number :' />
            <InputSection
              type='number'
              value={phoneNumber}
              placeholder='Your Number'
              onChange={setPhoneNumber}
            />
            <p>{numberErrorMessage}</p>
          </div>

          {/* Date of birth label and input */}
          <div>
            <Labels value='Date of birth' />
            <InputSection
              type='date'
              value={DateFormatter(dateOfBirth)}
              placeholder='dd-mm-yyyy'
              onChange={handleDateChange}
            />
          </div>
          <p>{errorMessage}</p>

          <div>
            <Labels value='Password :' />
            <InputSection
              type='password'
              value={password}
              placeholder='Your Password'
              onChange={setPassword}
            />
            <p>{passwordErrorMessage}</p>
          </div>

          {/* Button to register user */}
          <CustomizableButton
            value='Register User'
            onClickFunction={() => RegisterUser(name, email, phoneNumber, dateOfBirth,password, setErrorMessage, setIsRegistered, setEmailErrorMessage,setNumberErrorMessage,setUserId,setPasswordErrorMessage )}
          />
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
