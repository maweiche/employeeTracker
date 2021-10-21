const express = require('express');
const mysql = require('mysql2');
//port
const PORT = process.env.PORT || 3001;
const app = express();
//express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username,
        user: 'root',
        password: 'password',
        database: 'employee_db'
    }
)
