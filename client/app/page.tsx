
import React, { useState } from 'react';
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.mainCard}>
        <h2>HI !</h2>
        <h3>Welcome to my website</h3>
        <p>Please Login / Signup to continue</p>
        <div className={styles.redirectButtons}>
          <Link href="/User/Login"><button> Login</button></Link>
          <Link href="/User/SignUp"><button>Signup</button></Link>
        </div>
      </div>
    </main>
  );
}
