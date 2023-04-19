const express = require('express');
const app = express();
require('dotenv').config({ path: '../.env' })
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to SQL!')
const cors = require('cors');
app.use(cors());
 
app.get('/getcourses', async(req,res) => {
    connection.query('SELECT * FROM Course', function (err, results, fields) {   
    console.log('Query results:', results);
    res.json({ courses: results });
    })
});

app.listen(8000, ()=> {
    console.log("Backend is running")
})