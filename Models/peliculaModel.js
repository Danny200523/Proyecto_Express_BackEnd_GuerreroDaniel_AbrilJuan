import { connect, disconnect } from "../utils/database.js";

export class pelicula{
    constructor(title,summary,year,popularity,poster,backdrop,genres){
        this.title=title;
        this.summary=summary;
        this.year=year;
        this.popularity=popularity;
        this.poster=poster;
        this.backdrop=backdrop;
        this.genres=genres;
    }

    async createMovie(data,res){
        const db = await connect()
        const newMovie = {
            title: data.title,
            summary: data.summary,
            year: data.year,
            popularity: data.popularity,
            poster: data.poster,
            backdrop: data.backdrop,
            genres: data.genres
        }
        const result = await db.collection('PELICULAS').insertOne(newMovie)
        await disconnect()
        return res.status(200).json({message:"Pelicula creada correctamente"})
    }

    async getAllMovies(res){
        const db = await connect()
        const result = await db.collection('PELICULAS').find().toArray()
        await disconnect()
        return res.status(200).json(result)
    }

    async getMovieByGenre(genre,res){
        const db = await connect()
        const result = await db.collection('PELICULAS').find({genres:genre}).toArray()
        await disconnect()
        return res.status(200).json(result)
    }

    async updateMovie(req,id,res){
        const upData = {
            title: req.body.title,
            summary: req.body.summary,
            year: req.body.year,
            popularity: req.body.popularity,
            poster: req.body.poster,
            backdrop: req.body.backdrop,
            genres: req.body.genres
        }
        const db = await connect()
        const result = await db.collection('PELICULAS').updateOne({_id:id},{$set:upData})
        await disconnect()
        return res.status(200).json({message:"Pelicula actualizada correctamente",data: result})
    }

    async deleteMovie(id,res){
        const db = await connect()
        const result = await db.collection('PELICULAS').deleteOne({_id:id})
        await disconnect()
        return res.status(200).json({message:"Pelicula eliminada correctamente",data: result})
    }

    async getMoviesPop(req,res){
        const db = await connect()
        const result = await db.collection('PELICULAS').find().sort({popularity:-1}).toArray()
        await disconnect()
        return res.status(200).json(result)
    }
}