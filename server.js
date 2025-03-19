import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { getError } from './getError.js';
import { compileFile } from 'pug'
import { NAVIGATION } from "./navigation.js";
import pug from 'pug'

dotenv.config({path: '.env'})

const server = express();
server.set('view engine', 'pug');
server.set('views', './')
server.use((req,res,next) => {
    console.log(req.method, req.path)
    return next()
})
server.use(bodyParser.json());
server.use(bodyParser.raw());
server.use(express.static('styles'));
server.use(express.static('scripts'));
server.use(express.static('public'));

server.get('/error', getError)
server.get('/login', async (req, res) => {
    const html = await compileFile('./pages/templates/login.pug')()
    console.log(html)
    res.send(html)
})
server.get('/clock', async (req, res) => {
    console.log('In clock', req.method, req.path)
    const locals = {
        hours: '1',
        minutes: '2',
        seconds: '3',
    }
    const getHtml = await pug.compileFile('./pages/templates/clock.pug')
    res.send(getHtml(locals))
})

server.get('stoper', (req, res) => {
    res.send()
})
server.get('logout', (req, res) => {
    res.send()
})
server.get('/', (req, res) => {
    console.log('In / ', req.method, req.path)
    const locals = {
        title: 'SPA',
        navigations: NAVIGATION,
        scripts: [
            'renderer.js',
            'getBody.js',
            'utils.js',
            'router.js',
            'navigations.js'
        ],
        styles: [
            'main.css',
            'navigations.css'
        ],
    }
    res.render('./pages/templates/indexWithNavTemplate.pug', locals)
});
server.get('*', getError)

server.listen(process.env.PORT)
