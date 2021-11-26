var largeurImage;
var hauteurImage;
var compteur = 0;
let nom = ['Connery', 'Lazenby', 'Moore', 'Dalton', 'Brosnan', 'Craig'];
let cocktails = [{'nom':'VM','amateurs':['Connery', 'Lazenby', 'Moore', 'Dalton', 'Brosnan', 'Craig']},
 {'nom':'Vesper','amateurs':['Craig']},
 {'nom':'Collins','amateurs':['Connery']},   
 {'nom':'Mint J','amateurs':['Connery']},
 {'nom':'The Mac', 'amateurs':['Craig']}
];

function zoom(image){
    largeurImage = image.style.width;
    hauteurImage = image.style.height;
    image.style.width = "auto";
    image.style.height = "auto";
}

function dezoom(image){
    image.style.width = largeurImage;
    image.style.height = hauteurImage;
}

function changeimage(){
    image = document.getElementById("photo");
    if (compteur === undefined){compteur = 0;}
    compteur++;
    //console.log(compteur);
    if (compteur === nom.length){compteur = 0;}
    image.src = "http://localhost:8888/fichier/"+nom[compteur]+".jpg";
}

/* afficherCocktails TP1 
function afficherCocktails(){
    $("#listeCocktails").empty();
    let html = "";
    for (let object of cocktails) {
        if (object['amateurs'].includes(nom[compteur])){
            html += "<li>"+object['nom']+"</li>";
       }
    }
    $("#listeCocktails").append(html);
} */




function afficherCocktails(){
    let chemin = $("#photo").attr("src");
    let data = chemin.split("/");
    let nom = data[data.length-1].split(".")[0];
    $("#listeCocktails").empty();
    $.getJSON("http://localhost:8888/cocktails", function(data) {
        let html = "";
        $.each(data, function(index, object) {
            if (object.amateurs.includes(nom)) {
                html += "<li>"+object.nom+"</li>";
            }
        });
        $("#listeCocktails").append(html);
    });
}











function afficherCocktails_v1() {
    let chemin = $("#photo").attr("src");
    let data = chemin.split("/");
    let nomJD = data[data.length-1].split(".")[0];
    $("#listeCocktails").empty();
    $.getJSON("http://localhost:8888/cocktails", function(data) {
        let html = "";
        for (let object of data) {
            if (object.amateurs.includes(nomJD)) {
                html += "<li>"+object.nom+"</li>";
            }
        }
        $("#listeCocktails").append(html);
    });
}

function afficherCocktails_v2() {
    let chemin = $("#photo").attr("src");
    let data = chemin.split("/");
    let nomJD = data[data.length-1].split(".")[0];
    $("#listeCocktails").empty();
    $.getJSON("http://localhost:8888/cocktails/"+nomJD, function(data) {
        console.log(data);
        let html = "";
        for (let object of data) {
            html += "<li>"+object+"</li>"; 
        }
        $("#listeCocktails").append(html);
    });
}