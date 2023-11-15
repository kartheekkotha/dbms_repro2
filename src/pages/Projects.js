// pages/projects.js
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProjectCard  from '../components/ProjectCard';

const Projects = () => {
    const projectData = [{
        title: 'Project Name',
        studentName: 'KKotha',
        domain: 'AI',
        dept: 'CSE',
        date: '2023-11-01',
        description: 'A brief project description goes here.',
      }];
  return (
    <div>
      <Navbar />
      <Sidebar />
      
      {/* <ProjectCard {...projectData[0]} /> */}
    </div>
  );
};

export default Projects;
