// components/About.js
import React from 'react';
import styles from '../styles/About.module.css';

const About = ({ name, rollNo, department }) => {
  return (
    <div className={styles.box}>
      <p className={styles.info}>{name}</p>
      <p className={styles.info}>{rollNo}</p>
      <p className={styles.info}>{department}</p>
    </div>
  );
};

export default About;
