-- select all records from Department table
SELECT * FROM Department;

-- select all records from Student table
SELECT * FROM Student;

-- select all records from Professor table
SELECT * FROM Professor;

-- select all records from Project table
SELECT * FROM Project;

-- select all records from Domain table
SELECT * FROM Domain;

-- select all records from Project_Student table
SELECT * FROM Project_Student;

-- select all records from Project_Professor table
SELECT * FROM Project_Professor;

-- select all records from Project_Domain table
SELECT * FROM Project_Domain;

-- select all records from Project_Student_Professor table
SELECT * FROM Project_Student_Professor;

insert into Project (department, title, details, work_status, date_of_creation, is_research) values ('CSE', 'Project 2', 'Details of Project 2', 'Ongoing', '2020-01-01', false);
insert into Project_Student (project_id, student_email_id) values (1001, 'kk746@snu.edu.in');
insert into project_domain(project_id , domain_id) values (1001,"ML");
insert into project_domain(project_id , domain_id) values (1001,"DS");


insert into Project (department, title, details, work_status, date_of_creation, is_research) values ('CSE', 'Project 4', 'Details of Project 4', 'InComplete', '2020-01-01', true);
insert into Project_Professor(project_id, professor_email_id) values (1004, 'testProfessor@gmail.com');
insert into project_domain(project_id , domain_id) values (1004,"ML");  
insert into project_domain(project_id , domain_id) values (1004,"CN");
insert into project_student_professor(project_id , student_email_id, professor_email_id) values (1002,"kk746@snu.edu.in","testProfessor@gmail.com");


insert into Project (department, title, details, work_status, date_of_creation, is_research) values ('CSE', 'Project 3', 'Details of Project 2', 'Incomplete', '2020-01-01', true);
insert into Project_Professor(project_id, professor_email_id) values (1003, 'testProfessor2@gmail.com');
insert into project_domain(project_id , domain_id) values (1003,"ML");  
insert into project_domain(project_id , domain_id) values (1003,"CN");
insert into project_student_professor(project_id , student_email_id, professor_email_id) values (1003,"kk746@snu.edu.in","testProfessor2@gmail.com");
