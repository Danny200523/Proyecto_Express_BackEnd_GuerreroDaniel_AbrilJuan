import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
const JWT_ALG = process.env.JWT_ALG || "HS256";
const JWT_EXPIRE_STR = process.env.JWT_EXPIRE || "1h";

function parseExpire(expireStr) {
    if (expireStr.endsWith('h')) {
        const hours = parseInt(expireStr.slice(0, -1));
        return hours * 3600; // seconds
    } else if (expireStr.endsWith('m')) {
        const minutes = parseInt(expireStr.slice(0, -1));
        return minutes * 60; // seconds
    } else {
        // Assume minutes if no suffix
        return parseInt(expireStr) * 60; // seconds
    }
}

const JWT_EXPIRE = parseExpire(JWT_EXPIRE_STR);

module.exports = {
    JWT_SECRET,
    JWT_ALG,
    JWT_EXPIRE
};
