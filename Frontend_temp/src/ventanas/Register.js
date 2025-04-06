import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import "../css/Main.css";
import "../css/Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        direccion: "",
        celular: "",
        password: ""
    });

    const navigate = useNavigate(); // Para redirigir después del registro

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch("http://localhost:5000/api/usuarios", {
            const response = await fetch(process.env.REACT_APP_API_URL + "/api/usuarios/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registro exitoso");
                // Guardar las primeras 3 letras del nombre en localStorage
                const nombreCorto = formData.nombre.substring(0, 3).toUpperCase();
                localStorage.setItem("usuarioNombre", nombreCorto);
                navigate("/"); // Redirige a la página principal después de registrarse
            } else {
                alert(data.mensaje || "Error en el registro");
            }
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            alert("Error en el servidor");
        }
    };

    return (
        <div className="body-register">
            <div className="register-container">
                <h1>REGISTER</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    {["nombre", "apellido", "email", "direccion", "celular", "password"].map((field) => (
                        <div className="input-group-register" key={field}>
                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                type={field === "password" ? "password" : "text"}
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <button type="submit">Registrar</button>
                </form>
            </div>
            <div id="login">
                <p>si ya estás regitrado<Link to="/login"> click aquí</Link></p>
            </div>
        </div>
    );
};

export default Register;
