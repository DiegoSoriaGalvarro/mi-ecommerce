// const mongoose = require("mongoose");
import mongoose from 'mongoose';
// require("dotenv").config(); // Cargar variables de entorno
import dotenv from 'dotenv'; 

dotenv.config(); // Cargar variables de entorno

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB conectado: ${connection.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    process.exit(1); // Detiene el servidor si falla la conexión
  }
};

export default connectDB; 

