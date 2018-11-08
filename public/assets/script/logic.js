// function upload() {
//   var form = $("#id_form")[0];
//   var data = new FormData(form);
//   $.ajax({
//     type: "POST",
//     enctype: "multipart/form-data",
//     url: "/sendPDF",
//     data: data,
//     processData: false, 
//     contentType: false,
//     cache: false,
//     dataType: "json",
//     success: function(e) {
//       $("#result").text(data);
//       alert("Success");
//     },
//     error: function(e) {
//       $("#result").text(e.responseText);
//       alert("Error");
//     },
//     complete: function() {
//       alert("Complete");
//     }
//   });
// }

document.getElementById("pdfFile").addEventListener("change", function(e) {
  let file = e.target.files[0];

  console.log(file);

  const data = new FormData();
  data.append("file", file);

  var request = new XMLHttpRequest();
  request.open("POST", "/sendPDF");
  request.send(file);
})

// document.querySelector("#pdf-upload").addEventListener("change", function(e){
// 	var canvasElement = document.querySelector("canvas")
// 	var file = e.target.files[0]
// 	if(file.type != "application/pdf"){
// 		console.error(file.name, "is not a pdf file.")
// 		return
// 	}
	
// 	var fileReader = new FileReader();  

// 	fileReader.onload = function() {
// 		var typedarray = new Uint8Array(this.result);

// 		PDFJS.getDocument(typedarray).then(function(pdf) {
// 			// you can now use *pdf* here
// 			console.log("the pdf has ",pdf.numPages, "page(s).")
// 			pdf.getPage(pdf.numPages).then(function(page) {
// 				// you can now use *page* here
// 				var viewport = page.getViewport(2.0);
// 				var canvas = document.querySelector("canvas")
// 				canvas.height = viewport.height;
// 				canvas.width = viewport.width;


// 				page.render({
// 					canvasContext: canvas.getContext('2d'),
// 					viewport: viewport
// 				});
// 			});

// 		});
// 	};

// 	fileReader.readAsArrayBuffer(file);
// })
