import React, { useState, useEffect } from "react";
// import "../css/Main.css";
import "../css/Carrito.css";

import Swal from "sweetalert2";

const Carrito = ({ carrito, setCarrito }) => {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [total, setTotal] = useState(0); // Estado para el total a pagar

  // Si hay productos en el carrito, mostrar la tabla
  useEffect(() => {
    console.log("Carrito actualizado:", carrito); //  Verifica los productos en la consola

    if (carrito.length > 0) {
      setMostrarCarrito(true);
    } else {
      setMostrarCarrito(false);
    }

    // Calcular el total sumando todos los subtotales
    const nuevoTotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(nuevoTotal);
  }, [carrito]);


  // Función para modificar la cantidad de un producto
  const modificarCantidad = (id, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item
      )
    );
  };

  // Función para eliminar un producto del carrito
  const eliminarProducto = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };


  // Función para realizar el pago con Mercado Pago y enviar los datos a MONGODB
  const realizarPago = async () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "Dibabios's dice",
        text: "❌ No hay productos en el carrito.",
        icon: "error",
        confirmButtonText: "Aceptar",
        allowOutsideClick: false,
        customClass: { popup: "mi-alerta" },
      });
      return;
    }
  
    // 1 Crear el pedido con los productos y el total
    const pedido = {
      productos: carrito.map((item) => ({
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        foto: item.foto,
      })),
      total: total,
      fecha: new Date().toISOString(),
    };
  
    try {
      // 2️ Guardar el pedido en MongoDB
      const respuestaPedido = await fetch(process.env.REACT_APP_API_URL + "/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });
  
      if (!respuestaPedido.ok) {
        throw new Error("Error al registrar el pedido");
      }
  
      const pedidoGuardado = await respuestaPedido.json();
      console.log("Pedido registrado en MongoDB:", pedidoGuardado);
  
      // 3️ Crear la preferencia de pago en Mercado Pago
      const respuestaPago = await fetch(`${process.env.REACT_APP_API_URL}/api/pagos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carrito, total }),
      });
  
      const dataPago = await respuestaPago.json();
  
      if (dataPago.url) {
        // Guardar el estado del carrito en localStorage antes de redirigir
        localStorage.setItem("carritoPagado", JSON.stringify(carrito));
  
        // 4️ Redirigir al usuario a la URL de pago de Mercado Pago
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
  
  // 5️ Revisar si el pago fue exitoso y vaciar el carrito al volver a la app
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pagoExitoso = urlParams.get("status") === "approved"; // Mercado Pago devuelve "approved" si el pago fue exitoso
  
    if (pagoExitoso) {
      // Verificar si había un carrito antes del pago y vaciarlo
      if (localStorage.getItem("carritoPagado")) {
        setCarrito([]);
        localStorage.removeItem("carritoPagado");
      }
  
      Swal.fire({
        title: "Dibabios's dice",
        text: "✅ Pago exitoso. ¡Gracias por tu compra!",
        icon: "success",
        confirmButtonText: "Aceptar",
        allowOutsideClick: false,
      });
    }
  }, []);
  
  

  return (
    <div className="carrito-container">
      <h2>🛒 Carrito de Compras</h2>

      {!mostrarCarrito ? (
        <p>🛍️ Ningún producto seleccionado</p>
      ) : (
        carrito.length === 0 ? (
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
                  <th>Precio Total</th>
                </tr>
              </thead>
              <tbody>
                {/* {carrito.map((item) => ( */}
                {carrito.map((item, index) => (
                  //  <tr key={item.id}> 
                  <tr key={item.id || index}>  {/*  Si el id está vacío, usa el índice temporalmente */}
                    <td>{ (item._id ? item._id.slice(-4) : "N/A")}</td> {/* Asegurarse de mostrar el _id si no existe id */}
                    <td>{item.nombre}</td>
                    <td>
                      <img src={item.foto} alt={item.nombre} className="foto-carrito"/>
                    </td>
                    <td>$ {item.precio}</td>
                    <td>
                      <button onClick={() => modificarCantidad(item.id || item._id, item.cantidad - 1)} className="btn-menos">-</button>
                      <span className="cantidad-texto">{item.cantidad}</span>
                      <button onClick={() => modificarCantidad(item.id || item._id, item.cantidad + 1)} className="btn-mas">+</button>
                    </td>
                    <td>$ {item.precio * item.cantidad}</td>
                    <td>
                      <button className="eliminar-btn" onClick={() => eliminarProducto(item.id || item._id)}>🗑️ Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total + Botón de Pagar en la misma línea */}
            <div className="total-carrito">
              <h3>Total a pagar: $ {total}</h3>
              <button className="pagar-btn" onClick={realizarPago}>💳 Pagar</button>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Carrito;


