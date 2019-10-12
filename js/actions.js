$.getJSON("data.json", function(json){
    document.getElementById("cac").innerHTML(json.cotxe[0].id_persona);

})

