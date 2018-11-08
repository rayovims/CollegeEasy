const express = require("express");
const bodyParser = require("body-parser");
const { parse } = require("querystring");
var pdfreader = require("pdfreader");

const port = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.post("/sendPDF", function(req, res) {
  //   let body = "";

  req.on("data", chunk => {
    // body += chunk.toString('utf8');
    // new PdfReader().parseBuffer(chunk, function(err, item) {
    //   console.log(item.text);
    // });
    console.log(chunk.toString());
    // pdfConverter(chunk)
  });
});

function pdfConverter(pdfFile) {
  const nbCols = 2;
  const cellPadding = 40; // each cell is padded to fit 40 characters
  const columnQuantitizer = item => parseFloat(item.x) >= 20;

  const padColumns = (array, nb) =>
    Array.apply(null, { length: nb }).map((val, i) => array[i] || []);
  // .. because map() skips undefined elements

  const mergeCells = cells =>
    (cells || [])
      .map(cell => cell.text)
      .join("") // merge cells
      .substr(0, cellPadding)
      .padEnd(cellPadding, " "); // padding

  const renderMatrix = matrix =>
    (matrix || [])
      .map((row, y) =>
        padColumns(row, nbCols)
          .map(mergeCells)
          .join(" | ")
      )
      .join("\n");

  var table = new pdfreader.TableParser();

  new pdfreader.PdfReader().parseBuffer(pdfFile, function(err, item) {
    if (!item || item.page) {
      // end of file, or page
      console.log(renderMatrix(table.getMatrix()));
      console.log("PAGE:", item.page);
      table = new pdfreader.TableParser(); // new/clear table for next page
    } else if (item.text) {
      // accumulate text items into rows object, per line
      table.processItem(item, columnQuantitizer(item));
    }
  });
}

app.get("/getPdf", function(req, res) {
  res.json("sending pdf");
});

app.listen(port, function() {
  console.log(`App listening on port ${port}`);
});
