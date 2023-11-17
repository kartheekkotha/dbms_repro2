// pages/signup.js
import Link from 'next/link';
import React from 'react';
import Head from 'next/head';
// import styles from '../styles/Start.module.css';
import StudentSignupForm from '../components/StudentSignUpForm';

const StudentSignUpPage = () => {
  console.log("SignupPage");
  return (
    <div>
      <Head>
        <title>Student Sign Up Page</title>
      </Head>
      <StudentSignupForm />
      {/* <Link href="/">
        <button className={styles.button}>Back to Home</button>
      </Link> */}
    </div>
  );
};

export default StudentSignUpPage;
