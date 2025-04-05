import express from "express";
import { crearPreferencia } from "../controladores/pagoControlador.js";

const router = express.Router();

router.post("/", crearPreferencia);

export default router;






  