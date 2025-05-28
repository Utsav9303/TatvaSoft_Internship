
CREATE TABLE student (
  Firstname VARCHAR(255),
  Lastname VARCHAR(255),
  Enroll BIGINT,
  Branch VARCHAR(50)
);

INSERT INTO student(Firstname, Lastname, Enroll, Branch)
VALUES
('Darshan', 'bhuva', 12202040501013, 'CP'),
('Aniket', 'Mali', 12202040501007, 'CP'),
('Heet', 'Aghara', 12202040501005, 'CP'),
('Aaditya', 'Purohit', 12202040501001, 'CP'),
('Satyapalsinh', 'Chudasama', 12202040501056, 'CP'),
('Dhruvil', 'Mandaviya', 12202040501022, 'CP'),
('Madhav', 'devaiya', 12302040503004, 'CP'),
('Aayushi', 'Bhatt', 12202040501010, 'CP'),
('Pranav', 'Bhimani', 12302040503006, 'CP'),
('Utsav', 'Modi', 12302040503011, 'CP'),
('Aayushi', 'Trivedi', 12202040501002, 'CP'),
('Dhvanilsinh', 'Rathod', 12202040501071, 'CP'),
('Jay', 'Panchal', 12202040501030, 'CP'),
('Het', 'Bhutak', 12202130501024, 'CSD');

SELECT Firstname, Enroll FROM student;
SELECT * FROM student;

ALTER TABLE student ADD Department VARCHAR(255);

UPDATE student
SET Department = CASE
  WHEN Branch IN ('CP', 'CSD') THEN 'Computer Engineering'
  ELSE Department
END;

DELETE FROM student WHERE Enroll = 12202040501071;
ALTER TABLE student RENAME COLUMN Branch TO Stream;

SELECT * FROM student WHERE Enroll = 12202040501007;
SELECT * FROM student WHERE Enroll < 12302040503000;
SELECT * FROM student WHERE Enroll <= 12302040503000;
SELECT * FROM student WHERE Enroll > 12302040503000;
SELECT * FROM student WHERE Enroll >= 12302040503000;
SELECT * FROM student WHERE Enroll != 12202040501007;
SELECT * FROM student WHERE Firstname LIKE 'D%';
SELECT * FROM student WHERE Firstname LIKE 'Darshan%';
SELECT * FROM student WHERE Firstname ILIKE 'Dar%';
SELECT * FROM student ORDER BY Enroll DESC;
SELECT * FROM student LIMIT 10;
SELECT * FROM student OFFSET 5 LIMIT 10;

SELECT COUNT(*) FROM student;
SELECT AVG(Enroll) FROM student;
SELECT MAX(Enroll), MIN(Enroll) FROM student;

CREATE TABLE department (
  dept_id SERIAL PRIMARY KEY,
  dept_name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO department (dept_name)
VALUES ('Computer Engineering');

ALTER TABLE student ADD COLUMN dept_id INT;

UPDATE student
SET dept_id = CASE
  WHEN Department = 'Computer Engineering' THEN 1
END;

ALTER TABLE student
ADD CONSTRAINT fk_dept
FOREIGN KEY (dept_id) REFERENCES department(dept_id);

-- INNER JOIN
SELECT s.firstname, s.enroll, d.dept_name
FROM student s
INNER JOIN department d ON s.dept_id = d.dept_id;

-- LEFT JOIN
SELECT s.firstname, d.dept_name
FROM student s
LEFT JOIN department d ON s.dept_id = d.dept_id;

-- RIGHT JOIN
SELECT s.firstname, d.dept_name
FROM student s
RIGHT JOIN department d ON s.dept_id = d.dept_id;

SELECT * FROM student WHERE Stream IN ('CP', 'CSD');
SELECT * FROM student WHERE Stream NOT IN ('CP');
SELECT * FROM student WHERE Enroll BETWEEN 12202040501001 AND 12302040503006;
SELECT * FROM student WHERE Firstname LIKE 'H%';
SELECT * FROM student WHERE Lastname ILIKE '%patel%';
SELECT * FROM student WHERE Department IS NULL;
SELECT * FROM student WHERE Department IS NOT NULL;

SELECT Stream, COUNT(*) FROM student GROUP BY Stream;
SELECT Stream, COUNT(*) FROM student GROUP BY Stream HAVING COUNT(*) > 2;
