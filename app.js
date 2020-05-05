// load our app server using express somehow..
const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const router = require("./routes/user");

app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("short"));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.end("hello jasmine");
});

app.listen(3000, () => {
    console.log("server is running");
});