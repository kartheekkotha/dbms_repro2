// pages/studprofile.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import styles from '../styles/StudProfile.module.css';
import ProfessorDetailsComponent from '../components/ProfessorDetailsComponent';
import ProjectCard from '../components/ProfessorProjectCard';
import OURCard from '../components/ProfessorOURCard';
import { useAuth } from '../context/AuthContext';

const ProfProfilePage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const professor_email_id = user ? user.email_id : null;
  console.log("Professor Page of :",professor_email_id);
  const [ProfessorDetails, setProfessorDetails] = useState({});
  const [ProfessorProjects, setProfessorProjects] = useState([]);
  const [ProfessorOURs, setProfessorOURs] = useState([]);
  useEffect(() => {
    if (professor_email_id) {
    // Fetch student details
    fetch(`/api/getProfessorDetails?Professor_email_id=${professor_email_id}`)
      .then(response => response.json())
      .then(data => setProfessorDetails(data))
      .catch(error => console.error('Error fetching student details:', error));

    // Fetch student projects
    fetch(`/api/getProfessorProjects?professorID=${professor_email_id}`)

      .then(response => response.json())
      .then(data => setProfessorProjects(data))
      .catch(error => console.error('Error fetching student projects:', error));

      fetch(`/api/getProfessorOURs?professorID=${professor_email_id}`)
      .then(response => response.json())
      .then(data => setProfessorOURs(data))
      .catch(error => console.error('Error fetching projects under professor guidance:', error));
    }
    }, [professor_email_id])
  console.log(ProfessorDetails);
  console.log("stud Projects",ProfessorProjects);
  console.log("Projects under prof",ProfessorOURs);
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
        <ProfessorDetailsComponent ProfessorDetails={ProfessorDetails} />
        {/* Button to edit the studentDetials */}
        {/* <Link href="/editProfessorDetails" passHref>
          <button className={styles.button}>Edit Profile</button>
        </Link> */}
        <ProjectCard projects= {ProfessorProjects}/> 
        <Link href="/ProfessorAddProject" passHref> 
          <button className={styles.button}>Add Project</button>
        </Link>
        <OURCard projects= {ProfessorOURs}/>
        <Link href="/ProfessorAddOUR" passHref> 
          <button className={styles.button}>Add OUR</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfProfilePage;
