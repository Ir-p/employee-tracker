DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- department:
CREATE TABLE department(
-- id - INT PRIMARY KEY
	id INT AUTO_INCREMENT,
-- name - VARCHAR(30) to hold department name
	name VARCHAR(30),
    PRIMARY KEY(id)
);

-- role:
CREATE TABLE role (
-- id - INT PRIMARY KEY
id INT AUTO_INCREMENT,
-- title - VARCHAR(30) to hold role title
title VARCHAR(30),
-- salary - DECIMAL to hold role salary
salary DECIMAL,
-- department_id - INT to hold reference to department role belongs to
department_id INT,
PRIMARY KEY(id), 
FOREIGN KEY (department_id) REFERENCES department(id)
);

-- employee:
CREATE TABLE employee (
-- id - INT PRIMARY KEY
id INT AUTO_INCREMENT,
-- first_name - VARCHAR(30) to hold employee first name
first_name VARCHAR(30),
-- last_name - VARCHAR(30) to hold employee last name
last_name VARCHAR(30),
-- role_id - INT to hold reference to role employee has
role_id INT,
-- manager_id - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
manager_id INT,
PRIMARY KEY(id),
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
)

-- Creates new rows containing data in named columns
INSERT INTO department (name)
	VALUES ("R&D"),
			("HR"),
			("Marketing"),
			("Finance"),
			("Sales");


INSERT INTO role (title, salary, department_id)
	VALUES('R&D Director', 150000, 1),
			('Senior Researcher', 75000, 1),
			('Junior Researcher', 45000, 1),
			('Senior Developer', 80000, 1),
			('Junior Developer', 50000, 1),
			('HR Director', 155000, 2),
			('Senior HR Rep', 75000, 2),
			('Junior HR Rep', 45000, 2),
			('Marketing Director', 180000, 3),
			('Senior Marketing Rep', 80000, 3),
			('Junior Marketing Rep', 50000, 3),
			('Controller', 180000, 4),
			('Senior Accountant', 78000, 4),
			('Junior Accountant', 35000, 4),
			('Sales Director', 250000, 5),
			('Top Sales Rep', 100000, 5),
			('Sales Rep', 25000, 5);


-- Join role and department talbe based on the primary and foreign key relation
SELECT title, salary, name
FROM role, department
WHERE role.department_id = department.id;