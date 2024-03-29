// components/Navbar.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  let {page} = '';
  if(user && user.role === 'Professor'){
    page = '/ProfProfile';
  }
  else{
    page = '/StudProfile';
  }

  const handleLogout = () => {
    logout();
    router.push('/'); // Navigate to the home page after logout
  };

  return (
    <div className={styles.navbar}>
      <nav className={styles.nav}>
        <Link href="/Projects" passHref>
          <span className={styles.link}>Projects</span>
        </Link>
        <Link href="/OURs" passHref>
          <span className={styles.link}>OURs</span>
        </Link>
        <Link href="/aboutUs" passHref>
          <span className={styles.link}>About Us</span>
        </Link>
        <Link href = {page} passHref>
          <span className={styles.link}>Profile</span>
        </Link>
      </nav>
        <button onClick={handleLogout} className={styles.button} >Logout</button>
    </div>
  );
};

export default Navbar;
