import Handlebars from 'handlebars';
import { guid } from '../../utils';

import template from './template.html';

import firebase from 'firebase';


let mensaje = '';

let database;


// Obtener Elementos
let uploader;
let fileButton; 

let storageRef;
let downloadURL; 
let porcentaje;

let _firebase;
let _database;

export default (_database) => {
  database = _database;
  render();
};




const crearNuevaPelicula = (e) => {

  e.preventDefault();

  const pelicula = {
    id: guid(),
    imagen: downloadURL,
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
  createUploader();
}


const createUploader = () => {
  uploader = document.getElementById('uploader');
  fileButton = document.getElementById('fileButton');

  // Vigilar selección archivo
  fileButton.addEventListener('change', function(e) {
  //Obtener archivo
  var file = e.target.files[0];
  // Crear un storage ref
  storageRef = firebase.storage().ref('fotos_peliculas/' + file.name);

  // Subir archivo
  var task = storageRef.put(file);
  // Actualizar barra progreso
  task.on('state_changed',
	function progress(snapshot) {
	  var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // uploader.value = percentage;
    $('#porcentaje')
    .css("width", percentage + "%")
    .attr("aria-valuenow", percentage)
    .text(Math.round(percentage) + "% Complete");
	},
	function error(err) {
    alert("ERROR AL SUBIR IMAGEN")
	},
	function complete() {

    console.log(storageRef.getDownloadURL().then(function(url){
      downloadURL = url; 
    }));
    console.log(file);
    
	}
	)
});


}