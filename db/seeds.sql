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

INSERT INTO teamMember (first_name, last_name, role_id, manager_id)
VALUES  ("Peter", "Griffin", 6, null),
        ("Stewie", "Griffin", 7, null),
        ("Obi-Wan", "Ginobi", 1, null),
        ("Obi-Wan", "Ginobi", 2, 2),
        ("Obi-Wan", "Ginobi", 3, 2),
        ("Obi-Wan", "Ginobi", 4, 2),
        ("Obi-Wan", "Ginobi", 5, 2),
        ("Obi-Wan", "Ginobi", 6, 2),
        ("Obi-Wan", "Ginobi", 8, 2),
        ("Obi-Wan", "Ginobi", 9, 2),
        ("Obi-Wan", "Ginobi", 9, 2);     