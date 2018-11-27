$("#submit").on("click", function(e) {
  e.preventDefault();

  var form = document.getElementById("form");
  var formData = new FormData(form);
  var fileName = document.getElementById("fileName").value;
  console.log(fileName);
  formData.append("fileName", fileName);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/sendPDF", true);
  xhr.send(formData);

  // If specified, responseType must be empty string or "text"
  xhr.responseType = "text";

  xhr.onload = function() {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        // console.log(xhr.response);
        $("#text").html(xhr.responseText);
      }
    }
  };

  // $.ajax({
  //     url: "/getPDF",
  //     method: "GET"
  // }).then(function(res){
  //     console.log(res)
  // })
});
