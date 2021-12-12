/*
    References:
        1) Prof. Wergeles' In-Class Notes
*/

function getContent() {
            
    var xmlHttp = new XMLHttpRequest();
    
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var response = xmlHttp.responseText;
            
            var contentBox = document.getElementById("contentBox");
            
            contentBox.innerHTML = response;     
        }
    };
    
    document.getElementById('contentBox').innerHTML = "Andrew Kim did!";
    
    xmlHttp.open("GET", "responder.php", true);
    
    xmlHttp.send();     
}
