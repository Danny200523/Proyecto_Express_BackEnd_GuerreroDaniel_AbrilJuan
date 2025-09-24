import jwt from "jsonwebtoken";
import { connect } from "../utils/database.js";
import dotenv from "dotenv";
dotenv.config();

async function createToken(data) {
    const to_encode = data.copy()
    const expire = new Date(now.getUTCHours()) + (JWT_EXPIRE)
    to_encode.update({"exp": expire})
    return jwt.sign(to_encode, JWT_SECRET, algorithm=JWT_ALG, expireIn=JWT_EXPIRE)
}

async function register(req,res) {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }
    if (newUser.name && newUser.email && newUser.password && newUser.role) {
        const db = await connect()
        const user = await db.collection('Usuarios').insertOne(newUser)
        res.send(user)
    } else {
        res.status("Data del Usuario incompleta: "+400)
    }
}

async function login(req,res) {
    const userin = {
        email: req.body.email,
        password: req.body.password
    }
    if (userin.email && userin.password) {
        const db = await connect()
        const user = await db.collection('Usuarios').findOne({email: user.email})
        if (user) {
            if (user.password == userin.password) {
                const token = await createToken(user)
                return token
            } else {
                res.status("Contraseña incorrecta: "+400)
            }
        } else {
            res.status("Usuario no encontrado: "+400)
        }
    } else {
        res.status("Data del Usuario incompleta: "+400)
    }
}

export {register, login}