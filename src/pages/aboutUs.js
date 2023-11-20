import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import styles from '../styles/AboutUs.module.css';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.holder}>
      <About name="Kotha Kartheek" rollNo="2110110292" department="CSE" />
      <About name="Tejaswi M" rollNo="2110110556" department="CSE" />
      <About name="Arahant Chekuri Varma" rollNo="2110110174" department="CSE" />
      <About name="Bharathi Subramanian Nagarajan" rollNo="2110110162" department="CSE" /> 
      </div>
    </div>
  );
};

export default AboutUs;
