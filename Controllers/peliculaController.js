import {pelicula} from "../Models/peliculaModel.js"

const mov = new pelicula()

export class controllerMovie{
    async createPel(req){
        console.log("payload tipos:", {
            title: typeof(req.title),
            summary: typeof req.summary,
            year: req.year, yearType: typeof req.year,
            popularity: req.popularity, popType: typeof req.popularity,
            genres: req.genres, isArray: Array.isArray(req.genres)
          });
          
        const result = await mov.createMovie(req)
        return result
    }

    async getMoviesA(req,res){
        const result = await mov.getAllMovies(res)
        return result
    }

    async getMoviesG(genre,res){
        const result = await mov.getMovieByGenre(genre,res)
        return result
    }

    async updatePel(req,id,res){
        const result = await mov.updateMovie(req,id,res)
        return result
    }

    async deletePel(id,res){
        const result = await mov.deleteMovie(id)
        return result
    }

    async getMoviesP(req,res){
        const result = await mov.getMoviesPop(req,res)
        return result
    }
}