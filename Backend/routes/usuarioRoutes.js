import express from 'express';
import { registrarUsuario, loginUsuario } from "../controladores/usuarioControlador.js";

const router = express.Router();

router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);

export default router;
