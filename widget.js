
var relevantElements = [];
function updateStyles() {
    var head = document.head;
    var anaheimLink = document.createElement("link");

    anaheimLink.type = "text/css";
    anaheimLink.rel = "stylesheet";
    anaheimLink.href = "https://fonts.googleapis.com/css2?family=Anaheim&display=swap";

    head.appendChild(anaheimLink);
    
    var styleLink = document.createElement("link");

    styleLink.type = "text/css";
    styleLink.rel = "stylesheet";
    styleLink.href = "https://ccmisc.herokuapp.com/widget.css";

    head.appendChild(styleLink);


}

function getCCProtocolData() {
    updateStyles();

    relevantElements = document.getElementsByClassName("cc_review_body");
    console.log("get protocol data...");
    for (var i = 0; i < relevantElements.length; i++) {
        var ajaxreq = new XMLHttpRequest();
        var chain = relevantElements[i].parentElement.getAttribute("protocol_chain");
        var name = relevantElements[i].parentElement.getAttribute("protocol_name");
        var protocol_html = `https://fast-dawn-89938.herokuapp.com/https://ccbackendapi.herokuapp.com/api/protocol/chain=${chain}&name=${name}`;
        
        ajaxreq.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("request came...");
                var json_res = JSON.parse(this.responseText);
                for (var i = 0; i < relevantElements.length; i++) {
                    if (relevantElements[i].parentElement.getAttribute("protocol_chain") == json_res["chain"] &&
                        relevantElements[i].parentElement.getAttribute("protocol_name")  == json_res["name"]) {
                            
                        relevantElements[i].querySelector("#cc_star_span").innerHTML = "";
                        var rating = Math.round(json_res["details"]["overall_rating"]);
                        
                        for (var star_i = 0; star_i < rating; star_i += 1) {
                            relevantElements[i].querySelector("#cc_star_span").innerHTML += "&#x2605;";
                        }
                        for (var star_i = rating; star_i < 5; star_i += 1) {
                            relevantElements[i].querySelector("#cc_star_span").innerHTML += "&#x2606;";
                        }
                        relevantElements[i].querySelector("#cc_nreviews").innerHTML = `(${json_res["details"]["number_of_reviews"]})`;
                        relevantElements[i].querySelector("#cc_nreviews").innerHTML = `(${json_res["details"]["number_of_reviews"]})`;
                        relevantElements[i].querySelector("#review_name").innerHTML = json_res["name"]
                    }
                }
            }
        }

        ajaxreq.open("GET", protocol_html);
        ajaxreq.send();
    }
}