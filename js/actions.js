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
    }, 2000);
}


/*********************************************************** */
 
 function guardaformulariUsuari(){
 
   var nompers = document.getElementById("id_persona").value;
   var ubi = document.getElementById("origen").value;
   var hasCar = document.getElementById("hasCar").value;
   var numPlaces, cartype;
 
   if(hasCar){
     cartype = document.getElementById("carType").value;
     numPlaces = document.getElementById("numPlaces").value
   }
   else {
     cartype = null;
     numplaces = null;
   }
 
   firebase.database().ref("/persona").once('value').then(function(persona) {
     var pers = persona.val();
     
     firebase.database().ref('/persona/' + pers.length).set({
       id_persona: nompers,
       origen: ubi,
       hasCar: hasCar,
       cartype
     });
   })
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
    }