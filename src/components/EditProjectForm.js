// components/EditProjectForm.js
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styles from '../styles/AddProject.module.css';

const EditProjectForm = ({ projectId }) => {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState } = useForm();
  const { isSubmitting } = formState;
  const [editableDetails, setEditableDetails] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing project details based on the project_id
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`/api/getProjectDetails?project_id=${projectId}`);
        if (response.ok) {
          const projectDetails = await response.json();
          console.log('Project details:', projectDetails);
          setEditableDetails({
            title: projectDetails[0].title,
            details: projectDetails[0].details,
            work_status: projectDetails[0].work_status, // Assume 'work_status' can be 'Completed' or 'Incomplete'
          });

          // Access setValue method from the useForm hook
          setValue('title', projectDetails[0].title);
          setValue('details', projectDetails[0].details);
          setValue('work_status', projectDetails[0].work_status);

          // Set loading to false once details are fetched
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
      // Combine existing and updated details
      const updatedDetails = {
        project_id: projectId,
        project_title: data.title,
        project_details: data.details,
        project_work_status: data.work_status,
      };

      // Send updated details to the updateProjectDetails API endpoint
      const response = await fetch('/api/editProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Project details updated successfully:', result);
        setSubmissionMessage('Project details updated successfully!');
        router.push(`/StudProfile`);

        // You can add additional logic or UI updates here
      } else {
        console.error('Error updating project details:', response.statusText);
        setSubmissionMessage('Error updating project details');
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error updating project details:', error.message);
      setSubmissionMessage('Error updating project details');
      // Handle the error as needed
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
        router.push(`/StudProfile`);
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
          <h1 className={styles.title}>Edit Project</h1>
          <div className={styles.formGroup}>
            <label>Title:</label>
            <input {...register('title')} defaultValue={editableDetails.title} />
          </div>
          <div className={styles.formGroup}>
            <label>Details:</label>
            <textarea {...register('details')} defaultValue={editableDetails.details} />
          </div>
          <div className={styles.formGroup}>
            <label>Work Status:</label>
            <select {...register('work_status')} defaultValue={editableDetails.work_status}>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            Update Project
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
