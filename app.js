const config = require('./config.json')
const mysql = require('promise-mysql')
const bodyParser = require('body-parser')
const cors = require("cors");
const express = require('express')
const app = express()

// database connection
mysql.createConnection(config.db)
    .then((db) => {
        console.log(`Connected to ${config.db.database} !`)
        app.use(bodyParser.json())
        // Add headers
        app.use((req, res, next) => {
            res.set("Access-Control-Allow-Origin", "*");
            res.set("Access-Control-Allow-Headers", "Content-Type");
            res.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
            next();
        });
        app.use(cors());
        
        // router creation
        let expressRouter = express.Router()
        // class requirements
        const Players = require('./classes/players-class')(db, config)
        const Games = require('./classes/games-class')(db, config)
        const Rooms = require('./classes/rooms-class')(db, config)

        // players route
        expressRouter.route('/players')
            .get(async (req, res) => res.json(await Players.getAll()))
            .post(async (req, res) => res.json(await Players.addOne(req.body)))
            .put(async (req, res) => res.json(await Players.updateOne(req.body)))
            .delete(async (req, res) => res.json(await Players.deleteAll()))

        // games route
        expressRouter.route('/games')
            .get(async (req, res) => res.json(await Games.getAll()))
            .post(async (req, res) => res.json(await Games.addOne(req.body)))
            .put(async (req, res) => res.json(await Games.updateOne(req.body)))
            .delete(async (req, res) => res.json(await Games.deleteAll()))
        
        // rooms route
        expressRouter.route('/rooms')
            .get(async (req, res) => res.json(await Rooms.getAll()))
            .post(async (req, res) => res.json(await Rooms.addOne(req.body)))
            .put(async (req, res) => res.json(await Rooms.updateOne(req.body)))
            .delete(async (req, res) => res.json(await Rooms.deleteAll()))
        expressRouter.route('/rooms/available')
            .get(async (req, res) => res.json(await Rooms.getAllAvailable()))

        // config routes
        app.use('', expressRouter)
        app.listen(config.port, () => console.log(`API started on port ${config.port}.`))

    })
    .catch((err) => {
        console.log('Connection error !')
        console.log(err.message)
    })