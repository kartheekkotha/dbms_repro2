// pages/signup.js
import Link from 'next/link';
import React from 'react';
import Head from 'next/head';
// import styles from '../styles/Start.module.css';
import ProfessorSignUp from '../components/ProfessorSignUpForm';

const ProfessorSignUpPage = () => {
  console.log("SignupPage");
  return (
    <div>
      <Head>
        <title>Professor Sign Up Page</title>
      </Head>
      <ProfessorSignUp />
      {/* <Link href="/">
        <button className={styles.button}>Back to Home</button>
      </Link> */}
    </div>
  );
};

export default ProfessorSignUpPage;
