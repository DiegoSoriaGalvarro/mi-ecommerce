import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Carrito.css";
import Swal from "sweetalert2";

const Carrito = ({ carrito, setCarrito }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = Boolean(sessionStorage.getItem("usuarioRol"));

  const [recuperado, setRecuperado] = useState(false);

  // Recuperar carrito del localStorage si está vacío (siempre)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");

    if (status === "approved") {
      // Pago exitoso: limpiar carrito
      localStorage.removeItem("carritoItems");
      localStorage.removeItem("carritoPagado");
      setCarrito([]);
      Swal.fire({
        title: "¡Pago exitoso!",
        text: "✅ Tu compra fue procesada correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        allowOutsideClick: false,
      });
      navigate("/carrito", { replace: true });
    }

    // Recuperar carrito solo una vez
  if (!recuperado && carrito.length === 0) {
    const carritoGuardado = localStorage.getItem("carritoItems");
    if (carritoGuardado) {
      try {
        const parsed = JSON.parse(carritoGuardado);
        if (Array.isArray(parsed)) {
          setCarrito(parsed);
        }
      } catch (err) {
        console.error("Error al recuperar carrito:", err);
      }
    }
    setRecuperado(true);
  }
}, [location.search, carrito, recuperado, setCarrito, navigate]);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("carritoItems", JSON.stringify(carrito));
  }, [carrito]);

  const mostrar_Carrito = carrito;

  const total = mostrar_Carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const modificarCantidad = (id, cantidad) => {
    const updated = mostrar_Carrito.map(item =>
      item.id === id || item._id === id
        ? { ...item, cantidad: Math.max(1, cantidad) }
        : item
    );
    setCarrito(updated);
  };

  const eliminarProducto = (id) => {
    const filtered = mostrar_Carrito.filter(
      item => item.id !== id && item._id !== id
    );
    setCarrito(filtered);
  };

  const realizarPago = async () => {
    if (mostrar_Carrito.length === 0) {
      return Swal.fire({
        title: "Dibabios's dice",
        text: "❌ No hay productos en el carrito.",
        icon: "error",
        confirmButtonText: "Aceptar",
        allowOutsideClick: false,
      });
    }

    const pedido = {
      productos: mostrar_Carrito.map(item => ({
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        foto: item.foto
      })),
      total,
      fecha: new Date().toISOString(),
    };

    try {
      const respPedido = await fetch(
        `${process.env.REACT_APP_API_URL}/api/pedidos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pedido)
        }
      );
      if (!respPedido.ok) throw new Error("Error al registrar el pedido");

      const respPago = await fetch(
        `${process.env.REACT_APP_API_URL}/api/pagos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ carrito: mostrar_Carrito, total })
        }
      );
      const dataPago = await respPago.json();
      if (dataPago.url) {
        localStorage.setItem("carritoPagado", JSON.stringify(mostrar_Carrito));
        window.location.href = dataPago.url;
      } else {
        throw new Error("No se recibió la URL de pago de Mercado Pago");
      }
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      Swal.fire({
        title: "Dibabios's dice",
        text: "❌ Hubo un error al procesar el pago.",
        icon: "error",
        confirmButtonText: "Aceptar",
        allowOutsideClick: false,
      });
    }
  };

  const handlePagarClick = () => {
    if (!isLoggedIn) {
      return Swal.fire({
        title: "Debes iniciar sesión",
        text: "❌ Para proceder al pago, primero inicia sesión",
        icon: "warning",
        confirmButtonText: "Iniciar sesión",
        allowOutsideClick: false,
      }).then(() => navigate("/login"));
    }
    realizarPago();
  };

  return (
    <div className="carrito-container">
      <h2>🛒 Carrito de Compras</h2>
      {mostrar_Carrito.length === 0 ? (
        <p>🛍️ Ningún producto seleccionado</p>
      ) : (
        <>
          <table className="tabla-carrito">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Foto</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th className="precio_total">Precio Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mostrar_Carrito.map((item, i) => (
                <tr key={item.id || item._id || i}>
                  <td>{item._id ? item._id.slice(-4) : item.id}</td>
                  <td>{item.nombre}</td>
                  <td>
                    <img
                      src={item.foto}
                      alt={item.nombre}
                      className="foto-carrito"
                    />
                  </td>
                  <td>$ {item.precio}</td>
                  <td>
                    <button
                      className="btn-menos"
                      onClick={() =>
                        modificarCantidad(item.id || item._id, item.cantidad - 1)
                      }
                    >-</button>
                    <span className="cantidad-texto">{item.cantidad}</span>
                    <button
                      className="btn-mas"
                      onClick={() =>
                        modificarCantidad(item.id || item._id, item.cantidad + 1)
                      }
                    >+</button>
                  </td>
                  <td className="precio_total">
                    $ {item.precio * item.cantidad}
                  </td>
                  <td>
                    <button
                      className="eliminar-btn"
                      onClick={() =>
                        eliminarProducto(item.id || item._id)
                      }
                    >🗑️ Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-carrito">
            <h3>Total a pagar: $ {total}</h3>
            <button
              className={`pagar-btn ${
                !isLoggedIn ? "pagar-btn--disabled" : ""
              }`}
              onClick={handlePagarClick}
              title={!isLoggedIn ? "Debes iniciar sesión" : undefined}
            >
              💳 Pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;





