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




$document.ready(function prepareSearch(){
    $('.ui.search').search({source: content});
});


/*********************************************************** */
 

 
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