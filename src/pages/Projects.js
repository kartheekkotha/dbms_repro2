// pages/projects.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProjectCard  from '../components/AllProjectCard';
import styles from "../styles/Project.module.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from the API endpoint
    fetch('/api/getProjects')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <div className = {styles.contents}>
        <Sidebar/>
        <ProjectCard projects={projects} className={styles.projectCard} />
      </div>
    </div>
  );
};

export default Projects;
