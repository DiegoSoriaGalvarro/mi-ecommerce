import Usuario from "../modelos/Usuario.js"; // Importación de Usuario
import bcrypt from "bcryptjs"; // Importación de bcryptjs
import jwt from "jsonwebtoken"; // Importación de jsonwebtoken

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono, direccion } = req.body;

    // Verificar si el usuario ya existe
    let usuario = await Usuario.findOne({ email });
    if (usuario) return res.status(400).json({ msg: "El usuario ya existe" });

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

     // Definir el rol basado en el email que está en la variable de entorno
     const rol = email === process.env.ADMIN_EMAIL ? "admin" : "usuario";

    // Crear usuario
    usuario = new Usuario({
      nombre,
      apellido,
      email,
      password: passwordHash,
      telefono,
      direccion,
      rol, // Se asigna el rol según la validación del email
    });

    await usuario.save();

    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario en la base de datos
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: "Usuario no encontrado" });

    // Validar contraseña
    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) return res.status(400).json({ msg: "Contraseña incorrecta" });

    // Generar token con el rol
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, "secreto", { expiresIn: "2h" });

    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

