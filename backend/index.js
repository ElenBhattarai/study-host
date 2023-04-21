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
const bcrypt = require("bcrypt");
const e = require('express');
 
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
    const {name, mode, dept, cnum, date, stime, etime, user_id} = req.body

    const query =  `INSERT INTO Session(name,date,start_time,end_time,mode,course_id,user_id)   
                    VALUES ('${name}', '${date}', '${stime}', '${etime}', '${mode}', (SELECT course_id FROM Course WHERE department = '${dept}' AND course_num = ${cnum}), ${user_id})`
    connection.query(query, function (err, results, fields){
        if(err){
            console.log(err)
        }
    })
    res.json({})
})

app.get('/allsessions', async(req,res) => {
    connection.query('SELECT * FROM Session', function (err, results, fields) {   
        console.log('Query results:', results);
        res.json({ sessions: results });
        })
})

app.post("/register", async (req,res)=>{
    const {email, password, firstname, lastname} = req.body
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const query = `INSERT INTO User(firstname, lastname, email, password) VALUES ('${firstname}','${lastname}','${email}','${hashedPassword}')`
        connection.query(query, function(err,results,fields){
            if(err){
                console.log(err)
            } else {
                console.log({...req.body, user_id: results.insertId})
                res.status(200).send({...req.body, user_id: results.insertId})
            }
        })
        
    } catch(e) {
        console.log(e)    
    }
})

app.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    try{
        const query =  `SELECT * FROM User WHERE email = '${email}'`
        connection.query(query, async function(err,results,fields){
            if(err){
                console.log(err)
            } else {
                if(!results[0]){
                    res.status(400).send('Wrong password')
                } else {
                    const validPassword = await bcrypt.compare(password, results[0].password)
                    if(!validPassword){
                        res.status(400).send('Wrong password')
                    } else {
                        res.status(200).send(results[0])
                    }
                }
            }
        })
    } catch(e) {
        console.log(e)
    }
})



app.listen(8000, ()=> {
    console.log("Backend is running")
})