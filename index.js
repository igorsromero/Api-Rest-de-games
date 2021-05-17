const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DB = {
    games: [
        {
            id: 1,
            title: "Sea of Thieves",
            year: 2020,
            price: 60
        },
        {
            id: 2,
            title: "Bloons TD6",
            year: 2021,
            price: 4
        },
        {
            id: 3,
            title: "Phasmofobia",
            year: 2020,
            price: 30
        }
    ]
}

// Listar todos os jogos
app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

// Buscar por ID
app.get("/game/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {

        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
});

// Cadastrar um novo jogo
app.post('/game', (req, res) => {
    var { id, title, price, year } = req.body;

    DB.games.push({
        id,
        title,
        price,
        year
    });
    res.sendStatus(200);
})

// Deleta um jogo
app.delete("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if (index == -1) {
            res.sendStatus(404);
        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

app.put('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {

        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {      
            var { id, title, price, year } = req.body;

            if(title != undefined){
                game.title = title;
            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }

        } else {
            res.sendStatus(404);
        }
    }
})

app.listen(8080, () => {
    console.log("API RODANDO!");
});