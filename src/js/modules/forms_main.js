import {
  validarUsuario,
  validarContrasena,
  validarEdad,
} from "./forms_validation.mjs";

import {
  generarHtmlSignUp,
  generarHtmlPaises,
  generarHtmlLogIn,
  generarConfirmacionSignUp,
  generarConfirmacionLogIn,
  generarErrorLogIn,
} from "./forms_html.js";

import {
  generarArrayParaValidacion,
  arrayInputIds,
  generarUsername,
  generarPassw,
  generarPassw2,
  generarTelf,
  generarMail,
  generarMail2
} from "./forms_validationArray.js";

/**
 * Genera y carga los formularios cuando se abre la página.
 */
export function cargarFormularios() {
  cargarFormSignUp();
  cargarFormLogIn();
}

/**
 * Carga el formulario de subscripción y define los event handlers que procede.
 */
function cargarFormSignUp() {
  document.getElementById("signUpOverlay").innerHTML = generarHtmlSignUp();
  generarHtmlPaises();

  /**** EVENT HANDLERS DEL FORMULARIO DE SUSCRIPCIÓN ****/
  // Event handlers para focus in de los distintos inputs:
  arrayInputIds.forEach((elemento) => {
    document.getElementById(elemento).addEventListener("focusin", (e) => {
      e.target.style.background = "rgba(142, 35, 27, 0.5)";
    });
  });

  // Event handler de nombre de usuario:
  document.getElementById("suUsername").addEventListener("focusout", (e) => {
    gestionarValidacionInput(generarUsername());
    e.target.style.background = "";
  });

  //Event handlers de contraseñas y ojos para visualización:
  document.getElementById("suPassw").addEventListener("focusout", (e) => {
    gestionarValidacionInput(generarPassw());
    e.target.style.background = "";
  });

  document.getElementById("suPasswIcono").addEventListener("click", () => {
    visualizarContrasena("suPassw");
  });

  document.getElementById("suPasswIconoNo").addEventListener("click", () => {
    visualizarContrasena("suPassw");
  });

  document.getElementById("suPassw2").addEventListener("focusout", (e) => {
    gestionarValidacionInput(generarPassw2());
    e.target.style.background = "";
  });

  document.getElementById("suPasswIcono2").addEventListener("click", () => {
    visualizarContrasena("suPassw2");
  });

  document.getElementById("suPasswIconoNo2").addEventListener("click", () => {
    visualizarContrasena("suPassw2");
  });

  //Event handlers de nombre y apellidos: se validan al submit.
  document.getElementById("suName").addEventListener("focusout", (e) => {
    e.target.style.background = "";
  });

  document.getElementById("suSurname").addEventListener("focusout", (e) => {
    e.target.style.background = "";
  });

  //Event handler de teléfono:
  document.getElementById("suTelf").addEventListener("focusout", (e) => {
    gestionarValidacionInput(generarTelf());
    e.target.style.background = "";
  });

  //Event handlers de E-mail:
  document.getElementById("suMail").addEventListener("focusout", (e) => {
    gestionarValidacionInput(generarMail());
    e.target.style.background = "";
  });

  document.getElementById("suMail2").addEventListener("focusout", (e) => {
    gestionarValidacionInput(generarMail2());
    e.target.style.background = "";
  });

  //Event handlers de edad: se marca el botón al hacer click en el label
  document.getElementById("suAgeMenorLabel").addEventListener("click", () => {
    document.getElementById("suAgeMenor").checked = true;
  });

  document.getElementById("suAgeMayorLabel").addEventListener("click", () => {
    document.getElementById("suAgeMayor").checked = true;
  });

  //Event handler de envío:
  document.getElementById("signUpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let formValidado = validarSubmit(true);
    if (formValidado) {
      //Muestro los datos del nuevo usuario por consola como indica el enunciado; no hago submit para no perderlos.
      let nuevoUsuario = generarUsuario();
      console.log(nuevoUsuario);
      gestionarSignUp();
      //Cierro este formulario y abro el aviso.
      //Esta ventana informa de la correcta subscripción y se cierra automáticamente:
      document.getElementById(
        "avisoOverlay"
      ).innerHTML = generarConfirmacionSignUp(nuevoUsuario.username);
      document.getElementById("avisoOverlay").style.display = "block";
      setTimeout(function () {
        document.getElementById("avisoOverlay").style.display = "none";
      }, 5000);
    }
  });

  document.getElementById("suClose").addEventListener("click", gestionarSignUp);
  document.getElementById("suCloseX").addEventListener("click", gestionarSignUp);
}

/**
 * Carga el formulario de log in y define los event handlers que procede.
 */
