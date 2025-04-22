import express from 'express';
import multer from "multer";
import { crearProducto, obtenerProductos, obtenerProductoPorId, actualizarProducto, eliminarProducto } from "../controladores/productoControlador.js";

const router = express.Router();

// Configuración básica de multer (guardará en memoria)
const storage = multer.memoryStorage();
const upload = multer({ storage });  

router.post("/", upload.single("fotoArchivo"), crearProducto);
// router.post("/", crearProducto);
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;



