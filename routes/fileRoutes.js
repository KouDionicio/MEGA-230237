import express from 'express';
import Archivo from '../models/Archivo.js';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// Subir archivo
router.post('/upload', async (req, res) => {
  const { filename, path, userId } = req.body;
  
  try {
    const archivo = await Archivo.create({
      filename,
      path,
      uploadedBy: userId,
    });
    res.status(200).json({ message: 'Archivo subido con éxito', archivo });
  } catch (error) {
    res.status(500).json({ message: 'Error al subir el archivo' });
  }
});

// Eliminar archivo
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const archivo = await Archivo.findByPk(id);
    if (!archivo) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }
    await archivo.destroy();
    res.status(200).json({ message: 'Archivo eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el archivo' });
  }
});

export default router;
