$("#submit").on("click", function (e) {
    e.preventDefault();

    var form = document.getElementById('form');
    var formData = new FormData(form);
    var fileName = document.getElementById("fileName").value;
    console.log(fileName)
    formData.append("fileName", fileName);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/sendPDF", true);
    xhr.send(formData);
})