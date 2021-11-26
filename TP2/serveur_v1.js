var express = require("express");
var app = express();
var fs = require('fs');
app.listen(8888);

app.get('/', function(request, response) {
    response.sendFile('CV_James_AJAX.html', {root: __dirname});
});

app.get('/cocktails', function(request, response) {
    console.log("renvoi de cocktails.json");    
    response.sendFile('cocktails.json', {root: __dirname});    
});

app.get('/fichier/:nomFichier', function(request, response) {
    console.log("Renvoi de "+request.params.nomFichier);
    response.sendFile(request.params.nomFichier, {root: __dirname});
})

app.get('/cocktails/:nomJD', function(request, response){
    response.setHeader('Content-Type', 'application/json');
    response.setHeader("Access-Control-Allow-Origin", '*');
    let texte = fs.readFileSync("cocktails.json", "utf8");
    let data = JSON.parse(texte);
    let cocktails = [];
    for (let object of data) {
            if (object.amateurs.includes(request.params.nomJD)) {
                cocktails.push(object.nom);
            }
    }
    response.end(JSON.stringify(cocktails))
})
