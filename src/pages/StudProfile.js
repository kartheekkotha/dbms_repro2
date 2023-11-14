// pages/studprofile.js
import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import styles from '../styles/StudProfile.module.css';
import ProjectCard from '../components/ProjectCard';
import OURCard from '../components/OURCard';

const StudProfilePage = () => {
  const studentData = {
    name: 'John Doe',
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
        <h1>Student Profile</h1>
        <p>Name: {studentData.name}</p>
        <p>Department: {studentData.department}</p>
        <p>Graduating Year: {studentData.graduatingYear}</p>
        <p>Email ID: {studentData.email}</p>
        <p>Interests: {studentData.interests}</p>
        <p>LinkedIn: {studentData.linkedin}</p>
        <p>GitHub: {studentData.github}</p>
        <Link href="/addproject" passHref>
          <button className={styles.button}>Add Project</button>
        </Link>
        <h2 className={styles.bold}>Bookmarks</h2>
        <h2 className={styles.bold}>Projects</h2>
        <ProjectCard /> {/*KARTHeEK PASS PROPS HERE*/} 
        <h2 className={styles.bold}>OURs</h2>
        <OURCard/> {/*KARTHeEK PASS PROPS HERE*/} 
      </div>
    </div>
  );
};

export default StudProfilePage;
