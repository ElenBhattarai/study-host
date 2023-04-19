const express = require('express');
const app = express();
require('dotenv').config({ path: '../.env' })
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to SQL!')
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
 
app.get('/getdepts', async(req,res) => {
    connection.query('SELECT * FROM Course', function (err, results, fields) {   
    console.log('Query results:', results);
    res.json({ courses: results });
    })
});

app.get('/getcourses', async(req,res) => {
    connection.query(`SELECT course_num FROM Course WHERE department = '${req.query.dept}'`, function (err, results, fields) {   
        console.log('Query results:', results);
        res.json({ courses: results });
    })
})

app.post('/createsession', async(req,res) => {
    const name = req.body.name
    const mode = req.body.mode
    const dept = req.body.dept
    const cnum = req.body.cnum
    const date = req.body.date
    const stime = req.body.stime
    const etime = req.body.etime
    const user_id  = req.body.user_id

    const query =  `INSERT INTO Session(name,date,start_time,end_time,mode,course_id,user_id)   
                    VALUES ('${name}', '${date}', '${stime}', '${etime}', '${mode}', (SELECT course_id FROM Course WHERE department = '${dept}' AND course_num = ${cnum}), ${user_id})`
    connection.query(query, function () {})

})

app.get('/allsessions', async(req,res) => {
    connection.query('SELECT * FROM Session', function (err, results, fields) {   
        console.log('Query results:', results);
        res.json({ sessions: results });
        })
})

app.listen(8000, ()=> {
    console.log("Backend is running")
})