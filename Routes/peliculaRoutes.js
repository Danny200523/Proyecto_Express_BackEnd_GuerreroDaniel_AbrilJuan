import {Router} from "express";
import {requireAdmin} from "../utils/adminRequire.js"
import {controllerMovie} from "../Controllers/peliculaController.js"

const pel = new controllerMovie()

const routerMovie = Router();

routerMovie.post('./new-Pel',requireAdmin,async (req,res)=>{
    await pel.createPel(req,res);
})

routerMovie.get('./all-Pel',async (req,res)=>{
    await pel.getMoviesA(req,res);
})

routerMovie.get('./genre-Pel/:genre',async (req,res)=>{
    await pel.getMoviesG(req.params.genre,res);
})

routerMovie.put('./update-Pel:id',requireAdmin,async (req,res)=>{
    await pel.updatePel(req.params.id,res);
})

routerMovie.delete('./delete-Pel:id',requireAdmin,async (req,res)=>{
    await pel.deletePel(req,req.params.id,res);
})

routerMovie.get('/pel-popu',async (req,res)=>{
    await pel.getMoviesPop(req,res)
})

export default routerMovie;