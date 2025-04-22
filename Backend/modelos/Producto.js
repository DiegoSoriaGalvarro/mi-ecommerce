// const mongoose = require('mongoose');
import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  detalle: { type: String, required: true },
  categoria: { type: String, required: true },
  foto: { type: String, required: true }, // importante: base64 o URL
  
});

export default mongoose.model("Producto", productoSchema);
