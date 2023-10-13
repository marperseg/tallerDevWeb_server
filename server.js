import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import dotenv from 'dotenv';
import { guardarMensaje, procesarMensaje } from './controladores.js';

// Configurar express.js
const app = express();

// Incluir middlewares globales
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));

const port = 8468;

// Hora de solicitud
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

app.get('/getCV', (req, res) => {
  res.status(200).sendFile('/opt/render/project/src/files/CV.pdf', (err) => {
    if (err) {
      console.log(err);
      res.status(404).json({
        estado: 'Recurso no encontrado',
        mensaje: 'Archivo no encontrado.',
        err: err,
      });
    }
  });
});

app.post('/postMensaje', (req, res) => {
  const mensaje = procesarMensaje(req.body);

  guardarMensaje(mensaje)
    .then(() => {
      res.status(201).json({
        code: 201,
        estado: 'Éxito',
        mensaje: 'Mensaje recibido correctamente.',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        code: 500,
        estado: 'Error interno del servidor',
        mensaje: 'Error al recibir el mensaje.',
      });
    });
});

// Levantar servidor
app.listen(port, () => {
  console.log('El servidor está funcionando en el puerto: ', port);
});
