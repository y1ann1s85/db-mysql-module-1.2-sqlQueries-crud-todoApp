const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 3000;
 
app.use(cors());
app.use(bodyParser());

// DB CONFIG

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOURPASS",
    database: "todo_app"
})

connection.connect((error)=>{
    if (!error) console.log("Database succesfully connected")
    else console.log("Connection error")
})

// GET ALL TODO ITEMS
app.get("/todos/load", (req, res, next)=>{
    connection.query("select * from todo_items", (err, rows, fields)=>{
        if(!err) res.send(rows)
        else res.send(err)
    })
})

// GET SPECIFIC TODO ITEM
app.get("/todos/load/:id", (req, res, next)=>{
    connection.query("select * from todo_items where id = ?", req.params.id, (err, row, fields)=>{
        if(!err) res.send(row)
        else res.send(err)
    })    
})

// CREATE TODO ITEM
app.post("/todos/create", (req, res, next)=>{
    connection.query("insert into todo_items set ?", req.body, (err, result, fields)=>{
    if(!err) res.send(result)
    else res.send(err)
    })
})

// DELETE TODO ITEM
app.delete("/todos/delete/:id", (req, res, next)=>{
    connection.query("delete from todo_items where id = ?", req.params.id, (err, result, fields)=>{
        if(!err) res.send(`Todo item with id: ${req.params.id} succesfully deleted`)
        else res.send(err)
    })
})

// UPDATE TODO ITEM
app.put("/todos/update/:id", (req, res, next)=>{
    connection.query("update todo_items set text = ? where id = ?", [req.body.text, req.params.id], (err, result, fields)=>{
        if(!err) res.send(`Todo item with id: ${req.params.id} succesfully updated`)
        else res.send(err)
    })
})

// TAG TODO ITEM
app.post("/todos/tagTodoItem", (req, res, next)=>{
    connection.query("insert into todo_item_tag set ?", req.body, (err, result, fields)=>{
        if(!err) res.send(`Todo item succesfully tagged`)
        else res.send(err)
    })
})

// UNTAG TODO ITEM
app.delete("/todos/untagTodoItem/:id", (req, res, next)=>{
    connection.query("delete from todo_item_tag where todo_item_id = ?", [req.params.id], (err, result, fields)=>{
        if(!err) res.send(`Todo item with id: ${req.params.id} succesfully untagged`)
        else res.send(err)
    })
})

// MARK TODO ITEM AS COMPLETED
app.put("/todos/markCompleted/:id", (req, res, next)=>{
    connection.query("update todo_items set is_completed = true where id = ?", req.params.id, (err, result, fields)=>{
        if(!err) res.send(`Todo item with id: ${req.params.id} succesfully marked as completed`)
        else res.send(err)
    })
})

app.listen(port, ()=>{
    console.log(`Our server is running on port: ${port}`);
})
