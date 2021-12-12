function changeInput() {
    var form = document.getElementById("mainForm");
    form.innerHTML = "";
    
    var newFunction = document.getElementById("tutorial").value;

    if (newFunction == "snake") {
        var newText = 
            "<h1>Hello world</h1>";

        form.innerHTML = newText;
        form.setAttribute("method", "GET");
    }

    else if (newFunction == "breakout")
    {

    }
}
