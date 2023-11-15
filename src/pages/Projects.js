// components/Projects.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/AllProjectCard';
import styles from '../styles/Project.module.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [sortBy, setSortBy] = useState('none'); // Initial sorting option
  const [sortOrder, setSortOrder] = useState('asc'); // Initial sort order
  const [searchWords, setSearchWords] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); 
  // Fetch default projects when the component mounts
  useEffect(() => {
    fetchDefaultProjects();
  }, [statusFilter]); // Empty dependency array ensures it runs only once

  const fetchDefaultProjects = () => {
    // Fetch default projects without sorting or search criteria
    fetch('/api/getProjects')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error('Error fetching default projects:', error);
      });
  };

  const handleSortSubmit = () => {
    // Fetch projects from the API endpoint with the current sorting option, sort order, and search words
    fetch(`/api/getProjects?sortBy=${sortBy}&sortOrder=${sortOrder}&searchWords=${searchWords}&statusFilter=${statusFilter}`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  };
  const handleSortChange = (sortByOption) => {
    setSortBy(sortByOption);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };
  return (
    <div>
      <Navbar />
      <div className={styles.contents}>
        <div className={styles.sidebar}>
          <div className={styles.section}>
            <h2>Search</h2>
            <input
              type="text"
              placeholder="Enter search words"
              value={searchWords}
              onChange={(e) => setSearchWords(e.target.value)}
            />
          </div>
          <div className={styles.section}>
            <h2>Sort By:</h2>
            <ul>
              <li>
                <input
                  type="radio"
                  name="sortBy"
                  id="none"
                  checked={sortBy === 'none'}
                  onChange={() => handleSortChange('none')}
                />
                <label htmlFor="none">None</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="sortBy"
                  id="title"
                  checked={sortBy === 'title'}
                  onChange={() => handleSortChange('title')}
                />
                <label htmlFor="title">Title</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="sortBy"
                  id="date"
                  checked={sortBy === 'date_of_creation'}
                  onChange={() => handleSortChange('date_of_creation')}
                />
                <label htmlFor="date">Date</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="sortBy"
                  id="domain"
                  checked={sortBy === 'domain_id'}
                  onChange={() => handleSortChange('domain_id')}
                />
                <label htmlFor="domain">Domain</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="sortBy"
                  id="dept"
                  checked={sortBy === 'department'}
                  onChange={() => handleSortChange('department')}
                />
                <label htmlFor="dept">Dept.</label>
              </li>
              {/* Add more sorting options as needed */}
            </ul>
          </div>
          <div className={styles.section}>
            <h2>Sort Order:</h2>
            <ul>
              <li>
                <input
                  type="radio"
                  name="sortOrder"
                  id="asc"
                  checked={sortOrder === 'asc'}
                  onChange={() => handleSortOrderChange('asc')}
                />
                <label htmlFor="asc">Ascending</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="sortOrder"
                  id="desc"
                  checked={sortOrder === 'desc'}
                  onChange={() => handleSortOrderChange('desc')}
                />
                <label htmlFor="desc">Descending</label>
              </li>
            </ul>
          </div>
          <div className={styles.section}>
            <h2>Status Filter:</h2>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
          <button className={styles.button} onClick={handleSortSubmit}>
            Submit
          </button>
        </div>
        <ProjectCard projects={projects} className={styles.projectCard} />
      </div>
    </div>
  );
};

export default Projects;
