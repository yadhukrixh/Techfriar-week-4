
import React from 'react';
import styles from './UserForm.module.css';
import UserRegistration from '@/components/UserRegistration/UserRegistration';


const page = () => {

  return (
    <div className={styles.main}>
      <UserRegistration/>
    </div>
  );
}

export default page;
