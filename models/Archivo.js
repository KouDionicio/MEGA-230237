import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';
import Usuario from './Usuario.js';

const Archivo = sequelize.define('Archivo', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
});

Archivo.belongsTo(Usuario, { foreignKey: 'uploadedBy' });

export default Archivo;
