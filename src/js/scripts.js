import { gestionarFormRegistro } from "./modules/forms.js";
import { validarContrasena, validarMail } from "./modules/forms_validation.js";
import { gestionarPersonajes } from "./modules/personajes.js";
import { gestionarAdmin } from "./modules/admin.js";
import { gestionarToken, iniciarUsuario } from "./modules/auth.js";

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
      //Aquí inicializo los tooltips.
      $('[data-toggle="tooltip"]').tooltip();
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
      validarMail(usuario) == "VALIDATED"  //&&
      //validarContrasena(contrasena) == "VALIDATED"
    ) {
      //Sólo compruebo que sean viables, al no existir base de datos.
      //mostrarLogIn(usuario);
      iniciarUsuario(usuario, contrasena);
    } else {
      console.log("Aviso por consola: log in incorrecto.");
      //TODO: decidir q hago
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

/**
 * Indica y oculta los casos de log in realizados con éxito.
 * @param {String} usuario (con su nombre)
 */
function mostrarLogIn(usuario) {
  document.getElementById("avisoDiv").classList.remove("d-none");
  document.getElementById("avisoDiv").innerHTML = "<div class='container text-center'><h3>Bienvenido de vuelta, " + usuario + ".</h3>";
  //Cierro el dropdown del menú log in sin tocarlo:
  $('.dropdown-toggle').dropdown('toggle');
  setTimeout(function () {
    document.getElementById("avisoDiv").classList.add("d-none");
    // Cuando haya que hacer el submit, pero no en esta práctica, continuar:
    // document.getElementById("logInForm").submit();
  }, 5000);
}
