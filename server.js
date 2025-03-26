import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { getError } from './getError.js';
import { compileFile } from 'pug'
import { NAVIGATION } from "./navigation.js";
import pug from 'pug'
import { getApp } from "./getApp.js";

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

server.get('/api/clock', async (req, res) => {
    const time = new Date(Date.now())
    const locals = {
        hours:   `${time.getHours()}`,
        minutes: `${time.getMinutes()}`,
        seconds: `${time.getSeconds()}`,
    }
    const getHtml = await pug.compileFile('./pages/templates/clock.pug')
    res.send(getHtml(locals))
})

server.get('/api/stop-watch', async (req, res) => {
    const locals = {
        hours: '0',
        minutes: '0',
        seconds: '0',
        hundreds: '0',
    }
    const getHtml = await pug.compileFile('./pages/templates/stopWatch.pug')
    res.send(getHtml(locals))
})

server.get('/api/login', async (req, res) => {
    const html = await compileFile('./pages/templates/login.pug')()
    console.log(html)
    res.send(html)
})

server.get('/', getApp );

server.get('*', getApp)
server.get('*', getError)

server.get('/error', getError)
server.get('logout', (req, res) => {
    res.send()
})

server.get('*', getError)

// server.get('/', (req, res) => {
//     const locals = {
//         title: 'SPA',
//         navigations: NAVIGATION,
//         scripts: [
//             'grimReaper.js',
//             'renderer.js',
//             'load.js',
//             'getBody.js',
//             'utils.js',
//             'router.js',
//             // 'navigations.js'
//         ],
//         styles: [
//             'main.css',
//             'navigations.css'
//         ],
//     }
//     res.render('./pages/templates/indexWithNavTemplate.pug', locals)
// });

server.listen(process.env.PORT)
