INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Legal"),
        ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES  ("Salesperson", 35000, 1),
        ("Sales Lead", 55000, 1),
        ("Sales Manager", 75000, 1),
        ("Software Engineer", 60000, 2),
        ("Lead Engineer", 100000, 2),
        ("Lawyer", 90000, 3),
        ("Legal Team Lead", 110000, 3),
        ("Accountant", 80000, 4),
        ("Account Manager", 92000, 4);

INSERT INTO teamMember (first_name, last_name, manager_id, role_id)
VALUES  ("Peter", "Griffin", null, 1),
        ("Stewie", "Griffin", null, 2),
        ("Obi-Wan", "Ginobi", null, 3),
        ("Princess", "Leia", 1, 4),
        ("Luke", "Skywalker", 2, 5),
        ("Kool-Aid", "Man", null, 7);