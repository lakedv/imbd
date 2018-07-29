
import Handlebars from 'handlebars';

import template from './template.html';

let database;

let peliculas = [];

export default (_database) => {
	database = _database;
	peliculas = [];
	listarPeliculas();
}

const listarPeliculas = () => {
	const lista = database
					.ref('/peliculas')
					.once("value")
					.then((datos_peliculas) => {
						
						datos_peliculas.forEach((element) => {
							const datosPelicula = element.val();
							datosPelicula.id = element.key;
							peliculas.push(datosPelicula);
						});
						
						render();
					});
}

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ peliculas });
}