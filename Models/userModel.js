import {connect,disconnect} from '../utils/database.js'


export class modelUser{
    constructor(usuario, contrasena){
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.admin = this.admin
    }
    async findUserByUsuario(id){
        const db = await connect();
        const result = db.collection('USUARIOS').findOne({_id:id});
        return result;
    }
    async updateUser(id,usuario,contrasena){
        const db = await connect();
        const result = db.collection('USUARIOS').updateOne({_id:id},{$set:{usuario:usuario,contrasena:contrasena}});
        return result;
    }
    async deleteUser(id){
        const db = await connect();
        const result = db.collection('USUARIOS').deleteOne({_id:id})
        return result
    }
    async getAllusers(){
        const db = connect();
        const result = db.collection('USUARIOS').find().toArray();
        return result
    }
}
