var Sid; 
var username; 
var password; 

function clearHtml() { 
    document.getElementById("studentId").innerHTML = "";
    document.getElementById("studentName").innerHTML = "";
    document.getElementById("studentCollege").innerHTML = "";
}

var HttpClient = function() {
    this.get = function(aUrl, typeOfRequest, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        if(document.getElementById("usr").value != Sid && document.getElementById("usr").value != "") { 
            Sid = document.getElementById("usr").value;
        }

        // This is for card swiper
        var indexStart = Sid.indexOf("86"); 
        if(indexStart > 0 && Sid.length > 9) { 
            Sid = Sid.substring(indexStart, indexStart+9);
        }

        var myObject = {"SID": Sid};     
        anHttpRequest.open( typeOfRequest, `${aUrl}?sid=${encodeURIComponent(Sid)}`, true );
        anHttpRequest.send();
    }


}

function validateStudent() {
    clearHtml(); 

    // Making the HTTP Get Request
    var client = new HttpClient();
    // client.get('http://localhost:5000/ValidateStudent/', "GET", function(response) {
    client.get('https://api.asucrelections.org/ValidateStudent/', "GET", function(response) {
        // Response will be a json 
        var responseJson = JSON.parse(response);
        // console.log(responseJson.Student);

        if(responseJson.Student == 0) { 
            alert("Student Not Found! Please enter student ID manually.");
            return; 
        }

        // Outputing the results
        document.getElementById("usr").value = "";

        var studentId = document.createElement('p'); 
        studentId.innerHTML = Sid; 

        var studentName = document.createElement('p'); 
        studentName.innerHTML = responseJson.Student; 
        
        var studentCollege = document.createElement('p'); 
        studentCollege.innerHTML = responseJson.College; 

        // console.log("FHIWEHIHFEIH: " + responseJson.Student);
        if(responseJson.Student === -1) { 
            alert("Student already voted. Please deny any ballots"); 
        }
        else { 
            document.querySelector("#studentId").appendChild(studentId); 
            document.querySelector("#studentName").appendChild(studentName); 
            document.querySelector("#studentCollege").appendChild(studentCollege);
        }
    });
};


function confirmStudent() { 
    // var Name = document.getElementById("studentId").getAttribute("value");
    // console.log("Name: " + Sid);  

    var client = new HttpClient();  
    // client.get('http://localhost:5000/ConfirmVote/', "PUT", function(response) { 
    client.get('https://api.asucrelections.org/ConfirmVote/', "PUT", function(response) { 
        var responseJson = JSON.parse(response); 
        alert("VOTE CONFIRMED"); 
    });

    Sid = ""; 
    clearHtml(); 
};

function rejectStudent() {
    clearHtml(); 
    Sid = "";
    alert("Canceled"); 
 };
