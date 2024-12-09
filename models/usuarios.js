import mongoose from "mongoose";

const usuarioschema = new mongoose.Schema({
    nombre: String,
    email:{type:String, required:true},
    contraseña:{type:String, required: true},
    estado:{type:Number, required:true, default:1}
})

const usuariosModel = mongoose.model("usuarios", usuarioschema)
export default usuariosModel