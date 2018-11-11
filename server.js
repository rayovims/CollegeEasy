const express = require("express");
const bodyParser = require("body-parser");
const pdfUtil = require("pdf-to-text");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const port = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.post("/sendPDF", upload.single("pdfFile"), function(req, res, next) {
    let path = "./" + req.file.path;

    pdfUtil.pdfToText(path, function(err, pdfFile) {
        console.log(pdfFile);
      });
});

app.get("/getPdf", function(req, res) {
  res.json("sending pdf");
});

app.listen(port, function() {
  console.log(`App listening on port ${port}`);
});
