import fs from 'fs';
import util from 'util';

const file = './mensajes.dat';
const appendFileProm = util.promisify(fs.appendFile);

// Procesar el mensaje: agregarle un atributo con la fecha.
function procesarMensaje(body) {
  const mensaje = body;
  mensaje.fecha = new Date().toISOString();
  //   console.log(mensaje);
  return mensaje;
}

// Guardar el mensaje en un archivo (DB mock).
async function guardarMensaje(mensaje) {
  await appendFileProm(file, JSON.stringify(mensaje, null, ' '));
}

export { guardarMensaje, procesarMensaje };
