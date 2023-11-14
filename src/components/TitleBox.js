// components/Navbar.js
import React from 'react';
import styles from '../styles/TitleBox.module.css';

const TitleBox = () => {
  return (    
    <div className={styles.header}>
        <div className={styles.title}>
        <h1>Project Title</h1>
        </div>
    </div>
  );
};

export default TitleBox;
