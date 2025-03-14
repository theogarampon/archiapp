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

// Liste des messages (désormais sous forme d'objets avec pseudo et date)
const allMsgs = [
    { msg: "Hello World", pseudo: "Alice", date: "2025-03-14 10:00:00" },
    { msg: "foobar", pseudo: "Bob", date: "2025-03-14 10:01:00" },
    { msg: "CentraleSupelec Forever", pseudo: "Charlie", date: "2025-03-14 10:02:00" }
];

// Récupérer tous les messages
app.get('/msg/getAll', (req, res) => res.json(allMsgs));

// Obtenir le nombre de messages
app.get('/msg/nber', (req, res) => res.json({ "nber": allMsgs.length }));

// Récupérer un message par son numéro
app.get('/msg/get/:id', (req, res) => {
    const index = parseInt(req.params.id, 10);
    if (!isNaN(index) && index >= 0 && index < allMsgs.length) {
        res.json({ "code": 1, "msg": allMsgs[index] });
    } else {
        res.json({ "code": 0 });
    }
});

// Ajouter un message (pseudo pris en paramètre GET facultatif)
app.get('/msg/post/:message', (req, res) => {
    const message = decodeURIComponent(req.params.message);
    const pseudo = req.query.pseudo ? decodeURIComponent(req.query.pseudo) : "Anonyme";
    const newMessage = {
        msg: message,
        pseudo: pseudo,
        date: new Date().toLocaleString()
    };
    allMsgs.push(newMessage);
    res.json({ "newIndex": allMsgs.length - 1 });
});

// Supprimer un message par son numéro
app.get('/msg/del/:id', (req, res) => {
    const index = parseInt(req.params.id, 10);
    if (!isNaN(index) && index >= 0 && index < allMsgs.length) {
        allMsgs.splice(index, 1);
        res.json({ "code": 0 });
    } else {
        res.json({ "code": -1 });
    }
});

app.listen(8080);
console.log("App listening on port 8080...");
