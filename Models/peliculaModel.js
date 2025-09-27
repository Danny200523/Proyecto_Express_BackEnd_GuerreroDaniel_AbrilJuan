import { connect, disconnect } from "../utils/database.js";
import { Int32, Double,objectId } from "mongodb";

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

    async createMovie(data){
        const db = await connect()
        const newMovie = {
            title: String(data.title ?? "").trim(),
            summary: String(data.summary ?? "").trim(),
            year: new Int32(Number.parseInt(data.year, 10)),                 // int32
            popularity: new Double(Number(data.popularity)),                 // double
            poster: String(data.poster ?? "").trim(),
            backdrop: String(data.backdrop ?? "").trim(),
            // El validator SOLO acepta string. Si llega array -> lo convertimos a CSV.
            genres: Array.isArray(data.genres)
              ? data.genres.map(String).join(", ")
              : String(data.genres ?? "").trim()
        }
        const result = await db.collection('PELICULAS').insertOne(newMovie)
        await disconnect()
        return result
    }

    async getAllMovies(req, res){
        const db = await connect()
        const result = await db.collection('PELICULAS').find().toArray()
        console.log(result)
        await disconnect()
        return result
    }

    async getMovieByGenre(genre,res){
        const db = await connect()
        const result = await db.collection('PELICULAS').find({genres:genre}).toArray()
        await disconnect()
        return result
    }

    async updateMovie(req,id){
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
        const result = await db.collection('PELICULAS').updateOne({_id:new ObjectId(id)},{$set:upData})
        await disconnect()
        return result
    }

    async deleteMovie(id){
        const db = await connect()
        const result = await db.collection('PELICULAS').deleteOne({_id:id})
        await disconnect()
        return result
    }

    async getMoviesPop(req,res){
        const db = await connect()
        const result = await db.collection('PELICULAS').find().sort({popularity:-1}).toArray()
        await disconnect()
        return result
    }
}