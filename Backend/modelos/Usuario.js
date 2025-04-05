// const mongoose = require("mongoose");
import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  telefono: String,
  direccion: String,
  rol: { type: String, enum: ["admin", "usuario"], default: "usuario" }
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);
export default Usuario; 
