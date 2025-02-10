import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno desde .env

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nombre de la base de datos
  process.env.DB_USER,     // Usuario de la base de datos
  process.env.DB_PASS,     // Contraseña de la base de datos
  {
    host: process.env.DB_HOST,   // Dirección del host
    dialect: 'mysql',            // Usamos MySQL
    port: process.env.DB_PORT,   // Puerto de la base de datos 
  }
);

export default sequelize;

