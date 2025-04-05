// const mongoose = require("mongoose");
import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema(
  {
    productos: [
      {
        nombre: { type: String, required: true },
        precio: { type: Number, required: true },
        cantidad: { type: Number, required: true },
        foto: { type: String }
      }
    ],
    total: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Pedido", pedidoSchema);
export default mongoose.model("Pedido", pedidoSchema);

