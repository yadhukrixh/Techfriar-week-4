"use client";

import React, { useState } from 'react';
import styles from './UserForm.module.css';
import EmailValidation from '@/components/EmailValidation/EmailValidation';
import PhoneNumberValidation from '@/components/PhoneNumberValidation/PhoneNumberValidation';
import AadharValidation from '@/components/AadharValidation/AadharValidation';
import PanCardValidation from '@/components/PanCardValidation/PanCardValidation';
import InputSection from '@/components/ReUsableComponents/InputSection/InputSection';
import Labels from '@/components/ReUsableComponents/Labels/Labels';
import CustomizableButton from '@/components/ReUsableComponents/CustomizableButton/CustomizableButton';
import { RegisterUser } from '@/utils/RegisterUser';
import  {DateFormatter}  from '@/utils/DateFormatter'


const UserForm = () => {
  const [isEmailIsValid, setIsEmailIsValid] = useState(false); // to set the email validation status
  const [isPhoneNumberIsValid, setIsPhoneNumberIsValid] = useState(false);// to set ph number validation status
  const [isAadharIsValid , setIsAadharIsValid] = useState(false);// to set the aadhar validation status
  const [isPanIsValid , setIsPanIsValid] = useState(false);// to  set the pan validation status


  const [name ,setName] = useState('');
  const [email, setEmail] = useState(''); // State to store the email value
  const [dateOfBirth , setDateOfBirth] = useState(new Date());
  const [phoneNumber , setPhoneNumber] = useState('');// to stotre phone number
  const [errorMessage , setErrorMessage] = useState('');

  const handleDateChange = (value: string) => {
        const newDate = new Date(value);
        setDateOfBirth(newDate);
  };



  return (
    <div className={styles.main}>
      <div className={styles.userForm}>
        <h2 className={styles.formHeading}>Register User</h2>
        <div>
          <div>
          <Labels value='Name :'/>
          <InputSection type='text'
            value={name}
            placeholder='Your Name'
            onChange={setName}
          />
          </div>

          <div>
          <Labels value='Email :'/>
          <InputSection type='email'
            value={email}
            placeholder='Your Email'
            onChange={setEmail}
          />
          </div>


          <div>
          <Labels value='Phone number :'/>
          <InputSection type='number'
            value={phoneNumber}
            placeholder='Your Number'
            onChange={setPhoneNumber}
          />
          </div>

          <div>
          <Labels value='Date of birth'/>
          <InputSection type='date'
            value={DateFormatter(dateOfBirth)}
            placeholder='dd-mm-yyyy'
            onChange={handleDateChange}
          />
          </div>
          <p>{errorMessage}</p>

          <CustomizableButton value='Register User'
            onClickFunction={()=>RegisterUser(name,email,phoneNumber,dateOfBirth,setErrorMessage)} />

          
          

        </div>
      </div>
    </div>
  );
}

export default UserForm;
