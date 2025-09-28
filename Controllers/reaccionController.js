import { reaccion } from "../Models/reaccionModel.js";
const reaccion = new reaccion()


export class reaccionController{
    async createReaccion(req){
        const result = await reaccion.create(req)
        return result
    }

    async listReacciones(){
        const result = await reaccion.list()
        return result
    }
    
    async updateReacciones(id,req){
        const result = await reaccion.update(id,req)
        return result
    }

    async deleteReaccion(id){
        const result = await reaccion.delete(id)
        return result
    }
}