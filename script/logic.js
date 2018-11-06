// $(".submit").on("click", function(e) {
//   e.preventDefault();
//   var fr = new FileReader();
//   fr.onload = function () {
//     $("#fileContents").html(this.result)
//   }
//   fr.readAsText
// });

document.getElementById("openFile").addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    // document.getElementById("fileContents").textContent = this.result;
    console.log(this.result);
  }
  fr.readAsText(this.files[0]);
});