function load() {
    var form = document.getElementById("mainForm");
    form.innerHTML = "";

    var newText = 
            "<label for='firstname'>Firstname:</label>" +
            "<input type='text' name='firstname' id='firstname'>" +
            "<label for='lastname'>Lastname:</label>" +
            "<input type='text' name='lastname' id='lastname'>" +
            "<input type='hidden' name='actionType' value='name'>" +
            "<input type='submit'>";

    form.innerHTML = newText;
    form.setAttribute("method", "GET");

}

function changeInput() {
    var form = document.getElementById("mainForm");
    form.innerHTML = "";
    
    var newFunction = document.getElementById("functions").value;

    if (newFunction == "password") {
        var newText = 
        "<label for='username'>Username:</label>" +
        "<input type='text' name='username' id='username' placeholder='Username' required>" +
        "<label for='password'>Password:</label>" +
        "<input type='password' name='password' id='password' placeholder='Password' required>" +
        "<input type='hidden' name='actionType' value='password'>" +
        " " +
        "<input type='submit'>";

        form.innerHTML = newText;
        form.setAttribute("method", "POST");
    }
}
