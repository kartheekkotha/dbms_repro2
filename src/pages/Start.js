// pages/Start.js
import React from 'react';
import styles from '../styles/Start.module.css';
import Link from 'next/link';

const StartPage = () => {
  console.log("StartPage");
  return (
    <div className={styles.container}>
    <Link href="/SignUp">
        <button className={styles.button}>SignUp</button>
    </Link> 
    <Link href="/Login">
      <button className={styles.button}>Login</button>
    </Link>
    </div>
  );
};

export default StartPage;