function cargarFormLogIn() {
  document.getElementById("logInOverlay").innerHTML = generarHtmlLogIn();

  //Aquí añado los event handlers:
  document.getElementById("liUsername").addEventListener("focusin", (e) => {
    e.target.style.background = "lightgrey";
  });
  document.getElementById("liUsername").addEventListener("focusout", (e) => {
    e.target.style.background = "";
  });

  document.getElementById("liPassw").addEventListener("focusin", (e) => {
    e.target.style.background = "lightgrey";
  });
  document.getElementById("liPassw").addEventListener("focusout", (e) => {
    e.target.style.background = "";
  });

  document.getElementById("liPasswIcono").addEventListener("mouseover", () => {
    visualizarContrasena("liPassw");
    document.getElementById("liPasswIcono").style.color = "grey";
  });
  document.getElementById("liPasswIcono").addEventListener("mouseout", () => {
    visualizarContrasena("liPassw");
    document.getElementById("liPasswIcono").style.color = "white";
  });

  //Event handler de envío: por ahora, considero hecho el log in si usuario y contraseña son válidos.
  document.getElementById("logInForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let usuario = document.getElementById("liUsername").value;
    let contrasena = document.getElementById("liPassw").value;
    if (validarUsuario(usuario) == "VALIDATED" && validarContrasena(contrasena) == "VALIDATED") {
      document.getElementById("avisoOverlay").innerHTML = generarConfirmacionLogIn(usuario);
      // Sólo cierro el log-in si se ha hecho bien.
      document.getElementById("logInOverlay").style.display = "none";
    } else {
      document.getElementById("avisoOverlay").innerHTML = generarErrorLogIn();
    }
    document.getElementById("avisoOverlay").style.display = "block";
    setTimeout(function () {
      document.getElementById("avisoOverlay").style.display = "none";
      // Cuando haya que hacer el submit, pero no en esta práctica, continuar:
      // document.getElementById("logInForm").submit();
    }, 5000);
  });

  document.getElementById("liClose").addEventListener("click", gestionarLogIn);
}

/**
 * Gestiona mostrar/ocultar el formulario de suscripción cuando es llamado.
 */
export function gestionarSignUp() {
  var vistaSignUp = document.getElementById("signUpOverlay").style.display;
  if (vistaSignUp == "block") {
    document.getElementById("signUpOverlay").style.display = "none";
  } else {
    document.getElementById("signUpOverlay").style.display = "block";
  }
}

/**
 * Gestiona mostrar/ocultar el formulario de log in cuando es llamado.
 */
export function gestionarLogIn() {
  var vistaLogIn = document.getElementById("logInOverlay").style.display;
  if (vistaLogIn == "block") {
    document.getElementById("logInOverlay").style.display = "none";
  } else {
    document.getElementById("logInOverlay").style.display = "block";
  }
}

/**
 * Muestra u oculta la contraseña escrita por el usuario.
 * @param {String} idPassw contraseña escrita en el campo de input
 */
