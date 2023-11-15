// components/ProfessorDetailsComponent.js
import React from 'react';

const ProfessorDetailsComponent = ({ ProfessorDetails }) => {
  return (
    <div>
      <h2>Professor Details</h2>
      <p>Name: {ProfessorDetails.pname}</p>
      <p>Email: {ProfessorDetails.professor_email_id}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ProfessorDetailsComponent;
