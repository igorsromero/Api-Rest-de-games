const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWTSecret = "spaoksaposkaposa";
app.use(cors());
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
    ],
    users: [
        {
            id: 1,
            name: "Igor Solfa",
            email: "igorsolfaromero@gmail.com",
            password: "igor"
        },
        {
            id: 2,
            name: "Nathália Solfa",
            email: "naty.urenha@gmail.com",
            password: "igor"
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

// Atualizar um jogo
app.put('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {

        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            var { id, title, price, year } = req.body;

            if (title != undefined) {
                game.title = title;
            }
            if (price != undefined) {
                game.price = price;
            }
            if (year != undefined) {
                game.year = year;
            }
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
})

app.post("/auth", (req, res) => {
    var { email, password } = req.body;

    if (email != undefined) {

        var user = DB.users.find(u => u.email == email);

        if (user != undefined) {

            if (user.password == password) {
                jwt.sign({ id: user.id, email: user.email }, JWTSecret, { expiresIn: '48h' }, (err, token) => {
                    if (err) {
                        res.status(400);
                        res.json({ err: "Falha interna" });
                    } else {
                        res.status(200);
                        res.json({ token: token });
                    }
                });
            } else {
                res.status(401);
                res.json({ err: "Credenciais inválidas." });
            }

        } else {
            res.status(404);
            res.json({ err: "E-mail inválido," });
        }

    } else {
        res.status(400);
        res.json({ err: "E-mail inválido," });
    }
})

app.listen(8080, () => {
    console.log("API RODANDO!");
});