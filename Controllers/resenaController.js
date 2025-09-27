import { resena } from "../Models/resenaModel.js";

const resenaModel = new resena()

export class resenaController{
    async createResena(id_usuario,id_pelicula,comentario,calificacion){
        const result = await resenaModel.createResena(id_usuario,id_pelicula,comentario,calificacion)
        return result
    }

    async getAllResenas(){
        const result = await resenaModel.getAllResenas()
        return result
    }

    async getResenaByMovie(id){
        const result = await resenaModel.getResenaByMovie(id)
        return result
    }

    async updateResena(id,req){
        const result = await resenaModel.updateResena(id,req)
        return result
    }

    async deleteResena(id){
        const result = await resenaModel.deleteResena(id)
        return result
    }
}