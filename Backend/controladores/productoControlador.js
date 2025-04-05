// const Producto = require("../modelos/Producto");
import Producto from "../modelos/Producto.js";

export const crearProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear producto" });
  }
};

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();

    // Asegurar que cada producto tenga `id` además de `_id`
    const productosConId = productos.map((producto) => ({
      ...producto.toObject(),
      id: producto._id, // Agregar `id` con el mismo valor que `_id`
    }));

    res.json(productosConId);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener productos" });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });

    // Agregar `id` además de `_id`
    const productoConId = {
      ...producto.toObject(),
      id: producto._id,
    };

    res.json(productoConId);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });
    res.json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar producto" });
  }
};
