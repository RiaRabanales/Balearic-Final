# Balearic-Final
Repositorio para el proyecto final Balearic Build v4.0

### Autor:
María Rabanales

### Colecciones de POSTMAN:
Siguiendo el enunciado, se han creado dos colecciones de Postman y guardado junto con los archivos de base en el directorio /APIS. Sus enlaces son los siguientes:
* [API CRUD]()
* [API JWT]()
//TODO completar guardar archivos en carpeta

### Tecnologías:
* HTML
* Bootstrap 4.5
* CSS
* SCSS/SASS
* JavaScript
* Canvas
* Markdown
* JQuery (marginal)

### Observaciones iniciales:
He elaborado un pequeño vídeo explicativo; está colgado [en Youtube](). //TODO COMPLETAR

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
Para poder hacer *theming* he tenido que descargar bootstrap en el proyecto con: *npm install --save-dev bootstrap*. También, aunque dejó de ser un requisito del proyecto cuando ya lo había acabado, he cambiado los iconos Fontawesome por iconos Bootstrap; una vez descargados e importados, no encontré mayor problema en el proceso.

He intentado emplear clases de Bootstrap en todo momento. Para aligerar la carga de trabajo, y aprovechando que se permitía de acuerdo con las instrucciones, he tomado como base y/o inspiración los siguientes ejemplos oficiales:
* navbar-static
* sticky-footer
* checkout


Respecto a los elementos de Bootstrap empleados, he utilizado los siguientes:
1. BUTTONS: en todas las páginas reconstruidas con Bootstrap.
2. BUTTON GROUP: en la página principal (última sección antes del aside) y al final del formulario de registro.
3. CARDS: en la página de personajes.
4. CAROUSEL: en la página de personajes.
5. FORMS: en el registro de usuario y en el dropdown de log-in.
6. DROPDOWNS: en el log-in (en la barra de navegación del header).
7. MODALS: al seleccionar un personaje en la página de personajes, y en la página de administración.
8. NAVBAR: en todas las páginas (en el header) 
9. POPOVER: en la página principal, en el aside, he reconvertido los *rankings* de los colaboradores en un *popover*.
10. TOOLTIPS: en numerosos elementos, entre otros en la página de administración.
11. TABLES: al mostrar los edificios existentes en la página de administración.
12. ALERTS: al hacer log-in con datos incorrectos y no de administrador aparece un alert de error bajo la barra de navegación.
13. BADGES: no tenía mucho sentido incluir este elemento en mi diseño, pero por probarlo lo he empleado en la página 'ok' que he generado, fundamentalmente, para visualizar mis tokens.
* COLLAPSE/ACCORDIONS //TODO
* SCROLLSPY //todo

Siempre que ha sido posible he modificado el css y los scripts originales para adaptarlos a las clases de Bootstrap. Me parece interesante destacar el uso creciente que he ido haciendo de la clase bootstrap *display-none* (d-none); incluirla y retirarla para mostrar y ocultar elementos a través de su clase ha sido una actividad continua en mi desarrollo de javascript.

A título de ejemplo cabe ver el tratamiento del *alert* de error al hacer un log-in incorrecto, que aparece debajo de la barra de navegación en todas las páginas y desaparece a los 6 segundos. Este código se encuentra en la función *gestionarLogin* del archivo scripts.js:

~~~
} else {
      console.log("Aviso por consola: log in incorrecto.");
      //Aquí incluyo un alert:
      document.getElementById("alertWarning").innerHTML = "¡Log-in incorrecto!";
      document.getElementById("alertWarning").classList.remove("d-none");
      setTimeout(function () {
        document.getElementById("alertWarning").classList.add("d-none");
      }, 6000);
    }
~~~

//TODO carrusel y cards en la página de personajes

//TODO validacion de registro con bootstrap