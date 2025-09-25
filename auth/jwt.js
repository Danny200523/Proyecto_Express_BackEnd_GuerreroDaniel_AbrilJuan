import jwt from "jsonwebtoken";
import {connect, disconnect} from '../utils/database.js';
import dotenv from "dotenv";
import { JWT_ALG, JWT_EXPIRE_STR} from './config.js';
const JWT_SECRET = process.env.JWT_SECRET || 'secret'
dotenv.config();

function createToken(user) {
    const payload = {
      sub: user._id?.toString(),
      usuario: user.usuario,
      admin: !!user.admin,
    };
    return jwt.sign(payload, JWT_SECRET, {
      algorithm: JWT_ALG,      // "HS256"
      expiresIn: JWT_EXPIRE_STR // "1h" o 3600
    });
  }


async function register(req,res) {
    const newUser = {
        usuario: req.body.usuario,
        contrasena: req.body.contrasena,
        admin: req.body.admin
    }
    if (newUser.usuario) {
        if (newUser.contrasena){
            const db = await connect()
            const user = await db.collection('USUARIOS').insertOne(newUser)
            res.status(200).json({message: "Usuario creado correctamente",user})
            disconnect();
        }else{
            res.status(400).json({error: "data contrasena no rellena"})
        }
    } else {
        res.status(400).json({error: "data usuario no rellena"})
    }
}

async function login(req,res) {
    const userin = {
        usuario: req.body.usuario,
        contrasena: req.body.contrasena
    }
    if (userin.usuario && userin.contrasena) {
        const db = await connect()
        const user = await db.collection('USUARIOS').findOne({usuario: userin.usuario})
        if (user) {
            if (user.contrasena === userin.contrasena) {
                const token = createToken(user)
                res.status(200).json({token})
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