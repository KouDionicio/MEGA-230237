import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';
import bcrypt from 'bcrypt';

const Usuario = sequelize.define('Usuario', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',  // Roles: 'user', 'admin'
  },
});

// Hook para encriptar la contraseña antes de guardar el usuario
Usuario.beforeCreate(async (usuario) => {
  const salt = await bcrypt.genSalt(10);  // Generar un salt para la encriptación
  usuario.password = await bcrypt.hash(usuario.password, salt);  // Encriptar la contraseña
});

export default Usuario;
