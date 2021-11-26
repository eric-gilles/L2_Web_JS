// pas d'import ni require (sans node.js) donc nommage complet

// création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [new ol.layer.Tile({source: new ol.source.OSM()})],
    view: new ol.View({center: ol.proj.fromLonLat([3.87667, 43.6111]), zoom: 12})
});




/*
// au chargement
$().ready(function(){
    //console.log($(location).attr('href') +'|'+$(location).attr('path')+'|' );
    // le getJSON peut avoir une url ou un chemin relatif
    $.getJSON("JSON/themes.json", function(data) {
	$.each(data, function(index, objet){ // Pour chaque Thème (hotel, resto)
	    let html = "<h3>"+objet['nom']+"</h3><div id='"+objet['nom']+"' />";
	    console.log(html);
	    $('#points_interet').append(html); // ajout du <h3>
	    $.getJSON("JSON/"+objet['lien'], function(data2) {
	      $.each(data2, function(index2, objet2){ //pour chaque resto
                let nomPI = objet2['nom'];
                let html = "<input type='checkbox' name='"+nomPI+"'>"+nomPI+"</input>";	
		$('#'+objet['nom']).append(html); // ajout checkbox+nom resto
		  
		//  let icon=new  ol.style.Icon({src:"JSON/});
		  
		let image = $("#markerProto").clone();
		image.attr("id", "marker"+nomPI);
		$("body").append(image);
		mesMarkers[nomPI] = new ol.Overlay({
		    position: ol.proj.fromLonLat([objet2['long'], objet2['lat']]),
		    positioning: 'center-center',
		    element: document.getElementById("marker"+nomPI)
		});
		map.addOverlay(mesMarkers[nomPI]); // positionner sur la map
		console.log("génération du marker "+nomPI+" effectuée");

                image.on('click', function(evt) { // comportement du click
                    console.log('click sur '+$(this).attr('id'));
		    let arr = $(this).attr('id').match(/marker(.*)/);
		    // let popup = $("#popup"+arr[1]);
		    let popup = document.getElementById("popup"+arr[1]);
		    console.log(popup.style.display);
		    console.log("gestion de la popup "+arr[1]);
		    (popup.style.display == "none" ? popup.style.display = "block" : popup.style.display = "none")
		}); 
		// création de la popup de chaque marqueur
		let popup = $("#popupProto").clone();
		popup.attr("id", "popup"+nomPI);
		popup.append("<p>"+nomPI+"</p>");;
		$("body").append(popup);
		map.addOverlay(new ol.Overlay({
		    position: ol.proj.fromLonLat([objet2['long'], objet2['lat']]),
		    positioning: 'center-center',
		    offset: [20, -50],
		    element: document.getElementById("popup"+nomPI)
		}));
	    });
	  });
      });
      $('#points_interet').accordion({collapsible: true, heightStyle: 'content'});	
    });
});
*/




// Création des cases à cocher
$().ready(function(){
    $.getJSON("http://localhost:8888/types", function(data) {
        let numero = 0;
        let nbTypes = 0;
        for (let type of data) {
            console.log(type);
            $.getJSON("http://localhost:8888/type/"+type, function(data1) {
                let html = "<h3>"+type+"</h3>\n<div id='"+type+"'>\n";
                for(let obj2 of data1){
                    html += "<input type='checkbox' name='"+numero+"'>"+obj2.name+"\n";
                    creationOverlay(obj2, numero);
                    creationPopup(obj2, numero);
                    numero++;
                }
                html += "</div>";
                $("#points_interet").append(html);
                nbTypes++;
                if(nbTypes == data.length){
                    $("#points_interet").accordion({collapsible: true, heightStyle: 'content'});
                }


            });     
        }
    });
});
// var globale contenant les marqueurs et les popups
var mesMarkers = [];
var popups = [];


function creationOverlay(pi, numPi){
    let image = $("#markerProto").clone();
    image.attr("id", "marker"+numPi);
    $("body").append(image);
    mesMarkers.push(new ol.Overlay({position: ol.proj.fromLonLat([pi.long, pi.lat]),
        positioning: 'center-center',
        element: document.getElementById("marker"+numPi)})
    );
    map.addOverlay(mesMarkers[numPi]); // positionner sur la map
	console.log("génération du marker "+numPi+" effectuée");
    mesMarkers[numPi].getElement().style.display='block';
}


function creationPopup(pi, numPi){
    let popup = $("#popupProto").clone();
    popup.attr("id", "popup"+numPi);
    popup.append("<div style='background-color:white'><p>"+pi.nom+"</p></div>");
    $("body").append(popup);
    popups.push(new ol.Overlay({position: ol.proj.fromLonLat([pi.long, pi.lat]),
        positioning: 'center-center',
        offset: [30, -50],
        element: document.getElementById("marker"+numPi)}));
    map.addOverlay(popup[numPi]);
}


// que faire quand on coche une checkbox
/*$('body').on("change", "input[type=checkbox]", function() {
    let  valeur = $(this).attr('name');
    console.log("sélection de la case à cocher numéro : "+valeur);
    if ($(this).is(':checked')) {
        console.log(mesMarkers[valeur]);
        mesMarkers[valeur].getElement().style.display='block'; // afficher
    }
    else {
        mesMarkers[valeur].getElement().style.display='none'; // effacer
    }
});*/

$('body').on("click", "img", function() {
    console.log("Click sur "+$(this).attr('id'));
    let arr = $(this).attr('id').match("/marker(.*/)");
    let popup = document.getElementById("popup"+arr[1]);
    popup.style.display == "none" ? popup.style.display = "block" : popup.style.display = "none";
});