const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const PDFParser = require("j-pdfjson");
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

  var pdfParser = new PDFParser(this, 1);
  fs.readFile(path, (err, pdfBuffer) => {
    if (!err) {
      pdfParser.parseBuffer(pdfBuffer);
    }
  });

  pdfParser.on("pdfParser_dataError", errData =>
    console.error(errData.parserError)
  );
  pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log(pdfParser.getRawTextContent());
  });
});

app.get("/getPdf", function(req, res) {
  res.json("sending pdf");
});

app.listen(port, function() {
  console.log(`App listening on port ${port}`);
});
