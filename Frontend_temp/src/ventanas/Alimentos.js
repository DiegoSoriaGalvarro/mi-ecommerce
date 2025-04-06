import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Card.css";

// const API_URL = "https://674e3eb1635bad45618e1304.mockapi.io/api/productos";
const API_URL = process.env.REACT_APP_API_URL + "/api/productos";

const Alimentos = ({ carrito, setCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [cantidades, setCantidades] = useState({}); // Estado global para las cantidades

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get(API_URL);
        const productosFiltrados = response.data.filter(
          (producto) => producto.categoria === "ALIMENTOS"
        );
        setProductos(productosFiltrados);

        // Inicializar cantidades en 0 para cada producto
        const cantidadesIniciales = {};
        productosFiltrados.forEach((producto) => {
          cantidadesIniciales[producto.id] = 0;
        });
        setCantidades(cantidadesIniciales);

      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    obtenerProductos();
  }, []);

  // Función para manejar cambios en la cantidad
  const handleCantidadChange = (id, nuevaCantidad) => {
    if (nuevaCantidad >= 0 && nuevaCantidad <= 10) {
      setCantidades((prevCantidades) => ({
        ...prevCantidades,
        [id]: nuevaCantidad,
      }));
    }
  };

  // Función para agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    if (cantidades[producto.id] > 0) {
      setCarrito((prevCarrito) => {
        const existeProducto = prevCarrito.find((item) => item.id === producto.id);

        if (existeProducto) {
          // Si ya existe, actualiza la cantidad
          return prevCarrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + cantidades[producto.id] }
              : item
          );
        } else {
          // Si no existe, lo agrega
          return [
            ...prevCarrito,
            {
              ...producto,
              cantidad: cantidades[producto.id],
            },
          ];
        }
      });

      // Resetea la cantidad a 0 después de agregar
      setCantidades((prevCantidades) => ({
        ...prevCantidades,
        [producto.id]: 0,
      }));
    }
  };

  return (
    <div className="section-body-especiales">
      <h2>" Alimentos "</h2>
      <div className="productos-container">
        {productos.map((producto) => (
          <div key={producto.id} className="card">
            <h3>{producto.nombre}</h3>
            <img src={producto.foto} alt={producto.nombre} width="100" />
            <p>$ {producto.precio}</p>
            <p>{producto.detalle}</p>

            <div className="grupo-input">
              <button onClick={() => handleCantidadChange(producto.id, Math.max(0, cantidades[producto.id] - 1))} className="btn-menos">-</button>
              <input
                type="number"
                name="cantidad"
                id={`cantidad-${producto.id}`}
                min="0"
                max="10"
                value={cantidades[producto.id] || 0}
                onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value, 10) || 0)}
              />
              <button onClick={() => handleCantidadChange(producto.id, Math.min(10, cantidades[producto.id] + 1))} className="btn-mas">+</button>
              <button className="btn-carritomas" onClick={() => agregarAlCarrito(producto)}>
                <img src="./img/carritomas.png" alt="logo carrito" className="carritomas" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alimentos;
