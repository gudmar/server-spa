import * as jwt from 'jsonwebtoken'
import { MSECONDS_IN_SECOND, SECONDS_IN_MINUTE } from '../const.js';
import { getUserByLogin } from '../DataStorage/utils.js';

export const validateToken = async(token, secret) => {
    try {
        if (!token) return { result: false, message: 'No token' }
        const uncoded = await new Promise((res) => { res(jwt.default.verify(token, secret)) })
        const { data: login, validity } = uncoded
        console.log('Verification token', result)
        const doesUserExist = await getUserByLogin(login)
        console.log('User exists?', doesUserExist)
        if (!doesUserExist) return false;
        const now = Date.now();
        const isUpToDate = now >= validity;
        console.log('Is up to date', isUpToDate)
        return isUpToDate
    } catch(e) {
        return false
    }
}

console.log('JWT', jwt)
export const getAuthToken = (data) => jwt.default.sign(data, process.env.ACCESS_TOKEN_SECRET)

export const getRefreshToken = (data) => jwt.default.sign(data, process.env.REFRESH_TOKEN_SECRET)

export const AUTH_COOKIE_MAX_AGE = MSECONDS_IN_SECOND * 20; 
export const REFRESH_COOKIE_MAX_AGE = MSECONDS_IN_SECOND * SECONDS_IN_MINUTE * 20;

const getAuthLifePeriod = () => Date.now() + AUTH_COOKIE_MAX_AGE;

const getRefreshTokenPeriod = () => Date.now() + REFRESH_COOKIE_MAX_AGE;

export const getMortalAuthToken = (data) => getAuthToken({data, validity: getAuthLifePeriod() })

export const getMortalRefreshToken = (data) => getAuthToken({data, validity: getRefreshTokenPeriod() })

export const decodeAuthToken = (token) => decodeJwt(token, process.env.ACCESS_TOKEN_SECRET)

export const decodeRefreshToken = (token) => decodeJwt(token, process.env.REFRESH_TOKEN_SECRET)
