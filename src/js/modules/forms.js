import { validarEdad } from "./forms_validation.js";
import {
  arrayInputIds,
  generarArrayParaValidacion,
  generarUsername,
  generarPassw,
  generarPassw2,
  generarName,
  generarSurname,
  generarTelf,
  generarMail,
  generarMail2,
} from "./forms_validationArray.js";
import {visualizarContrasena} from "./../scripts.js"

/**
 * Gestiona el formulario de registro y todos sus event handlers
 */
export function gestionarFormRegistro() {
  generarSelectPaises();
  
  // Event handlers para focus in de los distintos inputs:
  arrayInputIds.forEach((elemento) => {
    document.getElementById(elemento).addEventListener("focusin", (e) => {
      e.target.style.background = "rgba(142, 35, 27, 0.5)";
      console.log(e.target);
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

  document.getElementById("suPasswIcono").addEventListener("mouseover", () => {
    visualizarContrasena("suPassw");
    document.getElementById("suPasswIcono").classList.remove("text-primary");
    document.getElementById("suPasswIcono").classList.add("text-warning");
  });

  document.getElementById("suPasswIcono").addEventListener("mouseout", () => {
    visualizarContrasena("suPassw");
    document.getElementById("suPasswIcono").classList.remove("text-warning");
    document.getElementById("suPasswIcono").classList.add("text-primary");
  });

  document.getElementById("suPassw2").addEventListener("focusout", (e) => {
    gestionarValidacionInput(generarPassw2());
    e.target.style.background = "";
  });

  document.getElementById("suPassw2Icono").addEventListener("mouseover", () => {
    visualizarContrasena("suPassw2");
    if (!document.getElementById("suPassw2").disabled) {
      document.getElementById("suPassw2Icono").classList.remove("text-muted");
      document.getElementById("suPassw2Icono").classList.remove("text-primary");
      document.getElementById("suPassw2Icono").classList.add("text-warning");
    }
  });

  document.getElementById("suPassw2Icono").addEventListener("mouseout", () => {
    visualizarContrasena("suPassw2");
    document.getElementById("suPassw2Icono").classList.remove("text-warning");
    document.getElementById("suPassw2Icono").classList.add("text-primary");
  });

  //Event handlers de nombre y apellidos: se validan al submit.
  document.getElementById("suName").addEventListener("focusout", (e) => {
    quitarMensajeError(generarName());
    e.target.style.background = "";
  });

  document.getElementById("suSurname").addEventListener("focusout", (e) => {
    quitarMensajeError(generarSurname());
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
      document.getElementById("textoAlta").innerHTML = "Bienvenido, " + nuevoUsuario.username;
      document.getElementById("signUpForm").style.display = "none";
    }
  });
}

/**
 * Gestionar el select de países vía XHR.
 */
function generarSelectPaises() {
  let htmlPaises = "";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://restcountries.eu/rest/v2/all?fields=name");
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = function () {
    let listaPaises = xhr.response;

    let htmlPaises = listaPaises
      .map((elemento) => {
        let pais = elemento.name;
        if (pais == "Spain") {
          return (
            "<option value='" +
            pais +
            "' selected='selected'>" +
            pais +
            "</option>"
          );
        } else {
          return "<option value='" + pais + "'>" + pais + "</option>";
        }
      })
      .join();

    document.getElementById("suCountry").innerHTML = htmlPaises;
  };
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
      //marcarInputCorrecto(item.inputId, item.inputErrorId);
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
 * Comprueba si un mensaje de error previamente puesto en campos name/surname es correcto o no.
 * @param {String} campoId para el que comprobar el error
 */
function quitarMensajeError(objeto) {
  let mensajeError = objeto.validar;
  if (document.getElementById(objeto.inputId).value.length < 1 || mensajeError == 'VALIDATED') {
      marcarInputVacio(objeto.inputId, objeto.inputErrorId);
  }
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
      desactivarInputComprobacion("suPassw2", "suPasswError2");
    } else if (elemento.inputId == "suMail") {
      desactivarInputComprobacion("suMail2", "suMailError2");
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
  if (miInput == "suPassw" || miInput == "suPassw2") {
    let miInputGroup = miInput + "Group";
    document.getElementById(miInputGroup).style.border = "3px solid rgb(142, 101, 27)";
    document.getElementById(miInputGroup).style.borderRadius = "5px";
  } else {
    document.getElementById(miInput).style.border = "3px solid rgb(142, 101, 27)";
  }
  document.getElementById(miInput).focus();
  document.getElementById(miInputError).innerHTML = "<i>" + textoError + "</i>";
  document.getElementById(miInputError).style.display = "inline";
}

/**
 * Si está vacío, cambia el formato del input pasado por parámetro.
 * @param {String} miInput id del campo de input
 * @param {String} miInputError id del campo de error
 */
function marcarInputVacio(miInput, miInputError) {
  if (miInput == "suPassw" || miInput == "suPassw2") {
    let miInputGroup = miInput + "Group";
    document.getElementById(miInputGroup).style.border = "1px solid grey";
  } else {
    document.getElementById(miInput).style.border = "1px solid grey";
  }
  document.getElementById(miInputError).innerHTML = "";
  document.getElementById(miInputError).style.display = "none";
}

/**
 * Si procede porque no hay errores, cambia el formato del input pasado por parámetro al estándar.
 * @param {String} miInput id del campo de input
 * @param {String} miInputError id del campo de error
 */
function marcarInputCorrecto(miInput, miInputError) {
  if (miInput == "suPassw" || miInput == "suPassw2") {
    let miInputGroup = miInput + "Group";
    document.getElementById(miInputGroup).style.border = "1px solid grey";
  } else {
    document.getElementById(miInput).style.border = "1px solid grey";
  }
  document.getElementById(miInputError).innerHTML = "";
  document.getElementById(miInputError).style.display = "none";
}

/**
 * Activa los elementos de los inputs de comprobación cuando los elementos a comprobar son correctos.
 * @param {String} miInput id del campo de input
 */
function activarInputComprobacion(miInput) {
  let miInputLabel = miInput + "Label";
  document.getElementById(miInput).disabled = false;
  document.getElementById(miInputLabel).classList.remove("text-muted");
  if (miInput == "suPassw2") {
    document.getElementById("suPassw2Icono").classList.remove("text-muted");
    document.getElementById("suPassw2Icono").classList.add("text-primary");
  }
}

/**
 * Desactiva los elementos de los inputs de comprobación cuando procede.
 * @param {String} miInput id del campo de input
 * @param {String} miInputError id del campo de error
 */
function desactivarInputComprobacion(miInput, miInputError) {
  let miInputLabel = miInput + "Label";
  document.getElementById(miInput).disabled = true;
  document.getElementById(miInput).value = "";
  document.getElementById(miInputError).innerHTML = "";
  document.getElementById(miInputError).style.display = "none";
  document.getElementById(miInputLabel).classList.add("text-muted");
  if (miInput == "suPassw2") {
    document.getElementById("suPassw2Icono").classList.remove("text-primary");
    document.getElementById("suPassw2Icono").classList.add("text-muted");
  }
}
