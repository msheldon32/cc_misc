
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

function navigateToProtocol() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

      
    var chain = html_to_string(params.chain);
    var name = html_to_string(params.name);
    window.parent.location.href = `https://ccfrontend.herokuapp.com/#/protocol/${string_to_html(name)}/${string_to_html(chain)}`
}

function html_to_string(ihtml) {
    return ihtml;
}

function string_to_html(str) {
    return str;
}

function getCCProtocolData() {
    updateStyles();

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

    var ajaxreq = new XMLHttpRequest();
    var chain = html_to_string(params.chain);
    var name = html_to_string(params.name);

    console.log(`chain: ${chain}, name: ${name}`)

    
    
    var protocol_html = `https://fast-dawn-89938.herokuapp.com/https://ccbackendapi.herokuapp.com/api/protocol/chain=${string_to_html(chain)}&name=${string_to_html(name)}`;

    console.log(`protocol html: ${protocol_html}`)

      
    ajaxreq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var relevantElement = document.getElementById("cc_review_body");
            
            var json_res = JSON.parse(this.responseText);
                        
            relevantElement.querySelector("#cc_star_span").innerHTML = "";
            var rating = Math.round(json_res["details"]["overall_rating"]);
            
            for (var star_i = 0; star_i < rating; star_i += 1) {
                relevantElement.querySelector("#cc_star_span").innerHTML += "&#x2605;";
            }
            for (var star_i = rating; star_i < 5; star_i += 1) {
                relevantElement.querySelector("#cc_star_span").innerHTML += "&#x2606;";
            }
            relevantElement.querySelector("#cc_nreviews").innerHTML = `(${json_res["details"]["number_of_reviews"]})`;
            relevantElement.querySelector("#cc_nreviews").innerHTML = `(${json_res["details"]["number_of_reviews"]})`;
            relevantElement.querySelector("#review_name").innerHTML = json_res["name"]
        }
    }

    ajaxreq.open("GET", protocol_html);
    ajaxreq.send();
}