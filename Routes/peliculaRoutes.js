import {Router} from "express";
import {requireAdmin} from "../utils/adminRequire.js"
import {controllerMovie} from "../Controllers/peliculaController.js"
import {pelicula} from "../Models/peliculaModel.js"

const pelModel = new pelicula()
const pel = new controllerMovie()

const routerMovie = Router();

routerMovie.post('/new-Pel',requireAdmin,async (req,res)=>{
    await pelModel.createMovie(req,res);
})

routerMovie.get('/all-Pel',async (req,res)=>{
    await pelModel.getAllMovies(req,res);
})

routerMovie.get('/genre-Pel/:genre',async (req,res)=>{
    await pelModel.getMovieByGenre(req.params.genre,res);
})

routerMovie.put('/update-Pel:id',requireAdmin,async (req,res)=>{
    await pelModel.updateMovie(req,id=req.params.id,res);
})

routerMovie.delete('/delete-Pel:id',requireAdmin,async (req,res)=>{
    await pelModel.deleteMovie(req,req.params.id,res);
})

routerMovie.get('/pel-popu',async (req,res)=>{
    await pelModel.getMoviesPop(req,res)
})

export default routerMovie;