import React, { useState } from 'react'
import styles from './UserForm.module.css'
import InputSection from '../InputSection/InputSection'

const UserForm = () => {
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [phoneNumber , setPhonenNumber] = useState('');
    const [DOB , setDOB] = useState('');
    const [aadharNumber , setAadharNumber] = useState('');
    const [panNumber , setPanNumber] = useState('');
    const [bankAccountNumber , setBankAccountNumber] = useState('');
    const [gstNumber , setGstNumber] = useState('');
    const [pinCode , setPinCode] = useState('');
    const [city , setCity] =useState('');
    const [district , setDistrict] = useState('');
    const [state , setState] = useState('');



  return (
    <div>
      <form  className={styles.userForm} action="">
        <h2 className={styles.formHeading}>Signup</h2>
        <div>
            <InputSection 
                type="email" 
                value={name} 
                onChange={setName} 
                placeholder="Enter Your name"
            />
        </div>
      </form>
    </div>
  )
}

export default UserForm
