import Usuario from '../models/Usuario.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Función para registrar un usuario
export const registrarUsuario = async (req, res) => {
    const { nombre_usuario, correo, contrasena } = req.body;

    try {

        // Verificar si el nombre de usuario o correo ya existe
        const usuarioExistente = await Usuario.findOne({
            where: {
                [Op.or]: [{ correo }, { nombre_usuario }],
            },
        });

        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El nombre de usuario o correo ya están en uso.' });
        }

        // Se hace la encriptación de la contraseña
        const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

        // Creación del nuevo usuario
        const nuevoUsuario = await Usuario.create({
            nombre_usuario,
            correo,
            contrasena: contrasenaEncriptada,
        });

        
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
    }
};

// Función para iniciar sesión
export const iniciarSesion = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        // Buscamos al usuario por correo
        const usuario = await Usuario.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas.' });
        }

        // Hacemos una verificación si las contraseñas coinciden
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!contrasenaValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas.' });
        }

        // Creación de un token JWT
        const token = jwt.sign({ id: usuario.id },'secreto',{ expiresIn: '1h' });

        // Enviamos el token como respuesta
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
};
