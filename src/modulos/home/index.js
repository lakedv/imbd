

import Handlebars from 'handlebars';
import { guid } from '../../utils';

import template from './template.html';

let mensaje = '';

let database;

export default (_database) => {
  database = _database;
  render();
};

const crearNuevaPelicula = (e) => {

  e.preventDefault();

  const pelicula = {
    id: guid(),
    imagen: document.getElementById('imagen').value,
    titulo: document.getElementById('titulo').value,
    genero: document.getElementById('genero').value,
    duracion: document.getElementById('duracion').value,
    sinopsis: document.getElementById('sinopsis').value,
  };
console.log(pelicula);
  database.ref(`peliculas/${pelicula.id}`).set({
    imagen: pelicula.imagen,
    titulo: pelicula.titulo,
    genero: pelicula.genero,
    duracion: pelicula.duracion,
    sinopsis: pelicula.sinopsis,
  })
  .then(() => {
    mensaje = 'Pelicula agregada correctamente!';
    render();
  });

  return false;
};

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({mensaje});
	document.getElementById('boton-nuevo').onclick = crearNuevaPelicula;
}