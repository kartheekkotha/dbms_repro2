// components/Navbar.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <nav>
        <Link legacyBehavior href="/pages/Projects" passHref>
          <a id="link">Projects</a>
        </Link>
        <Link legacyBehavior href="/pages/OURs">
        <a id="link">Ours</a>
        </Link>
        <Link legacyBehavior href="/pages/AboutUs">
        <a id="link">About Us</a>
        </Link>
        <Link legacyBehavior href="/pages/Profile">
        <a id="link">Profile</a>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
