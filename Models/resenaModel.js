import { connect,disconnect } from "../utils/database.js";

export class resena{
    constructor(id_usuario,id_pelicula,comentario,calificacion){
        this.id_usuario=id_usuario;
        this.id_pelicula=id_pelicula;
        this.comentario=comentario;
        this.calificacion=calificacion;
        this.date= new Date();
    }

    async create(id_usuario,id_pelicula,comentario,calificacion){
        const db = await connect()
        const newResena = {
            id_usuario: id_usuario,
            id_pelicula: id_pelicula,
            comentario: comentario,
            calificacion: calificacion,
            date: new Date()
        }
        const result = db.collection('RESENAS').insertOne(newResena)
        await disconnect()
        return result
    }
    async getAll(){
        const db = await connect()
        const result = await db.collection('RESENAS').find().toArray()
        console.log(result)
        await disconnect()
        return result
    }

    async getByMovie(id_pelicula){
        const db = await connect()
        const result = await db.collection('RESENAS').find({id_pelicula:id_pelicula}).toArray()
        await disconnect()
        return result
    }
    async update(id,req){
        const db = await connect()
        const upData = {
            id_usuario: req.id_usuario,
            id_pelicula: req.id_pelicula,
            comentario: req.comentario,
            calificacion: req.calificacion,
            date: new Date()
        }
        const result = await db.collection('RESENAS').updateOne({_id:id},{$set:upData})
        await disconnect()
        return result
    }
    async delete(id){
        const db = await connect()
        const result = await db.collection('RESENAS').deleteOne({_id:id})
        await disconnect()
        return result
    }
}
