// components/ProjectForm.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/AddProject.module.css';

const ProjectForm = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm();
  const [departments, setDepartments] = useState([]);
  const [domains, setDomains] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState('');

  useEffect(() => {
    // Fetch departments from the server (replace with your actual API endpoint)
    fetch('/api/getDepartments')
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error('Error fetching departments:', error));
      const  studentId  = user ? user.email_id : null;
      console.log("Add Project Page of :",studentId);
      if (studentId) {
        setSelectedStudent(studentId);
      }
  }, [router.query]);

  const selectedDepartment = watch('department');

  useEffect(() => {
    // Fetch domains for the selected department from the server
    if (selectedDepartment) {
      fetch(`/api/getDomain?dept_id=${selectedDepartment}`)
        .then((response) => response.json())
        .then((data) => setDomains(data))
        .catch((error) => console.error('Error fetching domains:', error));
    }
  }, [selectedDepartment]);

  const onSubmit = async (data) => {
    try {
        data.student_id = selectedStudent;
        // Include status and current date in the form data
        data.status = data.status || 'Incomplete'; // Default to 'Incomplete' if not provided
        data.date_of_creation = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
      // Send data to the submitProject API endpoint
      const response = await fetch('/api/submitStudentProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Project submitted successfully:', result);
        // Reset the form data
        setValue('title', '');
        setValue('details', '');
        setValue('department', '');
        setValue('domains', []);
        setValue('status', '');
        setSubmissionMessage('Project added to the database successfully!');
        router.push(`/StudProfile`);
        // You can add additional logic or UI updates here
      } else {
        console.error('Error submitting project:', response.statusText);
        setValue('title', '');
        setValue('details', '');
        setValue('department', '');
        setValue('domains', []);
        setValue('status', '');
        setSubmissionMessage('Error adding project to the database');
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error submitting project:', error.message); 
      setSubmissionMessage('Error adding project to the database');
      // Handle the error as needed
    }
  };
  return (
    <div className={styles.container}>

    <form onSubmit={handleSubmit(onSubmit)}>
    <h1 className={styles.title}>Add Project</h1>
     <div className={styles.formGroup}> 
      <label>Title:</label>
      <input {...register('title')} id = "title" />
    </div>
    <div className={styles.formGroup}>
      <label>Details:</label>
      <textarea {...register('details')} id = "description"/>
    </div>
    <div className={styles.formGroup}>
      <label>Department:</label>
      <select {...register('department')}>
        {departments.map((department) => (
          <option key={department.dept_id} value={department.dept_id}>
            {department.dept_name}
          </option>
        ))}
      </select>
    </div>
    <div className={styles.formGroup}>
      <label>Domains:</label>
      <select multiple {...register('domains')}>
        {domains.map((domain) => (
          <option key={domain.domain_id} value={domain.domain_id}>
            {domain.domain_name}
          </option>
        ))}
      </select>
    </div>
    <div className={styles.formGroup}>
      <label>Status:</label>
      <select {...register('status')}>
        <option value="Incomplete">Incomplete</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
      <button className={styles.button} type="submit">Submit Project</button>
      <Link href="/StudProfile">
        <button className={styles.button}>Back to Home</button>
      </Link>
       {/* Display submission message */}
       {submissionMessage && <p className={styles.message}> {submissionMessage}</p>}
    </form>
    </div>
  );
};

export default ProjectForm;
