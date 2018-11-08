const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.post("/sendPDF", function(req, res) {
    console.log(req.body)
    console.log("getting pdf")
});

app.get("/getPdf", function (req, res) {
    res.json("sending pdf")
})

app.listen(port, function() {
    console.log(`App listening on port ${port}`)
})