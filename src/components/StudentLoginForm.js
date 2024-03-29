// components/LoginForm.js
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState(false);
    const { login } = useAuth();
    const clearInputValues = () => {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
      };

    const onSubmit = async (data) => {
        const response = await fetch('/api/loginStudent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      
        const data2 = await response.json();
      
        if (data2.success) {
            console.log('Student Logged in successfully:', data2.user.email_id);
            const userData = { email_id : data2.user.email_id , role : 'Student' };
            login(userData)
            router.push(`/StudProfile`);
            // router.push(`/StudProfile?student_email_id=${data2.user.email_id}`);
          // User is logged in, handle success
        } else {
            console.log('Student Logged is Failure:');
            setLoginError(true);
            // Clear input fields on login failure
            clearInputValues();
          // Handle login failure
        }
      };
  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Student Log In</h1>
      <div>Email ID:</div>
      <input 
        {...register('student_email_id', { required: true })}
        type="text" 
        id="email" 
        placeholder="Enter email ID"
       />
      {errors.student_email_id && <p>Student email Id is required</p>}
      <div>Password:</div>
      <label htmlFor="password"></label>
      <input 
        {...register('password', { required: true })}
        type="password" 
        id="password" 
        placeholder="Enter password" 
        />
      {errors.password && <p>Password is required</p>}
      <div className={styles.buttons}><button type="submit" className={styles.button}>Submit</button>
      <Link href="/">
        <button className={styles.button}>Back to Home</button>
      </Link> 
      </div>   
      </form>
      {/* <Link href="/Projects.js" passHref>
        <button className={styles.button}>Continue</button>
      </Link> */}
      {loginError && (
        <p style={{ color: 'red' }}>Login failed. Please check your email and password.</p>
      )}
    </div>
    
  );
};

export default LoginForm;
