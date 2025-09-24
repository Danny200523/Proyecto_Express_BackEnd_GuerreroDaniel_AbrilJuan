import Router from "express"
import {register,login} from './jwt.js'
const router = Router()

router.put('/login',async (req,res)=>{
    try {
        const token = login(req,res)
        res.json({token});
    } catch (e) {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
})

router.post('/register',async (req,res)=>{
    try {
        const result = await register(req, res);
        res.status(201).json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
})