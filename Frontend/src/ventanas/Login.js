import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import "../css/Main.css";
import "../css/Login.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate(); // Para redirigir después del login

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + "/api/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data); //  para verificar la respuesta

            if (response.ok) {
                //  Guardamos en sessionStorage
                sessionStorage.setItem("usuarioRol", data.usuario.rol);
                sessionStorage.setItem("usuarioNombre", data.usuario.nombre);

                // Mostramos mensaje de éxito
                alert("Inicio de sesión exitoso");

                // Redirigimos al inicio
                navigate("/");

                // Recargamos la página para que Header.js detecte el cambio
                window.location.reload();
            } else {
                alert(data.msg || "Error en el inicio de sesión");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error en el servidor");
        }
    };

    return (
        <div className="body-login">
            <div className="login-container">
                <h1>" LOGIN "</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group-login">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group-login">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit">Ingresar</button>
                </form>

            </div>
            <div id="register">
                <p>si no estás registrado<Link to="/register"> click aquí</Link></p>
            </div>
        </div>

    );
};

export default Login;
