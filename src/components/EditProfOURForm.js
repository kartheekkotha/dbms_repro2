import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/AddProject.module.css';

const EditProjectForm = ({ projectId }) => {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm();
  const { user } = useAuth();
  const [projectDetails2, setProjectDetails] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const professor_email_id = user ? user.email_id : null;
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`/api/getOURDetails?projectId=${projectId}`);
        if (response.ok) {
          const projectDetails = await response.json();
          console.log('Project details_ finala :', projectDetails);

          // Check if students array is empty
          if (projectDetails[0].students.length === 0) {
            setProjectDetails({
              title: projectDetails[0].title,
              details: projectDetails[0].details,
              work_status: projectDetails[0].work_status,
              student_email1: 'None', // Set default value to 'None'
              student_email2: 'None', // Set default value to 'None'
            });
          } else {
            console.log('Student length:', projectDetails[0].students.length);
            setProjectDetails({
              title: projectDetails[0].title,
              details: projectDetails[0].details,
              work_status: projectDetails[0].work_status,
              student_email1: projectDetails[0].students[0].student_id,
              student_email2: projectDetails[0].students.length > 1 ? projectDetails[0].students[1].student_id : 'None',
            });
          }
          setValue('title', projectDetails[0].title);
          setValue('details', projectDetails[0].details);
          setValue('work_status', projectDetails[0].work_status);
          console.log('Project details2:', projectDetails2);
          setLoading(false);
        } else {
          console.error('Error fetching project details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching project details:', error.message);
      }
    };

    fetchProjectDetails();
  }, [projectId, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/updateOurProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: projectId,
          professor_email_id:professor_email_id,
          student_email_id_1: data.student_email1 || 'None', // Set default value to 'None'
          student_email_id_2: data.student_email2 || 'None', // Set default value to 'None'
          title: data.title,
          details: data.details,
          work_status: data.work_status,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Our Project details updated successfully:', result);
        setSubmissionMessage('Our Project details updated successfully!');
        router.push('/ProfProfile');
      } else {
        console.error('Error updating Our Project details:', response.statusText);
        setSubmissionMessage('Error updating Our Project details');
      }
    } catch (error) {
      console.error('Error updating Our Project details:', error.message);
      setSubmissionMessage('Error updating Our Project details');
    }
  };
  const onDelete = async () => {
    try {
      // Call the deleteProject API endpoint
      const response = await fetch(`/api/deleteProject?project_id=${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Project deleted successfully:', result);
        setSubmissionMessage('Project deleted successfully!');
        router.push(`/ProfProfile`);
        // You can add additional logic or UI updates here
      } else {
        console.error('Error deleting project:', response.statusText);
        setSubmissionMessage('Error deleting project');
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error deleting project:', error.message);
      setSubmissionMessage('Error deleting project');
      // Handle the error as needed
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.title}>Update Our Project</h1>
          <div className={styles.formGroup}>
            <label>Title:</label>
            <input {...register('title')} defaultValue={projectDetails2.title} />
          </div>
          <div className={styles.formGroup}>
            <label>Details:</label>
            <textarea {...register('details')} defaultValue={projectDetails2.details} />
          </div>
          <div className={styles.formGroup}>
            <label>Work Status:</label>
            <select {...register('work_status')} defaultValue={projectDetails2.work_status}>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Student Email 1:</label>
            <input {...register('student_email1')} defaultValue={projectDetails2.student_email1} />
          </div>
          <div className={styles.formGroup}>
            <label>Student Email 2:</label>
            <input {...register('student_email2')} defaultValue={projectDetails2.student_email2} />
          </div>
          <button className={styles.button} type="submit">
            Update Our Project
          </button>
          <button type="button" className={styles.button} onClick={onDelete}>
            Delete Project
          </button>
          {/* Display submission message */}
          {submissionMessage && <p className={styles.message}>{submissionMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default EditProjectForm;
