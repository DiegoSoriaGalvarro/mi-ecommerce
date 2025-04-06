import { Link } from "react-router-dom";
import "../css/Main.css";
import "../css/Inicio.css";

const Inicio = () => {
    return (
        <div>
            <h1>ARTESANAL - NATURAL - SALUDABLE</h1>
            <h2>" Categorías "</h2>
            <ul>
                <li>
                    <Link to="/especiales">
                        <img src="./img/ESPECIALES.png" alt="" />
                    </Link>
                </li>

                <li>
                    <Link to="/pan-madre">
                        <img src="./img/PAN_MADRE.png" alt="" />
                    </Link>
                </li>

                <li>
                    <Link to="/pasteleria">
                        <img src="./img/PASTELERIA.png" alt="" />
                    </Link>
                </li>

                <li>
                    <Link to="/sin-gluten">
                        <img src="./img/SIN_GLUTEN.png" alt="" />
                    </Link>
                </li>

                <li>
                    <Link to="/alimentos">
                        <img src="./img/ALIMENTOS.png" alt="" />
                    </Link>
                </li>

                <li>
                    <Link to="/almacen">
                        <img src="./img/ALMACEN.png" alt="" />
                    </Link>
                </li>

                <li>
                    <Link to="/gallesysnacks">
                        <img src="./img/gallesysnacks.png" alt="" />
                    </Link>
                </li>

            </ul>
            <div className="bienvenida">
                <h3>¡Bienvenidos a nuestra tienda online!</h3>
                <p>
                    Antes de realizar una compra, <Link to="/login">LOGEARSE</Link> o
                    <Link to="/register"> REGISTRARSE</Link> si es tu primera vez.
                </p>
            </div>
        </div>
    );
};

export default Inicio;


