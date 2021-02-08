# Balearic-Final
Repositorio para el proyecto final Balearic Build v4.0

### Autor:
María Rabanales

### Tecnologías:
* HTML
* Bootstrap 4.5
* CSS
* SCSS
* JavaScript
* Canvas
* Markdown
* JQuery (marginal)

### Colecciones de POSTMAN:
//TODO

### Observaciones iniciales:
He aprovechado esta práctica para realizar algunas modificaciones y mejoras en el contenido de la práctica 3, siguiendo los problemas encontrados en la corrección. A título de ejemplo, los mensajes de error en nombres y apellidos desaparecen correctamente cuando procede.

He eliminado las páginas y scripts exclusivos del juego y los he sustituído por una pequeña página genérica.

En todo momento he seguido los criterios de diseño, usabilidad y accesibilidad que hemos visto en clase, y he trabajado buscando la máxima responsividad, teniendo en cuenta el diseño *móvil* desde el principio.

### Cambios respecto al diseño original:
El principal cambio en la página principal ha sido una pequeña reorganización del contenido de *header* y *footer*: si bien he mantenido el concepto original, he decidido pasar el e-mail de contacto de la parte superior a la inferior. De esta manera puedo mantener todos los links de la barra de navegación sin que el contenido de esta resulte demasiado denso.

Aparte, he decidido emplear la etiqueta 'disabled' para los links no utilizables de la barra de navegación.

Respecto a la carga de estos elementos, que daba algunos problemas en el proyecto original, he aprovechado para cambiarla y, ya que estaba, aplicar lo aprendido en temas de *fetch*. La idea surgió investigando [diferentes maneras de incluir contenido HTML en Javascript](https://css-tricks.com/the-simplest-ways-to-handle-html-includes/), y ha implicado un cambio importante en la función de carga inicial que me ha permitido retirar el código que llevábamos arrastrando desde la práctica en pareja.

Así, he pasado de este fragmento de código:
~~~
$(document).ready(() => {
  /* $("head").load("head.html"); No utilizar, no carga bien */
  $("footer").load("footer.html");
  $("header").load("header.html", start);
});
~~~

A este otro, más interesante y que me permite enlazar otras funcionalidades a la carga:
~~~
$(document).ready(() => {
  fetch("./header.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("header").innerHTML = data;
    })
    .then(() => {
      gestionarLogIn();
    });

  fetch("./footer.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("footer").innerHTML = data;
    })
    .then(() => {
      gestionarBotonTop();
    });

  if (window.location.href.indexOf("registro") > -1) {
    gestionarFormRegistro();
  } else if (window.location.href.indexOf("personajes") > -1) {
    gestionarPersonajes();
  }
});
~~~

También he cambiado como se muestra mi formulario de registro, que estaba en un *overlay*. Ahora, siguiendo las ultimas instrucciones de esa práctica, se abre en una página completamente nueva.

### Bootstrap
Para poder hacer *theming* he tenido que descargar bootstrap en el proyecto con: *npm install --save-dev bootstrap*



He intentado emplear clases de Bootstrap en todo momento. Para aligerar la carga de trabajo, y aprovechando que se permitía de acuerdo con las instrucciones, he tomado como base y/o inspiración los siguientes ejemplos oficiales:
* navbar-static
* sticky-footer
* checkout

Respecto a los elementos de Bootstrap empleados, he utilizado los siguientes:

//TODO

Siempre que ha sido posible he modificado el css y los scripts originales para adaptarlos a las clases de Bootstrap. //TODO display-none


//TODO COMPLETAR