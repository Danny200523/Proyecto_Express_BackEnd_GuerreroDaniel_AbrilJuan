import { db } from "../utils/database.js";
import { ObjectId } from "mongodb";
import fs from 'fs/promises'
import path from 'path'

export class resena{
    constructor(id_usuario,id_pelicula,comentario,calificacion){
        this.id_usuario=id_usuario;
        this.id_pelicula=id_pelicula;
        this.comentario=comentario;
        this.calificacion=calificacion;
        this.date= new Date();
    }

    async create(id_usuario,id_pelicula,comentario,calificacion){
        const newResena = {
            id_usuario: new ObjectId(id_usuario),
            id_pelicula: new ObjectId(id_pelicula),
            comentario: comentario,
            calificacion: Number(calificacion),
            fecha: new Date()
         }
        const result = await db.collection('RESENAS').insertOne(newResena);
        return result
    }
    async getAll(){
        const result = await db.collection('RESENAS').find().toArray()
        return result
    }

    async getByMovie(id_pelicula){
        const result = await db.collection('RESENAS').find({id_pelicula:new ObjectId(id_pelicula)}).toArray()
        return result
    }

    async update(id,req){
        const upData = {
            id_usuario: new ObjectId(req.id_usuario),
            id_pelicula: new ObjectId(req.id_pelicula),
            comentario: req.comentario,
            calificacion: req.calificacion,
            date: new Date()
        }
        const result = await db.collection('RESENAS').updateOne({_id:new ObjectId(id)},{$set:upData})
        return result
    }
    async delete(id){
        const result = await db.collection('RESENAS').deleteOne({_id:new ObjectId(id)})
        return result
    }

    async exportData(id){
        const name = "dataExportada"
        let dataToWrite = 'nombreUser,calificacion,comentario,fecha\n'
        const data = await db.collection('RESENAS').find({id_pelicula: new ObjectId(id)}).toArray()
        await data.forEach(async element => {
            const usuario = await db.collection('USUARIOS').find({_id:new ObjectId(element.id_usuario)}).toArray()
            element.id_usuario = usuario[0].usuario
            delete element.id_pelicula
            console.log(data)
        });
        data.forEach(element => {
            dataToWrite += `"${element.id_usuario}","${element.calificacion  || 0}","${element.comentario}",${element.fecha}\n`
        })
        const rutaCompleta = path.join(process.cwd(), 'reportes', name + ".csv")
        await fs.mkdir(path.dirname(rutaCompleta), { recursive: true });
        await fs.writeFile(rutaCompleta, dataToWrite, 'utf8');
    }
}


//{
//     "_id": "68d721383d8ab44ed9fe6a61",
//     "id_usuario": "68d71d793d8ab44ed9fe6912",
//     "id_pelicula": "68d53c07d8921726e1f23ba9",
//     "comentario": "Buena, pero el final pudo ser mejor.",
//     "calificacion": 2,
//     "fecha": "2025-09-23T00:00:00.000Z"
//}