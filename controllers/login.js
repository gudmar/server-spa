import { validationResult } from "express-validator";
import { 
    getMortalAuthToken, getMortalRefreshToken,
} from "../services/authCookies.js";
import {
    checkUser
} from '../DataStorage/checkUser.js'
import { AUTH_COOKIE_NAME, REFRESH_COOKIE_NAME } from "../const.js";

export const login = async(req, res) => {
    const errors = validationResult(req).array();
    if (errors.length) res.status(406).send()
    const {login, password} = req.body;
    const { result, message, jwtData } = await checkUser(login, password)
    if (!result) {
        return res.status(404).send()
    }
    return res.cookie(AUTH_COOKIE_NAME, getMortalAuthToken(login)).cookie(REFRESH_COOKIE_NAME, getMortalRefreshToken(login)).send()
}
