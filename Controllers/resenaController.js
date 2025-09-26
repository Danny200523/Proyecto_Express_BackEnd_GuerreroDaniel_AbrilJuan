import { resena } from "../Models/resenaModel.js";

export class resenaController{
    constructor(){
        this.resena = new resena()
    }
    
    async createResena(req){
        const result = await this.resena.createResena(req)
        return result
    }

    async getAllResenas(){
        const result = await this.resena.getAllResenas()
        return result
    }

    async getResenaByUser(id){
        const result = await this.resena.getResenaById(id)
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