// const Pedido = require("../modelos/Pedido");
import Pedido from "../modelos/Pedido.js";

export const crearPedido = async (req, res) => {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear pedido" });
  }
};

export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate("usuario productos.producto");
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener pedidos" });
  }
};

export const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate("usuario productos.producto");
    if (!pedido) return res.status(404).json({ msg: "Pedido no encontrado" });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener pedido" });
  }
};
