import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";





const Header = ({ carrito }) => {
  const [usuarioNombre, setUsuarioNombre] = useState(sessionStorage.getItem("usuarioNombre") || "");
  const [usuarioRol, setUsuarioRol] = useState(sessionStorage.getItem("usuarioRol") || "");

  useEffect(() => {
    const actualizarUsuario = () => {
      const nombre = sessionStorage.getItem("usuarioNombre") || "";
      const rol = sessionStorage.getItem("usuarioRol") || "";
      setUsuarioNombre(nombre);
      setUsuarioRol(rol);
      console.log("Usuario actualizado:", nombre, rol); // Debugging
    };

    // Detectar cambios en sessionStorage
    window.addEventListener("storage", actualizarUsuario);
    return () => window.removeEventListener("storage", actualizarUsuario);
  }, []);

  // Calcular la cantidad total de productos en el carrito
  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);



  return (
    <header>
      <nav>
        <ul id="menu-izquierda">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/delivery">Delivery</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          {/* Mostrar solo si es admin */}
          {usuarioRol === "admin" && <li><Link to="/alta">Alta</Link></li>}

          {/* <li><Link to="/carrito">Carrito</Link></li> */}
        </ul>

        <ul id="menu-derecha">
          <li id="buscar">
            {/* <Link to="/#"> */}
            <img src="/img/logo_buscar.png" alt="" />
            {/* </Link> */}

          </li>
          <li id="login">
            <Link to="/login">
              <img src="./img/logo_usuario.png" alt="Usuario" />
              {usuarioNombre && <small className="refUsuario">{usuarioNombre.substring(0, 3)}</small>}
            </Link>
          </li>
          <li id="carrito">
            <Link to="/carrito">

              <div className="logocarritoheader-container">
                <img src="./img/logo_carrito2.png" alt="Carrito" />
                {totalProductos > 0 && <span className="carrito-contador">{totalProductos}</span>}
              </div>


            </Link>
          </li>


        </ul>
      </nav>
      <div id="logo_head">
        <img src="./img/difabio_logo.jpg" alt="Logo Difabio" />
      </div>
    </header>
  );
};

export default Header;
