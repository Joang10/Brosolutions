var firebaseConfig = {
    apiKey: "AIzaSyBrK2n7MpNtBgHeVQ5M03qvUTMxXCsZIB0",
    authDomain: "brosolutions-c4547.firebaseapp.com",
    databaseURL: "https://brosolutions-c4547.firebaseio.com",
    projectId: "brosolutions-c4547",
    storageBucket: "brosolutions-c4547.appspot.com",
    messagingSenderId: "873474467213",
    appId: "1:873474467213:web:cb8bf18e284593f7f5c9c4"
 };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   // Get a reference to the storage service, which is used to create references in your storage bucket
   var database = firebase.database();

   function init(){
    prepareSearch();
    generateEventCards();
}
init();

function showCarModal(){
    var checkbox = document.getElementById("hasCar");
    var modal = document.getElementById("hasCarModal");

    if(checkbox.checked) modal.classList.remove("invisible");
    else modal.classList.add("invisible");
};



var content = [
    { title: 'Sonar' },
    { title: 'Oktoberfest' },
    { title: 'HackUPC' },
    { title: 'Dia de la Hispanidad' },
    { title: 'Anguilla' },
    { title: 'Albania' },
    { title: 'Armenia' },
    { title: 'Netherlands Antilles' },
    { title: 'Angola' },
    { title: 'Argentina' },
    { title: 'American Samoa' },
    { title: 'Austria' },
    { title: 'Australia' },
    { title: 'Aruba' },
    { title: 'Aland Islands' },
    { title: 'Azerbaijan' },
    { title: 'Bosnia' },
    { title: 'Barbados' },
    { title: 'Bangladesh' },
    { title: 'Belgium' },
    { title: 'Burkina Faso' },
    { title: 'Bulgaria' },
    { title: 'Bahrain' },
    { title: 'Burundi' }
    // etc
  ];

document.ready
function prepareSearch(){
    $('.ui.search').search({source: content});
}

function showModal1(){
    $('.ui.modal').modal('show');
}

function reservationOk(){
    document.getElementById("resOkMessage").classList.remove("invisible");
    setTimeout(function () {
        document.getElementById("resOkMessage").classList.add("invisible");
        redirect();
    }, 3000);
}


/*********************************************************** */
 
 function guardaformulariUsuari(){
 
   var nompers = document.getElementById("id_persona").value;
   var ubi = document.getElementById("origen").value;
   var hasCar = document.getElementById("hasCar").checked;
   var event = document.getElementById("event").value;
   var seat, cartype, from;
   console.log("HASCAR? " + hasCar);
 
   if(hasCar){
       console.log("Has car");
     cartype = document.getElementById("carType").value;
     seat = document.getElementById("seat").value
     from = document.getElementById("carFrom").value;

     firebase.database().ref("/car").once('value').then(function(car) {
      var cars = car.val();
      
      firebase.database().ref('/car/' + cars.length).set({
        id_persona: nompers,
        Origen: from,
        seat: seat,
        tipus: cartype,
        eventId: event,
      });
      
    });
   }
   else {
     cartype = null;
     seat = null;
     from = null;
    }
    
    firebase.database().ref("/persona").once('value').then(function(persona) {
      var pers = persona.val();
      
      firebase.database().ref('/persona/' + pers.length).set({
        id_persona: nompers,
        origen: ubi
      });
      
    });

 }
 
 function guardaformulariEvent(){
 
   var id_ev = document.getElementById("id_event").value;
   var descripcio_ev = document.getElementById("descripcio").value;
   var lloc_ev = document.getElementById("lloc").value;
   var date_ev = document.getElementById("date").value;
 
   firebase.database().ref("/event").once('value').then(function(event) {
     var even = event.val();
     
     firebase.database().ref('/event/' + even.length).set({
       id_event: id_ev,
       descripcio: descripcio_ev,
       lloc: lloc_ev,
       date: date_ev
     });
   })
 
 }
 
 function writeUserData(userId, name, email, imageUrl) {
   firebase.database().ref('cotxe/' + userId).set({
     username: name,
     email: email,
     profile_picture : imageUrl
   });
 }
 
 function generateEventCards(){
   firebase.database().ref("/event").once('value').then(function(event) {
     var events = event.val();
 
     for (var i = 0; i < events.length; ++i){
       var card = $("<div>");
       card.addClass("ui card");

            var contdiv = $("<div>");
            contdiv.addClass("content");
           
                var content = $("<div>");
                content.addClass("header");
                content.text(events[i].eventId);
                contdiv.append(content);

                content = $("<div>");
                content.addClass("description");
                    var par = $("<p>");
                    par.text(events[i].descripcio);
                    content.append(par);
                contdiv.append(content);
 
                var ubi = $("<p>");
                ubi.text(events[i].lloc);
                contdiv.append(ubi);

                content = $("<div>");
                content.addClass("date");
                content.text(events[i].date);
                contdiv.append(content);
 
            card.append(contdiv);
            card.attr("onclick", "showModal1()");
       $("#contenidor-targetes").append(card);
     }
   });
 }
 
 function generateCarCards(){
    firebase.database().ref("/car").once('value').then(function(car) {
      var cars = car.val();
  
      for (var i = 0; i < cars.length; ++i){
        var card = $("<div>");
        card.addClass("ui card");
            
        var content = $("<div>");
        content.addClass("id");
        content.text(cars[i].id_persona);
        card.append(content);
  
        content = $("<div>");
        content.addClass("tipus");
        content.text(cars[i].tipus);
        card.append(content);
  
        content = $("<div>");
        content.addClass("seat");
        content.text(cars[i].seat);
        card.append(content);
  
        content = $("<div>");
        content.addClass("Origen");
        content.text(cars[i].Origen);
        card.append(content);
  
        card.append($("<p>"));
  
        $("#prova").append(card);
      }
    });
  }

  /*   
function generaCotxesPossibles (id){
    firebase.database().ref("/").once('value').then(function(db){
        var db = db.val();
        for (var i = 0; i < db.car.length; ++i){
        var ciutatuser = db.persona[id].origen;
        }
    
        var l = [];
    
        for (var i = 0; i < db.car.length; ++i){
            if (db.car[i].Origen === ciutatuser && db.car[i].seat > 0){
                l.push(db.car[i]);
            }
        }
    });

    for (var i = 0; i < l.length; ++i){
        var card = $("<div>");
        card.addClass("ui card");
            
            var imatge = $("<div>");
            imatge.addClass("image");
                var img = $("img");
                img.src("https://i.pravatar.cc/300");
                imatge.append(img);

            var content = $("<div>");
            content.addClass("content");
                var head = $("<a>");
                head.addClass("header");
                head.text("Sónar");
                var meta = $("<div>");
                meta.addClass("meta")
                    var span = $("<span>")
                    span.class("date")
                    span.text(l[i].id_persona)
                    meta.append(span);
                var descr = $("<div>");
                descr.addClass("description");
                descr.text("Car type: " + l[i].tipus + " Free seats:" + l[i].seat);
            content.append(head);
            content.append(meta);
            content.append(descr);
            var bottom = $("<div>");
            bottom.addClass("ui bottom attached button");
                var icon = $("<i>")
                icon.addClass("add icon");
                bottom.append(icon)
                bottom.text("Select this car.");
        card.append(imatge);
        card.append(content);
        card.append(bottom);            
            
    }

   
    <div class="ui card">
        <div class="image">
            <img src="https://i.pravatar.cc/300">
        </div>
        <div class="content">
            <a class="header">Sónar</a>
            <div class="meta">
                <span class="date">Driver Name</span>
            </div>
            <div class="description">
            Tinc sida i l'encomano a tothom jeje.
            </div>
        </div>
        <div class="ui bottom attached button">
            <i class="add icon"></i>
            Select this car
        </div>
    </div>
    
}
    */

    function redirect() {
        window.location.href='validatecar.html';
        return false;
      }



          
