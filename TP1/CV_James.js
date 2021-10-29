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

function carousel(image){
    if (compteur === undefined){compteur = 0;}
    compteur++;
    if (compteur === nom.length){compteur = 0;}
    image.src = "./img/"+nom[compteur]+".jpg";
}

function afficherCocktails(){
    $("#listeCocktails").empty();
    let html = "";
    for (let object of cocktails) {
        if (object['amateurs'].includes(nom[compteur])){
            html += "<li>"+object['nom']+"</li>";
       }
    }
    $("#listeCocktails").append(html);
}




