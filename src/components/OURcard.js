// components/ourCard.js
import React from 'react';
import styles from '../styles/ProjectCard.module.css';

const OURCard = ({ title, studentName, domain, profName, dept, date, description }) => {
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
        <div className={styles.left}>
          <p className={styles.info}>{profName}</p>
        </div>
        <div className={styles.right}>
          <p className={styles.info}>{dept}</p>
        </div>
        <p className={styles.info}>{date}</p>
        <p className={styles.info}>{description}</p>
      </div>
    </div>
  );
};

export default OURCard;
