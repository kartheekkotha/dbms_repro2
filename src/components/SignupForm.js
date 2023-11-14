// components/SignupForm.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/SignupForm.module.css';

const SignupForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <div className={styles.radioGroup}>
        <input type="radio" id="student" name="userType" value="student" />
        <label htmlFor="student">Student</label>
        <input type="radio" id="professor" name="userType" value="professor" />
        <label htmlFor="professor">Professor</label>
      </div>
      <label htmlFor="email">Email ID:</label>
      <input type="text" id="email" placeholder="Enter email ID" required />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" placeholder="Enter password" required />
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" placeholder="Enter your name" required />
      <label htmlFor="gradYear">Graduating Year (leave if NA):</label>
      <input type="text" id="gradYear" placeholder="Enter graduating year" />
      <label htmlFor="name">Department:</label>
      <input type="text" id="name" placeholder="Enter your name" required />
      
      <Link href="/projects" passHref>
        <button className={styles.button}>Continue</button>
      </Link>
    </div>
  );
};

export default SignupForm;
