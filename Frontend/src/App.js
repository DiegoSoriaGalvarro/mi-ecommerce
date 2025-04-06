
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect  } from "react";

import Header from "./componentes/Header";
import Footer from "./componentes/Footer";

import Inicio from "./ventanas/Inicio";
import Delivery from "./ventanas/Delivery";
import Nosotros from "./ventanas/Nosotros";
import Alta from "./ventanas/Alta";
import Contacto from "./ventanas/Contacto";
import Carrito from "./ventanas/Carrito";
import Especiales from "./ventanas/Especiales";
import PanMadre from "./ventanas/PanMadre";
import Pasteleria from "./ventanas/Pasteleria";
import SinGluten from "./ventanas/SinGluten";
import Alimentos from "./ventanas/Alimentos";
import Almacen from "./ventanas/Almacen";
import GallesySnacks from "./ventanas/GallesySnacks";

import Login from "./ventanas/Login";
import Register from "./ventanas/Register";

function App() {
  const [carrito, setCarrito] = useState([]); // Estado global del carrito
  const [usuarioRol, setUsuarioRol] = useState(sessionStorage.getItem("usuarioRol") || "");

  useEffect(() => {
    setUsuarioRol(sessionStorage.getItem("usuarioRol") || "");
  }, []);

  const agregarAlCarrito = (nuevoProducto) => {
    setCarrito((prevCarrito) => {
      // Asegurarse de que el producto tenga un ID válido (usar `_id` si `id` no existe)
      const productoId = nuevoProducto.id || nuevoProducto._id;
  
      if (!productoId) {
        console.error("El producto no tiene un ID válido:", nuevoProducto);
        return prevCarrito;
      }
  
      const productoExistente = prevCarrito.find((item) => item.id === productoId);
  
      if (productoExistente) {
        const nuevoCarrito = prevCarrito.map((item) =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
        console.log("Carrito actualizado (producto existente):", nuevoCarrito);
        return nuevoCarrito;
      } else {
        const nuevoCarrito = [...prevCarrito, { ...nuevoProducto, id: productoId, cantidad: 1 }];
        console.log("Carrito actualizado (nuevo producto):", nuevoCarrito);
        return nuevoCarrito;
      }
    });
  };
  
  

  
  return (
    <Router>
      <Header carrito={carrito}/>
      <Routes>
        {/* Secciones del encabezado */}
        <Route path="/" element={<Inicio />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        {/* Ruta protegida */}
        <Route path="/alta" element={usuarioRol === "admin" ? <Alta /> : <Navigate to="/" />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />

        {/* Categorías con acceso al carrito */}
        <Route path="/especiales" element={<Especiales carrito={carrito} setCarrito={setCarrito} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/pan-madre" element={<PanMadre carrito={carrito} setCarrito={setCarrito} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/pasteleria" element={<Pasteleria carrito={carrito} setCarrito={setCarrito} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/sin-gluten" element={<SinGluten carrito={carrito} setCarrito={setCarrito} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/alimentos" element={<Alimentos carrito={carrito} setCarrito={setCarrito} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/almacen" element={<Almacen carrito={carrito} setCarrito={setCarrito} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/gallesysnacks" element={<GallesySnacks carrito={carrito} setCarrito={setCarrito} agregarAlCarrito={agregarAlCarrito} />} />

        <Route path="/login" element={<Login setUsuarioRol={setUsuarioRol} />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
