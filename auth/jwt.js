import jwt from "jsonwebtoken";
import {connect} from '../utils/database.js';
import dotenv from "dotenv";
import {modelUser} from '../Models/userModel.js';
const JWT_SECRET = process.env.JWT_SECRET || 'secret'
dotenv.config();
const newUser = new modelUser();

async function createToken(data) {
    const to_encode = data.copy()
    const expire = new Date(now.getUTCHours()) + (JWT_EXPIRE)
    to_encode.update({"exp": expire})
    return jwt.sign(to_encode, JWT_SECRET, algorithm=JWT_ALG, expireIn=JWT_EXPIRE)
}

async function register(req,res) {
    const newUser = {
        usuario: req.body.usuario,
        contrasena: req.body.contrasena,
        admin: req.body.admin
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
                res.status(400).json({error : "Contraseña incorrecta"})
            }
        } else {
            res.status(400).json({error: "Usuario no encontrado"})
        }
    } else {
        res.status(400).json({error: "Datos incompletos"})
    }
}

export {register, login}