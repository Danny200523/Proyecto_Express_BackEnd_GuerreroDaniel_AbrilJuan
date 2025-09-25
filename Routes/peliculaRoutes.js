import {Router} from "express";
import {requireAdmin} from "../utils/adminRequire.js"
import {createPel} from "../Controllers/peliculaController.js"

const router = Router();

router.post('./new-Pel',requireAdmin,async (req,res)=>{
    await createPel(req,res);
})