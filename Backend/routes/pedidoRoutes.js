import express from 'express';
import { crearPedido, obtenerPedidos, obtenerPedidoPorId } from "../controladores/pedidoControlador.js";

const router = express.Router();

router.post("/", crearPedido);
router.get("/", obtenerPedidos);
router.get("/:id", obtenerPedidoPorId);

export default router;
