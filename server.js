import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { getError } from './getError.js';
import { compileFile } from 'pug'
import pug from 'pug'
import { getApp } from "./getApp.js";
import { body } from 'express-validator'
import { rejesterUser } from "./DataStorage/saveUser.js";
import { login } from "./controllers/login.js";
import { markAuthentication } from "./Middleware/markAuthentication.js";

dotenv.config({path: '.env'})

const server = express();
server.set('view engine', 'pug');
server.set('views', './')
server.use(express.static('styles'));
server.use(express.static('scripts'));
server.use(express.static('public'));
server.use(markAuthentication);
server.use(bodyParser.raw());
server.use(bodyParser.json());

server.use((req,res,next) => {
    console.log(req.method, req.path)
    return next()
})


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

server.post('/api/register', async(req, res) => {
    const {login, password, firstName, familyName} = req.body
    const registerStatus = await rejesterUser({
        name: firstName, nickName: login, password, 
    })
    return res.send(registerStatus);
})

server.get('/api/register', async (req, res) => {
    const html = await compileFile('./pages/templates/register.pug')()
    console.log(html)
    res.send(html)
})

server.post(
    '/api/login',
    body('login').isString(),
    body('password').isString(),
    login,
)

server.get('/', getApp );

server.get('*', getApp)
server.get('*', getError)

server.get('/error', getError)
server.get('logout', (req, res) => {
    res.send()
})

server.get('*', getError)


server.listen(process.env.PORT)
