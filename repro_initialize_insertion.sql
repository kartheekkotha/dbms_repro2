-- -- insert into department table
-- insert into department (dept_id, dept_name) values ('ECE', 'Electronics and Communication Engineering');
-- insert into department (dept_id, dept_name) values ('ME', 'Mechanical Engineering');

-- -- insert into student table
-- insert into student (sname, student_id, email_id, batch, dept_id) values ('S2', 'ab123', 'ab123@snu.edu.in', '2017', 'ECE');
-- insert into student (sname, student_id, email_id, batch, dept_id) values ('S3', 'cd456', 'cd456@snu.edu.in', '2017', 'ME');

-- -- insert into professor table
-- insert into professor (pname, professor_id, email_id, dept_id) values ('P1', 'P001', 'ef789', 'ME');
-- insert into professor (pname, professor_id, email_id, dept_id) values ('P2', 'P002', 'gh012', 'ECE');

-- -- insert into project table
-- insert into project (department, domain, title, details, email_id) values ('ME', 'Machine Learning', 'Project 1', 'Details of Project 1', 'kk746');
-- insert into project (department, domain, title, details, email_id) values ('ECE', 'Signal Processing', 'Project 2', 'Details of Project 2', 'ab123');

-- -- insert into domain table
-- insert into domain (domain_id, domain_name, department) values ('ML', 'Machine Learning', 'ME');
-- insert into domain (domain_id, domain_name, department) values ('SP', 'Signal Processing', 'ECE');

-- -- insert into project_student table
-- insert into project_student (project_id, student_id) values (1000, 'ab123');
-- insert into project_student (project_id, student_id) values (1001, 'cd456');

-- -- insert into project_professor table
-- insert into project_professor (project_id, professor_id) values (1000, 'P001');
-- insert into project_professor (project_id, professor_id) values (1001, 'P002');

-- -- insert into project_domain table
-- insert into project_domain (project_id, domain_id) values (1000, 'ML');
-- insert into project_domain (project_id, domain_id) values (1001, 'SP');

-- -- insert into project_student_professor table
-- insert into project_student_professor (project_id, student_id, professor_id) values (1000, 'cd456', 'P001');
-- insert into project_student_professor (project_id, student_id, professor_id) values (1001, 'ab123', 'P002');


-- insert the department and the domain values by default 
-- department - domain 
-- CSE - Machine Learning
-- CSE - Computer Vision    
-- CSE - NLP
-- CSE - Data Science
-- CSE - Computer Networks
-- CSE - Operating Systems
-- CSE - Database Management Systems
-- CSE - Web Development
-- CSE - app development
-- CSE - Algorithms
-- ECE - Signal Processing
-- ECE - VLSI
-- ECE - Embedded Systems
-- ECE - Communication Systems
-- Chemical engeering - Chemical Engineering
-- Chemical engeering - Biochemical Engineering
-- Chemical engeering - Polymer Engineering
-- Chemical engeering - Process Engineering
-- Insert these 
use sql12660213;

insert into Department (dept_id, dept_name) values ('CSE', 'Computer Science and Engineering');
insert into Department (dept_id, dept_name) values ('ECE', 'Electronics and Communication Engineering');
insert into Department (dept_id, dept_name) values ('CHE', 'Chemical Engineering');
insert into Department (dept_id, dept_name) values ('ME', 'Mechanical Engineering');
insert into Department (dept_id, dept_name) values ('CIV', 'Civil Engineering');

insert into Domain (domain_id, domain_name, department) values ('ML', 'Machine Learning', 'CSE');
insert into Domain (domain_id, domain_name, department) values ('CV', 'Computer Vision', 'CSE');
insert into Domain (domain_id, domain_name, department) values ('NLP', 'Natural Language Processing', 'CSE');
insert into Domain (domain_id, domain_name, department) values ('DS', 'Data Science', 'CSE');
insert into Domain (domain_id, domain_name, department) values ('CN', 'Computer Networks', 'CSE');
insert into Domain (domain_id, domain_name, department) values ('OS', 'Operating Systems', 'CSE');
insert into Domain (domain_id, domain_name, department) values ('DBMS', 'Database Management Systems', 'CSE');
insert into Domain (domain_id, domain_name, department) values ('WD', 'Web Development', 'CSE');
insert into Domain (domain_id, domain_name, department) values ('AD', 'App Development', 'CSE');
insert into Domain (domain_id, domain_name, department) values ('ALGO', 'Algorithms', 'CSE');
insert into Domain (domain_id, domain_name, department) values ('SP', 'Signal Processing', 'ECE');
insert into Domain (domain_id, domain_name, department) values ('VLSI', 'VLSI', 'ECE');
insert into Domain (domain_id, domain_name, department) values ('ES', 'Embedded Systems', 'ECE');
insert into Domain (domain_id, domain_name, department) values ('CS', 'Communication Systems', 'ECE');
insert into Domain (domain_id, domain_name, department) values ('CHE', 'Chemical Engineering', 'CHE');
insert into Domain (domain_id, domain_name, department) values ('BIO', 'Biochemical Engineering', 'CHE');
insert into Domain (domain_id, domain_name, department) values ('POLY', 'Polymer Engineering', 'CHE');
insert into Domain (domain_id, domain_name, department) values ('PE', 'Process Engineering', 'CHE');

