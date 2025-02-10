import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  try {
    const existingUser = await Usuario.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Usuario.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

export default router;

