# Balearic-Final
Repositorio para el proyecto final Balearic Build v4.0

### Autor:
María Rabanales

### Colecciones de POSTMAN:
Siguiendo el enunciado, se han creado dos colecciones de Postman y guardado junto con los archivos de base en el directorio /APIS. Sus enlaces son los siguientes:
* [API CRUD](https://github.com/RiaRabanales/Balearic-Final/tree/main/resources/apis/crud)
* [API JWT](https://github.com/RiaRabanales/Balearic-Final/tree/main/resources/apis/jwt)

### Tecnologías:
* HTML
* Bootstrap 4.5
* CSS
* SCSS/SASS
* JavaScript
* Gulp
* Markdown
* JQuery (marginal)

### Observaciones iniciales:
He elaborado un pequeño vídeo explicativo; está colgado [como vídeo de Youtube](https://youtu.be/tBVdwng6tDM).

He aprovechado esta práctica para realizar algunas modificaciones y mejoras en el contenido de la práctica 3, siguiendo los problemas encontrados en la corrección. A título de ejemplo, los mensajes de error en nombres y apellidos desaparecen correctamente cuando procede.

He eliminado las páginas y scripts exclusivos del juego y los he sustituído por una pequeña página genérica. También he creado una pequeña página (*ok.html*) sin un uso más allá que ayudarme durante el proceso de programación: me indica cuándo se ha realizado un registro/login con éxito y me muestra cómodamente el token del usuario. He decidido mantenerla en la entrega ya que es relativamente útil.

En todo momento he seguido los criterios de diseño, usabilidad y accesibilidad que hemos visto en clase, y he trabajado buscando la máxima responsividad, teniendo en cuenta el diseño *móvil* desde el principio.

### Cambios respecto al diseño original:
El principal cambio en la página principal ha sido una pequeña reorganización del contenido de *header* y *footer*: si bien he mantenido el concepto original, he decidido pasar el e-mail de contacto de la parte superior a la inferior. De esta manera puedo mantener todos los links de la barra de navegación sin que el contenido de esta resulte demasiado denso. El footer me parece básico, al incluir más *links*, de manera que en buena parte de las páginas (con alguna excepción, como en registro de usuario) ha pasado a estar permanentemente fijo en la zona inferior. Siguiendo las instrucciones, he eliminado el aviso de *cookies*.

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
3. CARDS: en la página de personajes, y, por supuesto, en el acordeón.
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
14. COLLAPSE/ACCORDIONS: en el contenido de la página de inicio (sección inferior). De entrada, el primer elemento del acordeón se muestra, mientras que el segundo está *collapsed*.
15. INPUT GROUP: si bien no se solicitaba en el enunciado, su uso es habitual en páginas web de internet y me ha parecido interesante estudiarlo; hay varios en las contraseñas del formulario de registro.


Siempre que ha sido posible he modificado el css y los scripts originales para adaptarlos a las clases de Bootstrap. Me parece interesante destacar el uso creciente que he ido haciendo de la clase bootstrap *display-none* (d-none); incluirla y retirarla para mostrar y ocultar elementos a través de su clase ha sido una actividad continua en mi desarrollo de javascript.

A título de ejemplo cabe ver el tratamiento del *alert* de error al hacer un log-in incorrecto, que aparece debajo de la barra de navegación en todas las páginas y desaparece a los 6 segundos. Este código se encuentra en la función *gestionarLogin* del archivo main.js:

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

### Gulp
He intentado nuevamente aplicar Gulp a mi proyecto. Siguiendo las instrucciones([1](https://github.com/classicoman2/guide-gulp-minify)-[2](https://github.com/classicoman2/gulp-dev-prod)) vistas en clase (pero copiando mis módulos .js a mano dentro de la carpeta dist/) he creado los archivos gulpfile.js y package.json, instalado las dependencias y, aquí, encontrado un problema: si bien gulp build funcionaba correctamente, las imágenes no se minificaban como tocaba. El proyecto funcionaba, pero no los url de las imágenes: aparecía sólo el texto ALT.
![Gulp: no minify](https://i.ibb.co/P12CgrS/Capture.jpg)

Tras investigar la situación vi que el problema estaba en la distribución original de mi proyecto: las imágenes estaban guardadas directamente en la carpeta images, en vez de dentro de assets/images.

Además, mi archivo principal .js se llamaba *scripts.js*, con lo que al reconvertirse en *main.js* los enlaces e imports/exports al mismo dejaban de funcionar.

Tras arreglar estos problemas he logrado que Gulp funcione correctamente, y se puede trabajar *live* con el proyecto desde dist/index.html.

### Bootstrap vs SCSS:
Dado que algunos efectos (por ejemplo, la rotación de las imágenes) no se pueden hacer bien en Bootstrap, he decidido mantener tres archivos scss:
1. custom.scss: sobreescribe las clases de bootstrap (*theming*) e importa los otros dos archivos.
2. colors.scss: unifica los colores por separado.
3. styles.scss: mantiene los elementos css independientes de bootstrap.

Respecto al *theming*, he seguido la opción *a*; la opción *b* me dio numerosos problemas en torno a las fechas del examen.

### Página de ADMIN:
Cuando en el formulario de *log-in* se introduce el usuario *admin* y la contraseña *admin1234* se entra en una pequeña página de administración a la que es imposible acceder de otra manera. Cabe destacar que este pseudo-login no implica obtener un token, de manera que como admin no se podrán ver los personajes.

La página de administración muestra, como elemento central, una tabla con las construcciones del juego. Cada fila de la tabla es una construcción: se ve su id (en la pseudo-base de datos), su nombre, su tamaño, y una casilla con botones de apoyo: botón para visualizar su imagen (que se abre en un modal), botón para ver todos los datos del edificio, botón para modificarlos, y botón para eliminar la propia construcción.

Para visualizar la imagen, y tras investigar sobre el tema, he optado por no emplear el método *blob* visto en clase, aunque inicialmente sí lo hice: esto se debe a que obtener la imagen por blob tarda mucho comparado con el método empleado finalmente, por lo que no resulta apropiado para una página moderna.

Esta página tiene, además, un buscador de construcciones (por id o nombre), siguiendo una de las ampliaciones sugeridas en el enunciado, y un botón para añadir nuevas construcciones.

El botón para añadir nuevas construcciones abre un formulario que permite introducir los datos del nuevo edificio y después grabarlos. Esto llama a una función del archivo *admin.js* que emplea *fetch* de la siguiente manera:

~~~
function addConstruccion() {
  fetch("http://localhost:3000/construccions", {
    method: "POST",
    body: JSON.stringify({
      nom: document.getElementById("fcNombre").value,
      y: document.getElementById("fcY").value,
      x: document.getElementById("fcX").value,
      img: document.getElementById("fcImg").value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json)); //lo mantengo para facilitarme el trabajo
}
~~~

### Página de personajes:
La página de personajes es, junto con el formulario de registro y la página principal, la que más se ha modificado durante esta práctica.

Para ver el contenido de la página hace falta un token; es necesario haber hecho login o registro previo. De lo contrario, la página sólo muestra un mensaje informativo.

Cuando se tiene el token, se muestra en la parte superior un carrusel interactivo de personajes. En la sección inferior de la página se muestran *cards* de bootstrap con la imagen y el nombre de cada personaje, siguiendo las indicaciones del enunciado.

He cambiado un poco la imagen original de la página, porque no resultaba estéticamente agradable (ni fácil de visualizar) tener los *cards* sólo en medio contenedor y el detalle del personaje seleccionado en la otra mitad. En vez de esto cuando se selecciona un personaje (haciendo click con el ratón sobre su *card*) se abre un modal con su imagen, su nombre, y su motto.

### Formulario de registro: validación.
Para reconstruir con Bootstrap la validación del formulario de registro he tenido que decidir, en primer lugar, si mantendría la validación en mi documento js o si la pasaría plenamente al frontal; para aprovechar el código ya elaborado en ejercicios anteriores he elegido la primera opción, emulando [una validación por el lado del servidor](https://mdbootstrap.com/docs/standard/forms/validation/#section-server-side). La principal implicación de esto es que no he tenido que marcar el formulario con *class="needs-validation" novalidate*.

Para aprovechar las clases de Bootstrap he decicido replantear los errores de la siguiente manera:

~~~
<span id="suUsernameError" class="invalid-feedback"></span>
~~~

Pero no he visto la necesidad de crear elementos para marcar el feedback correcto, que ya se señalará de por sí cambiando el borde de cada input cuando proceda.

He desarrollado las marcas de validaciones siguiendo el *modus operandi* de añadir y quitar clases de Bootstrap vía .js. De esta manera, y a título de ejemplo, la función para marcar un input inválido (en el módulo forms.js) queda como sigue:

~~~
function marcarInputCorrecto(miInput, miInputError) {
  if (miInput == "suPassw" || miInput == "suPassw2") {
    let miInputGroup = miInput + "Group";
    document.getElementById(miInputGroup).classList.remove("is-invalid");
    document.getElementById(miInputGroup).classList.add("is-valid");
  } else {
    document.getElementById(miInput).classList.remove("is-invalid");
    document.getElementById(miInput).classList.add("is-valid");
  }
  document.getElementById(miInputError).innerHTML = "";
  document.getElementById(miInputError).classList.add("d-none");
}
~~~

En este código puede verse uno de los principales problemas a los que me he enfrentado con este código: el tratamiento diferente de los [input-groups](https://getbootstrap.com/docs/4.0/components/input-group/) y los input simples. Durante el desarrollo de la práctica [he marcado este problema con un issue](https://github.com/RiaRabanales/Balearic-Final/issues/6), y tras mucho investigar he concluido que es un problema meramente estético por la versión de Bootstrap; en 5.0 este problema está automáticamente resuelto.

Por último, cabe destacar que he aprovechado el replanteamiento de estas validaciones para solucionar los pequeños problemas encontrados en la corrección de la práctica anterior.