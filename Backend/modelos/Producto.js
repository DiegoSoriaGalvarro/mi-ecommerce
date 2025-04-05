// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const ProductoSchema = new Schema({
  categoria: { type: String, required: true },
  nombre: { type: String, required: true },
  foto: { type: String },
  precio: { type: Number, required: true },
  detalle: { type: String, required: true },
  cantidad: { type: Number, default: 1 }
  
  
});

const Producto = mongoose.model('Producto', ProductoSchema);
// module.exports = Producto;
export default Producto
