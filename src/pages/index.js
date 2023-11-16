// pages/index.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home = () => {
  const backgroundImageUrl = '/bg.jpg'; // Replace with your image URL

  return (
    <div className={styles.container}>
      <div className={styles.background} style={{ backgroundImage: `url(${backgroundImageUrl})` }}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <img src="/repro_logo.png" alt="Repro Logo" className={styles.logo} />
        </div>
        <div className={styles.iconContainer}>
          <Link href="/StudentSignUpPage">
            <button className={styles.button}>Student Sign Up</button>
          </Link>
          <Link href="/ProfessorSignUpPage">
            <button className={styles.button}>Professor Sign Up</button>
          </Link>
          <Link href="/StudentLoginPage">
            <button className={styles.button}>Student Login</button>
          </Link>
          <Link href="/ProfessorLoginPage">
            <button className={styles.button}>Professor Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
