var express = require('express'); // import de la bibliothèque Express
var app = express(); // instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




app.get("/", function (req, res) {
    res.send("Hello");
});

app.get('/test/*', function (req, res) {
    const message = req.url.substr(6);
    res.json({ "msg": message });
});



let counter = 0;


app.get('/cpt/query', function (req, res) {
    res.json({ counter: counter });
});


app.get('/cpt/inc', function (req, res) {
    if (req.query.v !== undefined) {
        let v = req.query.v;
        if (v.match(/^\d+$/)) {
            counter += parseInt(v, 10);
            res.json({ "code": 0 });
        } else {
            res.json({ "code": -1 });
        }
    } else {
        counter++;
        res.json({ "code": 0 });
    }
});


var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

// /msg/get/* : renvoie le message dont l'indice est passé dans l'URL
// Exemple : /msg/get/2 renvoie { "code": 1, "msg" : "CentraleSupelec Forever" }
app.get('/msg/get/*', function (req, res) {
    const indexStr = req.url.substr(9); // "/msg/get/" fait 9 caractères
    const index = parseInt(indexStr, 10);
    if (!isNaN(index) && index >= 0 && index < allMsgs.length) {
        res.json({ "code": 1, "msg": allMsgs[index] });
    } else {
        res.json({ "code": 0 });
    }
});


app.get('/msg/nber', function (req, res) {
    res.json({ "nber": allMsgs.length });
});


app.get('/msg/getAll', function (req, res) {
    res.json(allMsgs);
});


app.get('/msg/post/*', function (req, res) {
    let messageEncoded = req.url.substr(10);
    let message = unescape(messageEncoded);
    allMsgs.push(message);
    res.json({ "newIndex": allMsgs.length - 1 });
});


app.get('/msg/del/*', function (req, res) {
    const indexStr = req.url.substr(9);
    const index = parseInt(indexStr, 10);
    if (!isNaN(index) && index >= 0 && index < allMsgs.length) {
        allMsgs.splice(index, 1);
        res.json({ "code": 0 });
    } else {
        res.json({ "code": -1 });
    }
});


app.listen(8080);
console.log("App listening on port 8080...");
