// components/Sidebar.js
import React from 'react';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <h2>Search</h2>
        <input type="text" placeholder="Enter search words" />
      </div>
      <div className={styles.section}>
        <h2>Filter by:</h2>
        <ul>
          <li>
            <input type="radio" name="filter" id="none" />
            <label htmlFor="none">None</label>
          </li>
          <li>
            <input type="radio" name="filter" id="title" />
            <label htmlFor="title">Title</label>
          </li>
          <li>
            <input type="radio" name="filter" id="none" />
            <label htmlFor="none">Student</label>
          </li>
          <li>
            <input type="radio" name="filter" id="title" />
            <label htmlFor="title">Date</label>
          </li>
          <li>
            <input type="radio" name="filter" id="none" />
            <label htmlFor="none">Domain</label>
          </li>
          <li>
            <input type="radio" name="filter" id="title" />
            <label htmlFor="title">Dept.</label>
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h2>Sort By:</h2>
        <ul>
          <li>
            <input type="radio" name="sortBy" id="none" />
            <label htmlFor="none">None</label>
          </li>
          <li>
            <input type="radio" name="sortBy" id="title" />
            <label htmlFor="title">Title</label>
          </li>
          <li>
            <input type="radio" name="filter" id="none" />
            <label htmlFor="none">Student</label>
          </li>
          <li>
            <input type="radio" name="filter" id="title" />
            <label htmlFor="title">Date</label>
          </li>
          <li>
            <input type="radio" name="filter" id="none" />
            <label htmlFor="none">Domain</label>
          </li>
          <li>
            <input type="radio" name="filter" id="title" />
            <label htmlFor="title">Dept.</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
