import { resena } from "../Models/resenaModel.js";

export class resenaController{
    constructor(){
        this.resena = new resena()
    }
    
    async createResena(id_usuario,id_pelicula,comentario,calificacion){
        const result = await this.resena.createResena(id_usuario,id_pelicula,comentario,calificacion)
        return result
    }

    async getAllResenas(){
        const result = await resena.getAllResenas()
        return result
    }

    async getResenaByMovie(id){
        const result = await this.resena.getResenaByMovie(id)
        return result
    }

    async updateResena(id,req){
        const result = await this.resena.updateResena(id,req)
        return result
    }

    async deleteResena(id){
        const result = await this.resena.deleteResena(id)
        return result
    }
}