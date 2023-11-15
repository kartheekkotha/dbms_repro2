// components/ProjectCard.js
import React from 'react';
import styles from '../styles/ProjectCard.module.css';


const ProjectCard = ({ projects }) => {
  console.log("ProjectCrad Projects", projects);

  if (projects.length === 0) {
    return (
      <div>
        <h2>Project List</h2>
        <p>No projects found.</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Project List</h2>
        <table className={styles.projectTable}>
          {/* Display your project data in a table */}
          {/* You can customize this based on your project data structure */}
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Title</th>
              <th>Details</th>
              <th>Department</th>
              <th>Domains</th>
              <th>Status</th>
              <th>Date of Creation</th>
              <th>Edit</th> {/* New column for the Edit button */}
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.project_id}>
                <td>{project.project_id}</td>
                <td>{project.title}</td>
                <td>{project.details}</td>
                <td>{project.department}</td>
                <td>
                  {project.domains.map((domain) => (
                    <div key={domain.domain_id}>
                      {domain.domain_name}
                    </div>
                  ))}
                </td>
                <td>{project.work_status}</td>
                <td>{project.date_of_creation}</td>
                <td>
                  <button className={styles.editButton}>Edit</button>
                </td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ProjectCard;
