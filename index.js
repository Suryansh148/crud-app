const express=require('express')

const mysql=require('mysql2')

const app=express()

const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:true}));

// Create a connection to mysql server

const db=mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'s1u2r3y4a5s',
    database:'suryanshdb'
})


// Connect
db.connect((err)=>{
    if(err)
    console.log(err)
    else
    console.log('Mysql connected..')
})

app.listen(process.env.PORT||9000,()=>{
    console.log('Server started at port 9000')
})

app.get('/student', (req, res) => {

    const url='SELECT * FROM student'

    db.query(url, (err, rows) => {
        if (!err)
            res.send(rows);
            
        else
            console.log(err);
    })
});

app.get('/student/:is', (req, res) => {

    const url='SELECT * FROM student WHERE id = ?'
   db.query(url, [req.params.is], (err, rows) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/delete/:id', (req, res) => {
    db.query('DELETE FROM student WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
            
    })
});


app.post('/student', (req, res) => {
    let emp = req.body;
    var sql = "SET @id = ?;SET @Name = ?;SET @Country = ?; \
    CALL EmployeeAddOrEdit(@id,@Name,@Country);";
    db.query(sql, [emp.id, emp.Name, emp.Country], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].id);
            });
        else
            console.log(err);
    })
});


app.put('/student', (req, res) => {
    let emp = req.body;
    var sql = "SET @id = ?;SET @Name = ?;SET @Country = ?; \
    CALL EmployeeAddOrEdit(@id,@Name,@Country);";
   db.query(sql, [emp.id, emp.Name, emp.Country], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});