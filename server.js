const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
//port
const PORT = process.env.PORT || 3001;
const app = express();
//express middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log('Connected to employee_db database')
);

connection.connect(err => {
    if(err) throw err;
    startImage();
});

//start image
startImage = () => {
    console.log("********************")
    console.log("*                  *")
    console.log("*     Employee     *")
    console.log("*      Manager     *")
    console.log("*                  *")
    console.log("********************")
    promptUser();
}

//inquirer prompts
const promptUser = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices:   ['View all departments',
                        'View all roles',
                        'View all employees',
                        'Add a department',
                        'Add a role',
                        'Add an employee',
                        'Update an employee role',
                        'View employees by department',
                        'Delete a department',
                        'Delete a role',
                        'Delete an employee',
                        'No Action']
        }
    ])
    .then((answers) => {
        const { choices } = answers;
        //1
        if (choices === "View all departments") {
            showDepartments();
        }
        //2
        if (choices === "View all roles") {
            showRoles();
        }
        //3    
        if (choices === "View all employees") {
            showEmployees();
        }
        //4
        if (choices === "Add a department") {
            addDepartment();
        }
        //5
        if (choices === "Add a role") {
            addRole();
        }
        //6
        if (choices === "Add an employee") {
            addEmployee();
        }
        //7
        if (choices === "Update an employee role") {
            updateEmployee();
        }
        //9
        if (choices === "View employees by department") {
            employeeDepartment();
        }
        //10    
        if (choices === "Delete a department") {
            deleteDepartment();
        }
        //11
        if (choices === "Delete a role") {
            deleteRole();
        }
        //12
        if (choices === "Delete an employee") {
            deleteEmployee();
        }
        //13
        if (choices === "No Action") {
            connection.end()
        };
        
    });
};

//1
showDepartments = () => {
    console.log('Showing all departments...\n')
    connection.query("SELECT department.id AS id, department.name AS department FROM department;",
    function(err, res) {
        if (err) throw err
        console.table(res)
        promptUser()
    })
}

//2
showRoles = () => {
    console.log('Showing all roles...\n');
    connection.query("SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id;",
    function(err, res) {
        if (err) throw err
        console.table(res)
        promptUser()
    })
}
//3
showEmployees = () => {
    console.log('Showing all employees...\n');
    connection.query("SELECT teamMember.first_name, teamMember.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM teamMember INNER JOIN role on role.id = teamMember.role_id INNER JOIN department on department.id = role.department_id left join teamMember e on teamMember.manager_id = e.id;",
    // connection.query("SELECT * FROM teamMember"),
    function(err, res) {
        if (err) throw err
        console.table(res)
        promptUser();
    })
}
//4
addDepartment = () => {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you liket to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                promptUser();
            }
        )
    })
}
//5
addRole = () => {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", 
    function(err, res) {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the roles Title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"

            }
        ]) .then(function(res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
              },
              function(err) {
                  if(err) throw err
                  console.table(res);
                  promptUser();
              }
            )
        });
    });
}
// //6
addEmployee = () => {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter their last name "
        },
        {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "What is their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId

        }, function(err) {
            if (err) throw err
            console.table(val)
            promptUser()
        })
    })
}
// //7
updateEmployee = () => {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
    function(err, res) {

        if (err) throw err
        console.log(res)
        inquirer.prompt([
            {
                name: "lastName",
                type: "rawlist",
                choices: function() {
                    var lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee's last name?",
            },
            {
                name: "role",
                type: "rawlist",
                message: "what is the Employees new titl?",
                choices: selectRole()
            },
        ]).then(function(val) {
            var roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?",
            {
                last_name: val.lastName
            },
            {
                role_id: roleId
            },
            function(err) {
                if (err) throw err
                console.table(val)
                promptUser()
            })
        });
    });
}
// //9
employeeDepartment = () => {
        connection.query("SELECT teamMember.first_name, teamMember.last_name, department.name AS Department FROM teamMember JOIN role ON teamMember.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY teamMember.id;",
        function(err, res) {
            if (err) throw err
            console.table(res)
            promptUser()
        })
    }
// //10
// deleteDepartment
// //11
// deleteRole
// //12
// deleteEmployee
