const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
    res.send("The server is running");
})

app.listen(3000, () => {
    console.log("The server is running on port 3000");
})