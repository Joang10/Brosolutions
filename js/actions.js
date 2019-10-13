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
    if(checkbox.checked){
        modal.classList.remove("invisible");
        document.getElementById("fromnocar").classList.add("invisible");
    }
    else{
        modal.classList.add("invisible");
        document.getElementById("fromnocar").classList.remove("invisible");
    }
};

function prepareSearch(){
    $('.ui.search').search({source: content});
}

function showModal1(){
    $('.ui.modal').modal('show');
}

function reservationOk(){
    var hasCar = document.getElementById("hasCar").checked;
    if(!hasCar){
        document.getElementById("resOkMessage").classList.remove("invisible");
        setTimeout(function () {
            document.getElementById("resOkMessage").classList.add("invisible");
            redirect();
        }, 3000);
    }

    
}


/*********************************************************** */
 
 function guardaformulariUsuari(){
 
   var nompers = document.getElementById("id_persona").value;
   var ubi = document.getElementById("origen").value;
   var hasCar = document.getElementById("hasCar").checked;
   var event = document.getElementById("event").value;
   var seat, cartype, from;
 
    firebase.database().ref("/master").set({
        name: nompers,
        event: event
    });

   if(hasCar){
       console.log("Has car");
     cartype = document.getElementById("carType").value;
     seat = document.getElementById("seat").value
     from = document.getElementById("carFrom").value;
     ubi = -1;

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
        origen: ubi,
        hasCar: hasCar
      });
      
    });

 }

 function guardaformulariEvent(){ 
   var id_ev = document.getElementById("id_event").value;
   var descripcio_ev = document.getElementById("descripcio").value;
   var lloc_ev = document.getElementById("eventPlace").value;
   var date_ev = document.getElementById("eventDate").value;
 
   firebase.database().ref("/event").once('value').then(function(event){
     var even = event.val();
     
      firebase.database().ref('/event/' + even.length).set({
        id_event: id_ev,
        descripcio: descripcio_ev,
        lloc: lloc_ev,
        date: date_ev
      });
    });
 
  document.getElementById("newEventForm").classList.add("invisible");
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

    function redirect() {
        window.location.href="validatecar.html";
        return false;
      }


function actualitzaEventMaster(){
    var nouEvent = document.getElementById("event").value;
    firebase.database().ref("/master").set({
        event: nouEvent
    });
    carregaOrigensFormulari();
}
          
function generaCotxesPossibles (){
    var id = null;
    var eventid = null;
    firebase.database().ref("/master").once('value').then(function(master){
        var mast = master.val();
        id = mast.name;
        eventid = mast.event;
    });

    console.log(id);

    var l = [];
    firebase.database().ref("/").once('value').then(function(db){
      var db = db.val();
      var orig;
  
      for (var i = 0; i < db.persona.length; ++i){
        var pers = db.persona[i].id_persona;
        if (pers == id) orig = db.persona[i].origen;
      }
        
        
      for (var i = 0; i < db.car.length; ++i){
        if(db.car[i].eventId == eventid){
          if (orig == db.car[i].Origen && db.car[i].seat > 0){
            l.push(db.car[i]);
          }
        }
      }

      var auxE = [];
      var auxH = [];
      var auxB = [];
      var auxC = [];
      for(var i = 0; i < l.length; ++i){
        if(l[i].tipus == "Electric"){
          auxE.push(l[i]);
        }
        else if(l[i].tipus == "Hybrid"){
          auxH.push(l[i]);
        }
        else if(l[i].tipus == "B"){
          auxB.push(l[i]);
        }
        else{
          auxC.push(l[i]);
        }
      }

      //auxE.concat(auxH.concat(auxB.concat(auxC)));
      auxB = auxB.concat(auxC);
      auxH = auxH.concat(auxB);
      auxE = auxE.concat(auxH);
      l = auxE;

    for (var i = 0; i < l.length; ++i){
        var card = $("<div>");
        card.addClass("ui card");
        card.attr("id", l[i].id_persona);
            
            var imatge = $("<div>");
            imatge.addClass("image");
                var img = $("<img>");
                img.attr("src","https://api.adorable.io/avatars/285/"+i+".png");
                imatge.append(img);

            var content = $("<div>");
            content.addClass("content");
                var head = $("<a>");
                head.addClass("header");
                head.text(l[i].id_persona);
                var meta = $("<div>");
                meta.addClass("meta")
                    var span = $("<span>")
                    span.addClass("date")
                    span.text(l[i].eventId)
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
                bottom.attr("id", l[i].id_persona);
                bottom.attr("onclick", "reservaseient(this);");
        card.append(imatge);
        card.append(content);
        card.append(bottom);
        console.log(card);
        $("#card-cont-availablecars").append(card);   
            
    }
});
}
  
function reservaseient (elem){ //funcio reserva seient amb el nom del conductor com a paràmetre
    firebase.database().ref("/").once('value').then(function(db){
      var nomPas = null;
      var db = db.val();
      nomPas = db.master.name;
      for (var i = 0; i < db.car.length; ++i){
        if (db.car[i].id_persona == elem.id){
            var updates = {};
            updates['/car/' + i + '/seat'] = db.car[i].seat - 1;
            return firebase.database().ref().update(updates);
        }
        afegeixpassetger(elem.id, nomPas);
    }
    });
  }
  
  function afegeixpassetger (conductor,passetger){ //funcio que afegeix un passetger al cotxe amb conductor 

    firebase.database().ref("/").once('value').then(function(db){
      var db = db.val();
      for (var i = 0; i < db.car.length; ++i){
        if (db.car[i].id_persona == conductor && db.car[i].seat > 0){
         /* firebase.database().ref('/car/group/' + car[i].group.length).set({
            nom = passetger;
          });*/
          var updates = {};
          if (db.car[i].group == null) updates['/car/'+i+'/group/'+0] = passetger;
          else updates['/car/'+i+'/group/'+db.car[i].group.length] = passetger;
          return firebase.database().ref().update(updates);
        }
      }
    });

    successAddingGroup();
  }

function successAddingGroup(){
    document.getElementById("card-cont-availablecars").classList.add("invisible");
    document.getElementById("success-assign").classList.remove("hidden");
    
    setTimeout(function () {
      window.location.href="MyTars.html";
  }, 3000);


}
  function seleccionacotxe(id){
    l = generaCotxesPossibles(id);
  
  }


  function carregaOrigensFormulari(){
    var eventid = null;
    firebase.database().ref("/master").once('value').then(function(master) {
      var mast = master.val();
      eventid = mast.event;
    });
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
        if(!found && cars[i].eventId == eventid && cars[i].seat > 0){
          res.push(cars[i].Origen);
        }
      }

      var selectobject = document.getElementById("origen");
      for(var s in selectobject){
        selectobject.remove(s);
      }

      for(var r = 0; r < res.length; ++r){
        var lloc = $("<option>");
        lloc.text(res[r]);
        lloc.val(res[r]);
        $("#origen").append(lloc);
      }
    });
  } 


  function deleteTar (elem){
    var x = elem.pare
    for(a in elem){
      elem.remove(a);
    }
  }


  function generateMyTars(){
    var nom = null;
    firebase.database().ref("/master").once('value').then(function(master) {
      var mast = master.val();
      nom = mast.name;
    });
    firebase.database().ref("/car").once('value').then(function(car) {
      var cars = car.val();
  
      l = [];
  
      for (var i = 0; i < cars.length; ++i){
        if (cars[i].group != null){
          for (var j = 0; j < cars[i].group.length; ++j){
            if (cars[i].group[j] == nom) l.push(cars[i]);
          }
        }
      }
      console.log(l);
  
      for (var i = 0; i < l.length; ++i){
          var ui = $("<div>");
          ui.addClass("ui cards");
            var card = $("<div>");
            card.addClass("card");
  
            var content  = $("<div>");
            content.addClass("content");
  
              var img = $("<img>");
              img.attr("src", "https://api.adorable.io/avatars/52/3.png");
              img.addClass("right floated mini ui image");
              content.append(img);
  
              var header = $("<div>");
              header.addClass("header");
              header.text(l[i].eventId);
              content.append(header);
  
              var meta = $("<div>");
              meta.addClass("meta");
              meta.text(l[i].id_persona);
              content.append(meta);
  
              var descript = $("<div>");
              descript.addClass("description");
              descript.text("I accep t pets. Smoking not allowed. " + l[i].tipus + " car.");
              content.append(descript);
  
            card.append(content);
  
              var extra = $("<div>");
              extra.addClass("extra content");
  
                var two = $("<div>");
                two.addClass("ui two buttons");
  
                var basicred = $("<div>");
                basicred.addClass("ui basic red button");
                basicred.text("Cancel");
                extra.append(two);
                extra.append(basicred);
                card.append(extra);
              ui.append(card);
              ui.attr("onclick", "deleteTar(this)");
          $("#myTars").append(ui);        
      }
    });
  }

function formNewEvent(){
   console.log("hola");
   document.getElementById("eventsForm").classList.remove("invisible");
 }