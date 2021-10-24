const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
const Connection = require('mysql2/typings/mysql/lib/Connection');
//port
const PORT = process.env.PORT || 3001;
const app = express();
//express middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to employee_db database')
);

db.connect(err => {
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