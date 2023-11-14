// pages/index.js
import React from 'react';
import styles from '../styles/Home.module.css';
import TitleBox from '../components/TitleBox';
import StartPage from '../pages/Start';
import ProfProfilePage from '../pages/ProfProfile';

const Home = () => {

  return (
    <div className={styles.container}>
      <TitleBox/>  
      <StartPage/>
    </div>
  );
};

export default Home;
