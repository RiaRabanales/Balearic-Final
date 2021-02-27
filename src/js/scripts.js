import { gestionarFormRegistro } from "./modules/forms.js";
import { validarMail } from "./modules/forms_validation.js";
import { gestionarPersonajes } from "./modules/personajes.js";
import { gestionarAdmin } from "./modules/admin.js";
import { gestionarToken, iniciarUsuario, setCookie, getCookie } from "./modules/auth.js";

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
    })
    .then(() => {
      //Aquí inicializo los tooltips y popovers de Bootstrap:
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
      //Aquí creo el evento para logout, cuando proceda, y miro si se tiene que ver logIn o logOut:
      document.getElementById("navLogout").addEventListener("click", realizarLogout);
      gestionarLog();
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
  } else if (window.location.href.indexOf("admin") > -1) {
    gestionarAdmin();
  } else if (window.location.href.indexOf("ok") > -1) {
    gestionarToken();
  }
});

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
    document.getElementById("liPasswIcono").classList.add("text-primary");
  });
  document.getElementById("liPasswIcono").addEventListener("mouseout", () => {
    visualizarContrasena("liPassw");
    document.getElementById("liPasswIcono").classList.remove("text-primary");
  });

  document.getElementById("logInButton").addEventListener("click", () => {
    let usuario = document.getElementById("liMail").value;
    let contrasena = document.getElementById("liPassw").value;
    // Si es administrador va a la pantalla Admin; si está bien avisa y entra; si no no hace nada.
    if (usuario == "admin" && contrasena == "admin1234") {
      window.location.href = "../src/admin.html";
    } else if (
      validarMail(usuario) == "VALIDATED"
    ) {
      //Sólo compruebo que sean viables:
      iniciarUsuario(usuario, contrasena);
    } else {
      console.log("Aviso por consola: log in incorrecto.");
      //Aquí incluyo un alert:
      document.getElementById("alertWarning").innerHTML = "¡Log-in incorrecto!";
      document.getElementById("alertWarning").classList.remove("d-none");
      setTimeout(function () {
        document.getElementById("alertWarning").classList.add("d-none");
      }, 6000);
    }
  });
}

/**
 * Muestra u oculta la contraseña escrita por el usuario.
 * @param {String} idPassw contraseña escrita en el campo de input
 */
export function visualizarContrasena(idPassw) {
  let tipoPassw = document.getElementById(idPassw).type;
  if (tipoPassw === "password") {
    document.getElementById(idPassw).type = "text";
  } else {
    document.getElementById(idPassw).type = "password";
  }
}

function realizarLogout() {
  setCookie("authToken", "", 0);
}

function gestionarLog() {
  let authToken = getCookie("authToken");
  if (authToken == "") {
    document.getElementById("navLogin").classList.remove("d-none");
    document.getElementById("navLogout").classList.add("d-none");
  } else {
    document.getElementById("navLogin").classList.add("d-none");
    document.getElementById("navLogout").classList.remove("d-none");
  }
}
