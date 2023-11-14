import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const OURs = () => {
  const ourData = {
    title: 'OUR Name',
    studentName: 'PSingh',
    domain: 'ML',
    profName: 'Sneha',
    dept: 'CSE',
    date: '2023-11-01',
    description: 'A brief project description goes here.',
  };
  
  return (
    <div>
      <Navbar />
      <Sidebar />
      <OURCard {...ourData} />
    </div>
  );
};

export default OURs;
