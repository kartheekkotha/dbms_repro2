import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <About name="Kotha Kartheek" rollNo="2110110292" department="CSE" />
      <About name="Arahant Chekuri Varma" rollNo="2110110..." department="CSE" />
      <About name="Bharathi Subramanian Nagarajan" rollNo="2110110162" department="CSE" /> 
      <About name="Tejaswi M" rollNo="2110110556" department="CSE" />
    </div>
  );
};

export default AboutUs;
