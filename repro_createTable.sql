use sql12660213;

drop table if exists Project_Student_Professor;
drop table if exists Project_Domain;
drop table if exists Project_Professor;
drop table if exists Project_Student;
drop table if exists User;
drop table if exists Project;
drop table if exists Domain;
drop table if exists Student;
drop table if exists Professor;
drop table if exists Department;


create table Department(
  dept_id varchar(5) primary key,
  dept_name varchar(50)
);



create table Student(
  sname varchar(50),
  student_email_id varchar(50) primary key,
  batch varchar(50),
  dept_id varchar(5),
  foreign key (dept_id) references Department(dept_id)
);

create table Professor(
  pname varchar(50),
  professor_email_id varchar(50) primary key,
  dept_id varchar(5),
  foreign key (dept_id) references Department(dept_id)
);

-- create table project with autoincrement starting 1000
create table Project(
  project_id int auto_increment primary key,
  department varchar(5),
  title varchar(100),
  details varchar(1000),
  work_status varchar(50),
  date_of_creation date,
  is_research boolean default false,
  foreign key (department) references Department(dept_id)
) auto_increment = 1000;


create table Domain(
  domain_id varchar(10),
  domain_name varchar(50),
  department varchar(5),
  primary key (domain_id, domain_name),
  foreign key (department) references Department(dept_id)
);

-- create table to handle the login and sign up details
create table StudentUser(
  email_id varchar(50) primary key,
  password varchar(255),
  foreign key (email_id) references Student(student_email_id)
);

create table ProfessorUser(
  email_id varchar(50) primary key,
  password varchar(255),
  foreign key (email_id) references Professor(professor_email_id)
);

create table Project_Student(
  project_id int,
  student_email_id varchar(50),
  primary key (project_id, student_email_id),
  foreign key (project_id) references Project(project_id),
  foreign key (student_email_id) references Student(student_email_id)
);

create table Project_Professor(
  project_id int,
  professor_email_id varchar(10),
  primary key (project_id, professor_email_id),
  foreign key (project_id) references Project(project_id),
  foreign key (professor_email_id) references Professor(professor_email_id)
);

create table Project_Domain(
  project_id int,
  domain_id varchar(10),
  primary key (project_id, domain_id),
  foreign key (project_id) references Project(project_id),
  foreign key (domain_id) references Domain(domain_id)
);

create table Project_Student_Professor(
  project_id int,
  student_email_id varchar(50),
  professor_email_id varchar(50),
  primary key (project_id, student_email_id, professor_email_id),
  foreign key (project_id) references Project(project_id),
  foreign key (student_email_id) references Student(student_email_id),
  foreign key (professor_email_id) references Professor(professor_email_id)
);
