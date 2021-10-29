var express = require("express");
var app = express();
app.listen(8888);

app.get('/', function(request, response) {
    response.sendFile('CV_James_AJAX.html', {root: __dirname});
});

app.get('/cocktails', function(request, response) {
    console.log("renvoi de cocktails.json");    
    response.sendFile('cocktails.json', {root: __dirname});    
});



