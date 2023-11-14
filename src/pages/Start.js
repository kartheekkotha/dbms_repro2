// pages/Start.js
import React from 'react';
import styles from '../styles/Start.module.css';
import Link from 'next/link';

const StartPage = () => {
  console.log("StartPage");
  return (
    <div className={styles.container}>
    <Link href="/StudentSignUpPage">
        <button className={styles.button}>Student SignUp</button>
    </Link> 
    <Link href="/ProfessorSignUpPage">
        <button className={styles.button}>Professor SignUp</button>
    </Link> 
    <Link href="/StudentLoginPage">
      <button className={styles.button}>Student Login</button>
    </Link>
    <Link href="/ProfessorLoginPage">
      <button className={styles.button}>Professor Login</button>
    </Link>
    </div>
  );
};

export default StartPage;
