// pages/studprofile.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import styles from '../styles/StudProfile.module.css';
import StudentDetailsComponent from '../components/StudentDetailsComponent';
import ProjectCard from '../components/ProjectCard';
import OURCard from '../components/OURcard';
import { useAuth } from '../context/AuthContext';

const StudProfilePage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  // console.log("User:",user.email_id);
  const student_email_id = user ? user.email_id : null;
  console.log("Student Page of :",student_email_id);
  const [studentDetails, setStudentDetails] = useState({});
  const [studentProjects, setStudentProjects] = useState([]);
  const [projectsUnderProfessor, setProjectsUnderProfessor] = useState([]);
  useEffect(() => {
    if (student_email_id) {
    // Fetch student details
    fetch(`/api/getStudentDetails?student_email_id=${student_email_id}`)
      .then(response => response.json())
      .then(data => setStudentDetails(data))
      .catch(error => console.error('Error fetching student details:', error));

    // Fetch student projects
    fetch(`/api/getStudentProjects?student_email_id=${student_email_id}`)

      .then(response => response.json())
      .then(data => setStudentProjects(data))
      .catch(error => console.error('Error fetching student projects:', error));

      fetch(`/api/getStudentProjectsUnderProfessor?student_email_id=${student_email_id}`)
      .then(response => response.json())
      .then(data => setProjectsUnderProfessor(data))
      .catch(error => console.error('Error fetching projects under professor guidance:', error));
    }
    }, [student_email_id])
  console.log(studentDetails);
  console.log("stud Projects",studentProjects);
  console.log("Projects under prof",projectsUnderProfessor);
  const handleLogout = () => {
    logout();
    router.push('/'); // Navigate to the home page after logout
  };
  return(
    <div>
      <div className={styles.container}>
      {/* <button onClick={handleLogout}>Logout</button> */}
      <Navbar/>
        <h1>Student Profile</h1>
        <StudentDetailsComponent studentDetails={studentDetails} />
        {/* Button to edit the studentDetials */}
        {/* <Link href="/editStudentDetails" passHref>
          <button className={styles.button}>Edit Profile</button>
        </Link> */}
        <ProjectCard projects= {studentProjects}/> 
        <Link href="/StudentAddProject" passHref> 
          <button className={styles.button}>Add Project</button>
        </Link>
        <OURCard projects= {projectsUnderProfessor}/>
      </div>
    </div>
  );
};

export default StudProfilePage;
