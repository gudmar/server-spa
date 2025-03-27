// const { getUserByLogin } = require('./utils')
// const { checkPassword } = require('./hashPassword')

import { getUserByLogin } from './utils.js';
import { checkPassword } from './hashPassword.js';


export const checkUser = async(login, password) => {
    const user = await getUserByLogin(login)
    const doesPasswordMatch = user === undefined ? false : await checkPassword(password, user.password)
    const result = {
        result: doesPasswordMatch,
        message: doesPasswordMatch ? 'OK' : 'Failed to match password or login',
        jwtData: {
            login: user?.login,
            name: user?.name,
            password: user?.password
        }
    }
    return result
}

export const authenticateUser = async(login, password) => {
    const user = await getUserByLogin(login)
    const doesPasswordMatch = user === undefined ? false : password === user.password
    const result = {
        result: doesPasswordMatch,
        message: doesPasswordMatch ? 'OK' : 'Failed to match password or login',
        jwtData: {
            login: user.login,
            name: user.name,
            password: user.password
        }
    }
    return result
}
