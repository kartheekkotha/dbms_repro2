// pages/profprofile.js
import React from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/StudProfile.module.css';
import ProjectCard from '../components/ProjectCard';
import OURCard from '../components/OURcard';

const ProfProfilePage = () => {
  const router = useRouter();
  const { professor_email_id } = router.query;
  console.log(professor_email_id);
  const studentData = {
    name: 'John Dolly',
    department: 'Computer Science',
    graduatingYear: '2023',
    email: 'john.doe@example.com',
    interests: 'Web Development, Machine Learning',
    linkedin: 'https://www.linkedin.com/in/johndoe/',
    github: 'https://github.com/johndoe',
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1>Professor Profile</h1>
        <p>Name: {studentData.name}</p>
        <p>Department: {studentData.department}</p>
        <p>Graduating Year: {studentData.graduatingYear}</p>
        <p>Email ID: {studentData.email}</p>
        <p>Interests: {studentData.interests}</p>
        <p>LinkedIn: {studentData.linkedin}</p>
        <p>GitHub: {studentData.github}</p>
        <Link href="/addproject" passHref> {/*PUT IN THE BACKEND FOR THESE BUTTONS*/}
          <button className={styles.button}>Add Project</button>
        </Link>
        <Link href="/addproject" passHref>
          <button className={styles.button}>Add OUR</button>
        </Link>
        <h2 className={styles.bold}>Bookmarks</h2>
        <h2 className={styles.bold}>Projects</h2>
        <ProjectCard /> {/*KARTHeEK PASS PROPS HERE*/} 
        <h2 className={styles.bold}>OURs</h2>
        <OURCard/> {/*KARTHeEK PASS PROPS HERE too*/} 
      </div>
    </div>
  );
};

export default ProfProfilePage;