function generaCotxesPossibles (id){
    var l = [];
    firebase.database().ref("/").once('value').then(function(db){
      var db = db.val();
      var orig;
      console.log(db.car.length)
  
      for (var i = 0; i < db.persona.length; ++i){
        var pers = db.persona[i].id_persona;
        if (pers == id) orig = db.persona[i].origen;
      }
        
        
      for (var i = 0; i < db.car.length; ++i){
        if (orig == db.car[i].Origen && db.car[i].seat > 0){
          l.push(db.car[i]);
        }
      }


    for (var i = 0; i < l.length; ++i){
        var card = $("<div>");
        card.addClass("ui card");
            
            var imatge = $("<div>");
            imatge.addClass("image");
                var img = $("<img>");
                img.attr("src","https://i.pravatar.cc/300");
                imatge.append(img);

            var content = $("<div>");
            content.addClass("content");
                var head = $("<a>");
                head.addClass("header");
                head.text("Sónar");
                var meta = $("<div>");
                meta.addClass("meta")
                    var span = $("<span>")
                    span.addClass("date")
                    span.text(l[i].id_persona)
                    meta.append(span);
                var descr = $("<div>");
                descr.addClass("description");
                descr.text("Car type: " + l[i].tipus + " Free seats:" + l[i].seat);
            content.append(head);
            content.append(meta);
            content.append(descr);
            var bottom = $("<div>");
            bottom.addClass("ui bottom attached button");
                var icon = $("<i>")
                icon.addClass("add icon");
                bottom.append(icon)
                bottom.text("Select this car.");
        card.append(imatge);
        card.append(content);
        card.append(bottom);
        console.log(card);
        $("#card-cont-availablecars").append(card);    
            
    }
    });
}
  
  function reservaseient (id_cotxe){
    firebase.database().ref("/").once('value').then(function(db){
      var db = db.val();
      for (var i = 0; i < db.car.length; ++i){
        if (db.car[i].id_persona == id_cotxe) seat = seat - 1;
      }
    });
  }
  
  function seleccionacotxe(id){
    l = generaCotxesPossibles(id);
  
  }


  function carregaOrigensFormulari(){
    firebase.database().ref("/car").once('value').then(function(car) {
      var cars = car.val();
      var res = [];
      for (var i = 0; i < cars.length; ++i){
        var found = false;
        for (var j = 0; j < res.length; ++j){
          if(cars[i].Origen == res[j]){
            found = true;
          }
        }
        if(!found){
          res.push(cars[i].Origen);
        }
      }
      for(var r = 0; r < res.length; ++r){
        var lloc = $("<option>");
        lloc.text(res[r]);
        lloc.val(res[r]);
        $("#origen").append(lloc);
      }
    });
  }