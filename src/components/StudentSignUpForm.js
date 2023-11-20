// components/SignupForm.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/SignupForm.module.css';
import { useState , useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const StudentSignUp = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [departments, setDepartments] = useState([]);
  const [loginError, setLoginError] = useState(false);
  const clearInputValues = () => {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('name').value = '';
    document.getElementById('batch').value = '';
    document.getElementById('dept_id').value = '';
  };
  useEffect(() => {
    // Fetch departments from the server
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/getDepartments');
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/insertStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Student Added successfully:');
        // Reset the form data
        clearInputValues();
        router.push('/');
        // Reset the form
        // Handle success, e.g., show a success message to the user
      } else {
        // Handle errors
        setLoginError(true);
            // Clear input fields on login failure
        clearInputValues();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      clearInputValues();
      setLoginError(true);
    }
  };
  return (
    // student_name, student_email_id , batch , dept_id
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Student Sign Up</h1>
      <div>Email ID:</div>
      <label htmlFor="email"></label>
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
      
      <div>Name:</div>
      <label htmlFor="name"></label>
      <input 
        {...register('student_name', { required: true })}
        type="text" 
        id="name" 
        placeholder="Enter your name" 
        />
      {errors.sname && <p>Name is required</p>}      
      <div>Graduating Year:</div>
      <label htmlFor="gradYear"></label>
      <input 
        {...register('batch', { required: true })}
        type="text" 
        id="batch" 
        placeholder="Enter your Graduating Year" 
        />
      {errors.batch && <p>Graduating Year is required</p>}      
      <div>Department:</div>
      <label htmlFor="dept_id"></label>
      <select 
        {...register('dept_id', { required: true })}
        id="dept_id" 
        placeholder="Enter your name" 
        >
        {departments.map((department) => (
          <option key={department.dept_id} value={department.dept_id}>
            {department.dept_name}
          </option>
        ))}
      </select>
      {errors.dept_id && <p>Department is required</p>}
      <div>
        <button type="submit" className={styles.button}>Submit</button>
      <Link href="/">
        <button className={styles.button}>Back to Home</button>
      </Link>     
      </div> 
      </form>
      {/* <Link href="/projects" passHref>
        <button type="submit" className={styles.button}>Continue</button>
      </Link> */}
      {loginError && (
        <p style={{ color: 'red' }}>singup failed. Please check.</p>
      )}
    </div>
  );
};

export default StudentSignUp;
