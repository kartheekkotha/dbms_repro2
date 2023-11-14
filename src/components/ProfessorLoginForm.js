// components/LoginForm.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/LoginForm.module.css';

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log In</h1>
      <label htmlFor="email">Email ID:  </label>
      <input type="text" id="email" placeholder="Enter email ID" />
      <label htmlFor="password">Password:  </label>
      <input type="password" id="password" placeholder="Enter password" />
      <Link href="/Projects.js" passHref>
        <button className={styles.button}>Continue</button>
      </Link>
    </div>
  );
};

export default LoginForm;
