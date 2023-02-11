//jshint esversion: 6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const apiKey = "enter your mailchimp api key";
const listId = "enter your mailchimp list id or audience id";
const https = require("https");
const { post } = require("request");
const { json } = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailInput = req.body.emailInput;

    const data = {
        members: [
            {
                email_address: emailInput,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
	                LNAME: lastName,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://enterYourDataCenterNumber.api.mailchimp.com/3.0/lists/enterYourListId"
    const options = {
        method: "POST",
        auth: "xr:enterYourApiKey"
    }

    const request = https.request(url, options, (response) => {
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();

})

app.post("/failure", (res, req, next) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("The server is running on port 3000");
})