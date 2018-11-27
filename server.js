const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const PDFParser = require("j-pdfjson");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const pdfUtil = require("pdf-to-text");

const port = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var data = "";

app.post("/sendPDF", upload.single("pdfFile"), function(req, res, next) {
  data = "";
  var fileName = "./uploads/" + req.body.fileName;
  var path = "./" + req.file.path;
  // console.log(fileName);
  fs.rename(path, fileName, function(err) {
    if (err) throw err;
  });
  pdfUtil.pdfToText(fileName, function(err, pdf) {
    if (err) throw err;
    var regex = /(October \d+[1 - 31])/g;
    var temp = pdf.match(regex);
    // console.log(temp)
    var value = [...new Set(temp)]
    // console.log(value)
    var test = pdf.search(value[1]);
    var test1 = pdf.search(value[2]);
    // console.log(test, test1)
    data = pdf.substring(test, test1);
    // console.log(data)
    res.json(data)
  });
});

app.get("/getPDF", function (req, res) {
  console.log(data);
  res.json(data)
})

// findingDate();

// test();

function test() {
  pdfUtil.pdfToText("./NYUSyllabus.pdf", function(err, data) {
    if (err) throw err;
    var regex = /(October \d+[1 - 31])/g;
    var temp = data.match(regex);
    console.log(temp)
    var value = [...new Set(temp)]
    console.log(value)
    var test = data.search(value[2]);
    var test1 = data.search(value[3]);
    console.log(test, test1)
    console.log(data.substring(test, test1));
  });
}

function findingDate() {
  var pdfParser = new PDFParser(this, 1);
  fs.readFile("./NYUSyllabus.pdf", (err, pdfBuffer) => {
    if (!err) {
      pdfParser.parseBuffer(pdfBuffer);
    }
  });

  pdfParser.on("pdfParser_dataError", errData =>
    console.error(errData.parserError)
  );

  pdfParser.on("pdfParser_dataReady", pdfData => {
    var test = pdfParser.getRawTextContent().indexOf("page");
    console.log(test);
    console.log(pdfParser.getRawTextContent().substring(test - 10, test + 10));

    // console.log("TEST", pdfParser.getRawTextContent());
  });
}

app.get("/getPdf", function(req, res) {
  res.json("sending pdf");
});

app.listen(port, function() {
  console.log(`App listening on port ${port}`);
});