function visualizarContrasena(idPassw) {
  let tipoPassw = document.getElementById(idPassw).type;
  let icono = "suPasswIcono";
  let iconoNo = "suPasswIconoNo";
  if (idPassw == "suPassw2") {
    icono += "2";
    iconoNo += "2";
  }
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

/**** FUNCIONES DE GESTIÓN DE VALIDACIONES ****/

/**
 * Función que valida los campos cuando se hace click en el botón de enviar del formulario de subscripción.
 * @param {boolean} validacionFormulario entra siempre como true; será false si encuentra algún dato no válido.
 */
function validarSubmit(validacionFormulario) {
  let arrayValidacion = generarArrayParaValidacion().reverse();
  // Lo hago en reverse() para que siempre me ponga el foco en el primer error.
  arrayValidacion.forEach((item) => {
    let resultadoValidacion = item.validar;
    if (resultadoValidacion == "VALIDATED") {
      marcarInputCorrecto(item.inputId, item.inputErrorId);
    } else {
      marcarInputError(item.inputId, item.inputErrorId, resultadoValidacion);
      validacionFormulario = false;
    }
  });

  //Aparte valido los checks de edad; marco el error pero, como en países, no el check:
  let comprobacionEdad = validarEdad();
  if (comprobacionEdad != "VALIDATED") {
    document.getElementById("suAgeError").innerHTML =
      "<i>" + comprobacionEdad + "</i>";
    document.getElementById("suAgeError").style.display = "block";
    validacionFormulario = false;
  } else {
    document.getElementById("suAgeError").innerHTML = "";
    document.getElementById("suAgeError").style.display = "none";
  }

  return validacionFormulario;
}

/**
 * Crea y completa un nuevo usuario según los valores tomados del formulario.
 */
function generarUsuario() {
  var user = new Object();
  user.username = document.getElementById("suUsername").value;
  user.password = document.getElementById("suPassw").value;
  user.name = document.getElementById("suName").value;
  user.surname = document.getElementById("suSurname").value;
  user.phone = document.getElementById("suTelf").value;
  user.mail = document.getElementById("suMail").value;
  user.country = document.getElementById("suCountry").value;
  if (document.getElementById("suAgeMenor").checked) {
    user.age = "<18";
  } else if (document.getElementById("suAgeMayor").checked) {
    user.age = ">=18";
  }
  return user;
}

/**
 * Gestiona el proceso de validación de cada input independiente; se llama también al perder el focus.
 * @param {Object} elemento que se desea validar
 */
function gestionarValidacionInput(elemento) {
  let resultadoValidacion = elemento.validar;
  if (resultadoValidacion == "VALIDATED") {
    marcarInputCorrecto(elemento.inputId, elemento.inputErrorId);
    // Si es un campo con comprobación, la activo:
    if (elemento.inputId == "suPassw") {
      activarInputComprobacion("suPassw2", "suPassw2Label");
    } else if (elemento.inputId == "suMail") {
      activarInputComprobacion("suMail2", "suMail2Label");
    }
  } else {
    // Si está vacío quito el color, pierdo el foco y quito los mensajes de error:
    if (document.getElementById(elemento.inputId).value.length < 1) {
      marcarInputVacio(elemento.inputId, elemento.inputErrorId);
    } else {
      // Si no está vacío lo mantengo y muestro los bordes y el mensaje de error:
      marcarInputError(
        elemento.inputId,
        elemento.inputErrorId,
        resultadoValidacion
      );
    }
    //Y si es un campo con comprobación, la vacío y desactivo:
    if (elemento.inputId == "suPassw") {
      desactivarInputComprobacion("suPassw2", "suPasswError2", "suPassw2Label");
    } else if (elemento.inputId == "suMail") {
      desactivarInputComprobacion("suMail2", "suMailError2", "suMail2Label");
    }
  }
}

/**
 * Si procede, cambia el formato del input pasado por parámetro y muestra el error correspondiente.
 * @param {String} miInput id del campo de input
 * @param {String} miInputError id del campo de error
 * @param {String} textoError contenido del error
 */
function marcarInputError(miInput, miInputError, textoError) {
  document.getElementById(miInput).style.border = "3px solid rgb(142, 101, 27)";
  document.getElementById(miInput).focus();
  document.getElementById(miInputError).innerHTML = "<i>" + textoError + "</i>";
  document.getElementById(miInputError).style.display = "inline";
  //Como los checks sólo se muestran en desktop, no me hace falta añadir esto en móvil.
  if (window.innerWidth >= 800) {
    let miInputCheck = miInput + "Check";
    document.getElementById(miInputCheck).innerHTML = "";
    document.getElementById(miInputCheck).style.display = "none";
  }
}

/**
 * Si está vacío, cambia el formato del input pasado por parámetro.
 * @param {String} miInput id del campo de input
 * @param {String} miInputError id del campo de error
 */
function marcarInputVacio(miInput, miInputError) {
  document.getElementById(miInput).style.border = "1px solid grey";
  document.getElementById(miInputError).innerHTML = "";
  document.getElementById(miInputError).style.display = "none";
  if (window.innerWidth >= 800) {
    let miInputCheck = miInput + "Check";
    document.getElementById(miInputCheck).innerHTML = "";
    document.getElementById(miInputCheck).style.display = "none";
  }
}

/**
 * Si procede porque no hay errores, cambia el formato del input pasado por parámetro al estándar.
 * @param {String} miInput id del campo de input
 * @param {String} miInputError id del campo de error
 */
function marcarInputCorrecto(miInput, miInputError) {
  document.getElementById(miInput).style.border = "1px solid grey";
  document.getElementById(miInputError).innerHTML = "";
  document.getElementById(miInputError).style.display = "none";
  // Quiero que los checks no aparezcan en móvil; sólo en desktop:
  if (window.innerWidth >= 800) {
    let miInputCheck = miInput + "Check";
    document.getElementById(miInputCheck).innerHTML = "<b>&#10004;</b>";
    document.getElementById(miInputCheck).style.display = "block";
  }
}

/**
 * Activa los elementos de los inputs de comprobación cuando los elementos a comprobar son correctos.
 * @param {String} miInput id del campo de input
 * @param {String} miInputLabel id del campo del label asociado a este input
 */
function activarInputComprobacion(miInput, miInputLabel) {
  document.getElementById(miInput).disabled = false;
  document.getElementById(miInputLabel).classList.remove("disabledText");
}

/**
 * Desctiva los elementos de los inputs de comprobación cuando procede.
 * @param {String} miInput id del campo de input
 * @param {String} miInputError id del campo de error
 * @param {String} miInputLabel id del campo del label asociado a este input
 */
function desactivarInputComprobacion(miInput, miInputError, miInputLabel) {
  document.getElementById(miInput).disabled = true;
  document.getElementById(miInput).value = "";
  document.getElementById(miInputError).innerHTML = "";
  document.getElementById(miInputError).style.display = "none";
  document.getElementById(miInputLabel).classList.add("disabledText");
  let miInputCheck = miInput + "Check";
  document.getElementById(miInputCheck).innerHTML = "";
  document.getElementById(miInputCheck).style.display = "none";
}
