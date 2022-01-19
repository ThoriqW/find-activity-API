const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

let participants = ""
let typeActivity = ""

let listActivity = [];

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get("/", function (req, res) {
    res.render("formInput");
})

app.post("/", function (req, res) {

    // get data from forminput 
    participants = req.body.participants;

    typeActivity = req.body.typeActivity;

    // Refresh Array
    listActivity = [];

    res.redirect("/activity")
})

app.get("/activity", function (req, res) {

    // URL HTTP Bored API
    const url = `https://www.boredapi.com/api/activity?participants=${participants}&type=${typeActivity}`;

    // Get Data HTTP From API
    https.get(url, function (resp) {

        console.log(resp.statusCode);

        console.log(typeActivity);
        
        // Refresh Array
        listActivity = [];

        resp.on("data", function (data) {
            const activityData = JSON.parse(data);
            console.log(activityData);

            // check length object activity data
            if(Object.keys(activityData).length > 1) {
                listActivity.push(activityData.activity)
                listActivity.push(activityData.type)
                listActivity.push(activityData.participants)
                listActivity.push(activityData.accessibility)
            } else {
                listActivity.push(activityData.error)
            }
            console.log(listActivity)
            res.render("activity", {
                activityText: listActivity
            });
        })

    });
});

app.listen(3000, function () {
    console.log("Starting...")
});
