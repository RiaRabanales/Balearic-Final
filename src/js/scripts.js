import gestionarFormRegistro from "./modules/forms.js";
import gestionarPersonajes from "./modules/personajes.js";

//window.addEventListener('load', function(){
$(document).ready(() => {
  //Carga de archivos de header y footer:
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

//TODO por ahora he quitado los checks del formulario de registro

/**
 * Función para mostrar/ocultar el botón scroll to top:
 */
function gestionarBotonTop() {
  var botonTop = document.getElementById("botonTop");

  //Función para que al hacer click vuelva al principio:
  botonTop.addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });

  window.onscroll = function () {
    controlarBotonTop();
  };
}

/**
 * Función para mostrar/ocultar el botón scroll to top:
 */
function controlarBotonTop() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    // o porque depende del navegador: .body para safari, resto para demás
    botonTop.style.display = "block";

    if (screen.width < 800) {
      botonTop.firstChild.data = ""; //oculto el texto del button en móvil
    }
  } else {
    botonTop.style.display = "none";
  }
}

/**
 * Función para gestionar el formulario de login del header:
 */
function gestionarLogIn() {
  document.getElementById("liPasswIcono").addEventListener("mouseover", () => {
    visualizarContrasena("liPassw");
    document.getElementById("liPasswIcono").style.color = "black";
  });
  document.getElementById("liPasswIcono").addEventListener("mouseout", () => {
    visualizarContrasena("liPassw");
    document.getElementById("liPasswIcono").style.color = "grey";
  });

  document.getElementById("logInButton").addEventListener("click", () => {
    let usuario = document.getElementById("liUsername").value;
    let contrasena = document.getElementById("liPassw").value;
    if (usuario == "admin" && contrasena == "admin1234") {
      let miUrl = window.location.href;
      console.log(miUrl);
      window.location.href = "../src/admin.html";
    } else {
      console.log("TODO: log in mal hecho");
      //TODO: q pasa si hace buen login y/o si no
    }
  });
}

/**
 * Muestra u oculta la contraseña escrita por el usuario.
 * @param {String} idPassw contraseña escrita en el campo de input
 */
function visualizarContrasena(idPassw) {
  let tipoPassw = document.getElementById(idPassw).type;
  if (tipoPassw === "password") {
    document.getElementById(idPassw).type = "text";
    document.getElementById(icono).style.display = "none";
    document.getElementById(iconoNo).style.display = "inline";
  } else {
    document.getElementById(idPassw).type = "password";
    document.getElementById(icono).style.display = "inline";
    document.getElementById(iconoNo).style.display = "none";
  }
}
