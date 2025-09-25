import {register,login} from './jwt.js'
import { Router } from "express";
const router = Router();

router.post('/login',async (req,res)=>{
    try {
        const token = login(req,res)
    } catch (e) {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
})

router.post('/register',async (req,res)=>{
    try {
        await register(req, res);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
})

export default router;