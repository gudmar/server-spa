import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config({path: '.env'})

const server = express();
server.set('view engine', 'pug');
server.set('views', './')
server.use(bodyParser.json());
server.use(bodyParser.raw());
server.use(express.static('styles'));
server.use(express.static('scripts'));
server.use(express.static('public'));

server.get('/', (req, res) => {
    const locals = {
        title: 'SPA',
        scripts: [
            'router.js'
        ],
        styles: [
            'main.css'
        ],
    }
    res.render('./pages/templates/indexWithNavTemplate.pug', locals)
});
server.get('*', (req, res) => {
    const locals = {
        title: 'SPAH',
        scripts: [],
        styles: ['error.css']
    }
    res.render('./pages/templates/noRoute.pug', locals)
})


server.listen(process.env.PORT)
