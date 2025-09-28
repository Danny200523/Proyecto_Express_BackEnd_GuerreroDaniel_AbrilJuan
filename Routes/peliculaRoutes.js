import {Router} from "express";
import {requireAdmin} from "../utils/adminRequire.js"
import {controllerMovie} from "../Controllers/peliculaController.js"
import { body } from "express-validator";


const pel = new controllerMovie()

const routerMovie = Router();

routerMovie.post('/new-Pel',
    validate([
        body("title").trim().isLength({ min: 1, max: 200 }).withMessage("title requerido"),
        body("summary").trim().isLength({ min: 1 }).withMessage("summary requerido"),
        body("year").isInt({ min: 1888, max: 2100 }).toInt(),
        body("popularity").isFloat({ min: 0 }).toFloat(),
        body("poster").isURL().withMessage("poster URL inválida"),
        body("backdrop").isURL().withMessage("backdrop URL inválida"),
        // si 'genres' es string (como tu validator):
        body("genres").isString().trim().isLength({ min: 1 }),
        // si usas `title_norm` en DB, lo puedes calcular aquí:
        body("title").customSanitizer(v => v?.trim() ?? ""),
      ]),
    requireAdmin,async (req,res,next)=>{
    try {
        const result = await pel.createPel(req.body);
        return res.status(200).json(result)
    } catch (error) { next(error) }
})

routerMovie.get('/all-Pel',async (req,res,next)=>{
    try {
        const result = await pel.getMoviesA(req,res);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerMovie.get('/genre-Pel/:genre',async (req,res,next)=>{
    try {
        const result = await pel.getMoviesG(req.params.genre,res);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerMovie.put('/update-Pel/:id',requireAdmin,async (req,res,next)=>{
    try {
        const result = await pel.updatePel(req.body,req.params.id);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerMovie.delete('/delete-Pel/:id',requireAdmin,async (req,res,next)=>{
    try {
        const result = await pel.deletePel(req.params.id);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerMovie.get('/pel-pop',async (req,res,next)=>{
    try {
        const result = await pel.getMoviesP(req,res)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerMovie.get('/search/:id', async (req,res,next)=>{
    try {
        const result = await pel.searchPel(req.params.id)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

export default routerMovie;