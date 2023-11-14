// components/ProjectCard.js
import React from 'react';
import styles from '../styles/ProjectCard.module.css';

const ProjectCard = ({ title, studentName, domain, dept, date, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <p className={styles.info}>{studentName}</p>
        </div>
        <div className={styles.right}>
          <p className={styles.info}>{domain}</p>
        </div>
        <p className={styles.info}>{dept}</p>
        <p className={styles.info}>{date}</p>
        <p className={styles.info}>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;