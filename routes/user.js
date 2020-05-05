// load our app server using express somehow..
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "hongik",
    port: 3306,
    database: "ZOODB",
});

const getConnection = () => pool;
router.post("/user_create", (req, res) => {
    const name = req.body.name;
    const sing = req.body.sing;
    let queryString = "INSERT INTO animals (sing, name) VALUES (?,?);";
    const connection = getConnection();
    connection.query(queryString, [sing, name], (err, results, fields) => {
        if (!err) {
            res.redirect("/users");
        } else {
            console.log("fail to insert new user : " + err);
            return;
        }
    });
});

router.get("/user/:id", (req, res) => {
    console.log("fetching user with id : " + req.params.id);
    const connection = getConnection();
    const userId = req.params.id;
    let queryString = "SELECT * FROM animals WHERE animal_id=?";
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log("fail" + err);
            res.sendStatus(500);
            res.end();
            return;
        }
        console.log("we fetch users successfully");

        const users = rows.map((row) => {
            return { name: row.name, sing: row.sing };
        });

        res.json(users);
    });
});

router.get("/users", (req, res) => {
    console.log("fetching user with id : " + req.params.id);
    const connection = getConnection();
    const userId = req.params.id;
    let queryString = "SELECT * FROM animals";
    connection.query(queryString, [], (err, rows, fields) => {
        if (err) {
            console.log("fail" + err);
            res.sendStatus(500);
            res.end();
            return;
        }
        console.log("we fetch users successfully");

        const users = rows.map((row) => {
            return { name: row.name, sing: row.sing };
        });

        res.json(users);
    });
});

module.exports = router;