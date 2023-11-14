// pages/login.js
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import TitleBox from '../components/TitleBox';
import styles from '../styles/Start.module.css';
import LoginForm from '../components/StudentLoginForm';

const StudentLoginPage = () => {
  return (
    <div>
    <Head>
        <title>Student Login Page</title>
      </Head>
      <LoginForm />
      <Link href="/">
        <button className={styles.button}>Back to Home</button>
      </Link>
    </div>
  );
};

export default StudentLoginPage;
