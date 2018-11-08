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
