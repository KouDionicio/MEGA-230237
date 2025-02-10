import express from 'express';
import path from 'path';
import sequelize from './db/config.js';
import authRoutes from './routes/authRoutes.js'; 
import Usuario from './models/Usuario.js'; 

const app = express();


const __dirname = path.resolve(); 

// Configurar la ruta de vistas correctamente
const vistasPath = path.join(__dirname, 'vistas'); // Usamos path.join para evitar problemas

console.log('Ruta de vistas:', vistasPath); 

app.set('views', vistasPath);

// Establecemos el motor de vistas
app.set('view engine', 'pug');

// Middleware para procesar datos JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establecemos la ruta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/users', authRoutes);

// Ruta para la vista de registro
app.get('/registro', (req, res) => {
  res.render('registro'); 
});

app.get('/inicio', (req, res) => {
  res.render('inicio'); 
});


(async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Conexión a la base de datos establecida.');

    // Sincroniza el modelo con la base de datos
    await sequelize.sync({ force: false }); 
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
})();

// Puerto
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
