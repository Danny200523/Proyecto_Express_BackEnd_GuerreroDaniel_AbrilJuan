import {pelicula} from "../Models/peliculaModel.js"

const mov = new pelicula()

export class controllerMovie{
    async createPel(req,res){
        const result = await mov.createMovie(req,res)
        console.log(result)
    }

    async getMoviesA(req,res){
        const result = await mov.getAllMovies(res)
        console.log(result)
    }

    async getMoviesG(genre,res){
        const result = await mov.getMovieByGenre(genre,res)
        console.log(result)
    }

    async updatePel(id,res){
        const result = await mov.updateMovie(id,res)
        console.log(result)
    }

    async deletePel(req,id,res){
        const result = await mov.deleteMovie(req,id,res)
        console.log(result)
    }

    async getMoviesPop(req,res){
        const result = await mov.getMoviesPop(req,res)
        console.log(result)
    }
}