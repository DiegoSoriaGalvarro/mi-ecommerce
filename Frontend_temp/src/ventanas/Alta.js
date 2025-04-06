import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../css/Main.css";
import "../css/Alta.css";

const API_URL = process.env.REACT_APP_API_URL + "/api/productos";

const Alta = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    foto: "",
    precio: "",
    detalle: "",
    categoria: "",
    // cantidad: "",

  });

  // Función para obtener productos de mockapi.io
  const obtenerProductos = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos(); // Cargar productos al montar el componente
  }, []);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para agregar un producto
  const agregarProducto = async (e) => {
    e.preventDefault();
    console.log("Estado del formulario antes de enviar:", formData);

    try {
      const response = await axios.post(API_URL, formData);
      setProductos([...productos, response.data]); // Agregar nuevo producto a la tabla

      setFormData({ nombre: "", foto: "", precio: "", detalle: "", categoria: "" }); // Resetear formulario
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProductos(productos.filter((producto) => producto._id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // Obtiene el archivo arrastrado

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, foto: event.target.result })); // Guarda la URL en el estado
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Evita que el navegador abra la imagen en una nueva pestaña
  };

  return (
    <div>
      <h1>"Alta"</h1>
      <form onSubmit={agregarProducto} className="alta-form">
        <div className="input-group">
          <label htmlFor="categorias">Categoría</label>
          <select name="categoria" value={formData.categoria} onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="ESPECIALES">ESPECIALES</option>
            <option value="PAN MADRE">PAN MADRE</option>
            <option value="PASTELERIA">PASTELERIA</option>
            <option value="SIN GLUTEN">SIN GLUTEN</option>
            <option value="ALIMENTOS">ALIMENTOS</option>
            <option value="ALMACEN">ALMACEN</option>
            <option value="GALLES & SNACKS">GALLES & SNACKS</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="nombre">Nombre</label>
          <input name="nombre" type="text" value={formData.nombre} onChange={handleChange} />
        </div>

        <div
          className="input-group drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor="foto">Foto</label>
          <input
            name="foto"
            type="text"
            value={formData.foto}
            onChange={handleChange}
            placeholder="Pega una URL o arrastra una imagen"
          />
          {formData.foto && <img src={formData.foto} alt="Previsualización" width="100" />}
        </div>

        <div className="input-group">
          <label htmlFor="precio">Precio</label>
          <input name="precio" type="number" value={formData.precio} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label htmlFor="detalle">Detalles</label>
          <textarea name="detalle" value={formData.detalle} onChange={handleChange}></textarea>
        </div>

        {/* <div className="input-group">
          <label htmlFor="cantidad">Cantidad</label>
          <input name="cantidad" type="number" value={formData.cantidad} onChange={handleChange} />
        </div> */}

        <button id="btn-agregar" type="submit">Agregar</button>
      </form>

      <h2>Lista de productos disponibles</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Nombre</th>
            <th>Foto</th>

            <th>Precio</th>
            <th>Detalles</th>
            {/* <th>Cantidad</th> */}
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.categoria}</td>
              <td>{producto.nombre}</td>
              <td>
                <img src={producto.foto} alt={producto.nombre} width="50" />
              </td>

              <td>${producto.precio}</td>
              <td>{producto.detalle}</td>
              {/* <td>{producto.cantidad}</td> */}
              <td>
                <button className="btn-eliminar" onClick={() => eliminarProducto(producto._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alta;
