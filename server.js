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
                        'Update an employee manager',
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
        //8
        if (choices === "Update an employee manager") {
            updateManager();
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
};

//2
showRoles = () => {
    console.log('Showing all roles...\n');
    connection.query("SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id;",
    function(err, res) {
        if (err) throw err
        console.table(res)
        promptUser()
    })
};
//3
showEmployees = () => {
    console.log('Showing all employees...\n');
    connection.query("SELECT teamMember.id, teamMember.first_name, teamMember.last_name, teamMember.role_id, teamMember.manager_id AS role FROM department;")
}
//4
addDepartment
//5
addRole
//6
addEmployee
//7
updateEmployee
//8
updateManager
//9
employeeDepartment
//10
deleteDepartment
//11
deleteRole
//12
deleteEmployee
