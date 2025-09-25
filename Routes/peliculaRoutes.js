import {Router} from "express";
import {requireAdmin} from "../utils/adminRequire.js"
import {controllerMovie} from "../Controllers/peliculaController.js"

const pel = new controllerMovie()

const router = Router();

router.post('./new-Pel',requireAdmin,async (req,res)=>{
    await pel.createPel(req,res);
})

router.get('./all-Pel',async (req,res)=>{
    await pel.getMoviesA(req,res);
})

router.get('./genre-Pel/:genre',async (req,res)=>{
    await pel.getMoviesG(req.params.genre,res);
})

router.put('./update-Pel:id',requireAdmin,async (req,res)=>{
    await pel.updatePel(req.params.id,res);
})

router.delete('./delete-Pel:id',requireAdmin,async (req,res)=>{
    await pel.deletePel(req.params.id,res);
})

export default router;