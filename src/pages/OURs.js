// components/Projects.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/AllOURCard';
import styles from '../styles/Project.module.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [sortBy, setSortBy] = useState('none'); // Initial sorting option
  const [sortOrder, setSortOrder] = useState('asc'); // Initial sort order
  const [searchWords, setSearchWords] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [domainOptions, setDomainOptions] = useState([]);

  // Fetch default projects when the component mounts
  useEffect(() => {
    fetchDefaultProjects();
    fetchDepartmentOptions();
  }, []); // Empty dependency array ensures it runs only once

  const fetchDefaultProjects = () => {
    // Fetch default projects without sorting or search criteria
    fetch('/api/getOURs')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error('Error fetching default projects:', error);
      });
  };

  const fetchDepartmentOptions = () => {
    // Fetch department options from the API
    fetch('/api/getDepartments')
      .then((response) => response.json())
      .then((data) => {
        console.log("data",data);
        setDepartmentOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching department options:', error);
      });
  };

  const fetchDomainOptions = (selectedDepartment) => {
    // Fetch domain options based on the selected department
    fetch(`/api/getDomain?dept_id=${selectedDepartment}`)
      .then((response) => response.json())
      .then((data) => {
        setDomainOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching domain options:', error);
      });
  };

  const handleSortSubmit = () => {
    // Fetch projects from the API endpoint with the current sorting option, sort order, and search words
    fetch(`/api/getOURs?sortBy=${sortBy}&sortOrder=${sortOrder}&searchWords=${searchWords}&statusFilter=${statusFilter}&departmentFilter=${departmentFilter}&domainFilter=${domainFilter}`)
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
  const handleDepartmentFilterChange = (department) => {
    setDepartmentFilter(department);
    // Reset domain filter when department changes
    setDomainFilter('all');
    fetchDomainOptions(department);
  };

  const handleDomainFilterChange = (e) => {
    // Extract domain IDs from selected options and update state
    const selectedDomainIds = Array.from(e.target.selectedOptions, (option) => option.value);
    setDomainFilter(selectedDomainIds);
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
              {/* Add more sorting options as needed */}
            </ul>
          </div>
          <div className={styles.section}>
            <h2>Department Filter:</h2>
            <select
              value={departmentFilter}
              onChange={(e) => handleDepartmentFilterChange(e.target.value)}
            >
              <option value="all">All</option>
              {departmentOptions.map((dept) => (
                <option key={dept.department_id} value={dept.dept_id}>
                  {dept.dept_name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.section}>
            <h2>Domain Filter:</h2>
            <select
              multiple
              value={domainFilter}
              onChange={handleDomainFilterChange}
            >
              {domainOptions.map((domain) => (
                <option key={domain.domain_id} value={domain.domain_id}>
                  {domain.domain_name}
                </option>
              ))}
            </select>
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
