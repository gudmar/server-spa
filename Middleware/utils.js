import * as cookie from 'cookie'

export const getCookies = (req) => {
    const stringifiedCookies = req.headers?.cookie
    if (stringifiedCookies) return cookie.parse(stringifiedCookies)
    return null
}
