


import React, { useState } from 'react';
import styles from "./page.module.css";
import UserForm from '@/components/UserForm/UserForm';

export default function Home() {
  return (
    <main className={styles.main}>
      <UserForm/>
    </main>
  );
}
