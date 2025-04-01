import { AUTH_COOKIE_NAME } from "../const.js";
import { decodeAuthToken, validateToken } from "../services/authCookies.js";
import { getCookies } from "./utils.js"

const validateAuthToken = (token) => validateToken(token, process.env.ACCESS_TOKEN_SECRET)

export const markAuthentication = async (req, res, next) => {
    const cookies = getCookies(req);
    if (!cookies) return next();
    const authToken = cookies?.[AUTH_COOKIE_NAME];
    if (!authToken) return next();
    const isAuthValid = await validateAuthToken(authToken)
    req.isAuthenticated = isAuthValid
    return next();
}
