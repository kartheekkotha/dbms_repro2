// components/StudentDetailsComponent.js
import React from 'react';

const StudentDetailsComponent = ({ studentDetails }) => {
  return (
    <div>
      <h2>Student Details</h2>
      <p>Name: {studentDetails.sname}</p>
      <p>Email: {studentDetails.student_email_id}</p>
      <p>Batch: {studentDetails.batch}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default StudentDetailsComponent;
