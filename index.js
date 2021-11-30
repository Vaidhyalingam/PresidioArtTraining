const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
  host: "database-1.cs4oxe7vc7dc.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "userDataBase",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection error...\n", err);
  } else {
    console.log("Database Connected...");
  }
});

//Get All user Data
app.get("/user", (req, res) => {
  let query = "SELECT * FROM users";
  db.query(query, (err, result) => {
    if (err) {
      console.log("Database Connection error...\n", err);
    }
    if (result.length > 0) {
      res.send({
        message: "All User Data",
        data: result,
      });
    }
  });
});

//Get Single user Data
app.get("/user/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT * FROM users WHERE id = ${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Database Connection error...\n", err);
    }
    if (result.length > 0) {
      res.send({
        message: "Single User Data using id",
        data: result,
      });
    } else {
      res.send({
        message: "User does not exist",
      });
    }
  });
});

//Insert Data
app.post("/user", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let mobile = req.body.mobile;
  let query = `INSERT into users (name, email, mobile) 
                VALUES ('${name}', '${email}', '${mobile}')`;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Database Connection error...\n", err);
    } else {
      res.send({
        message: "User added successfully!!",
      });
    }
  });
});

//Modify Data
app.put("/user/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let mobile = req.body.mobile;
  let query = `UPDATE users set name = '${name}', email = '${email}', 
                mobile = '${mobile}' WHERE id = ${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log("User does not exist", err);
    } else {
      res.send({
        message: "User modified successfully!!",
      });
    }
  });
});

app.delete("/user/:id", (req, res) => {
  let id = req.params.id;
  let query = `DELETE from users WHERE id = ${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log("User does not exist", err);
    } else {
      res.send({
        message: "User deleted successfully!!",
      });
    }
  });
});

app.listen(80, () => {
  console.log("Server listening on port 3000");
});
