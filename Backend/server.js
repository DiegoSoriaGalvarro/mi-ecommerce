import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; // Importar conexión MongoDB
import dotenv from 'dotenv'; 

import usuarioRoutes from "./routes/usuarioRoutes.js"; // 
import productoRoutes from "./routes/productoRoutes.js"; // 
import pedidoRoutes from "./routes/pedidoRoutes.js"; // 
import pagosRoutes from "./routes/pagosRoutes.js"; // 


dotenv.config(); // Cargar variables de entorno

const app = express();
connectDB();

// Habilitar CORS
const allowedOrigins = [
  "https://difabios-tienda.glitch.me",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  }
}));
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/pagos", pagosRoutes);

app.get("/", (req, res) => {
  res.send("API en ejecución...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));

