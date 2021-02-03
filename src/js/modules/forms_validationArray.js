import {
  validarUsuario,
  validarContrasena,
  validarIgualdad,
  validarNombres,
  validarTelefono,
  validarMail,
} from "./forms_validation.mjs";

const MAX_NOMBRE = 20;
const MAX_APELLIDO = 30;
export var arrayInputIds = ["suUsername", "suPassw", "suPassw2", "suName", "suSurname", "suTelf", "suMail", "suMail2",];

/**
 * Genera y retorna una lista de objetos que se emplea en las validaciones.
 */
export function generarArrayParaValidacion() {
  let nombre = generarObjetoParaValidacion(
    "suName",
    "suNameError",
    validarNombres(document.getElementById("suName").value, MAX_NOMBRE)
  );

  let apellido = generarObjetoParaValidacion(
    "suSurname",
    "suSurnameError",
    validarNombres(document.getElementById("suSurname").value, MAX_APELLIDO)
  );

  var listaValidacion = [
    generarUsername(),
    generarPassw(),
    generarPassw2(),
    nombre,
    apellido,
    generarTelf(),
    generarMail(),
    generarMail2(),
  ];
  //País tiene España como default; no lo quiero validar. Edad se valida por separado.
  return listaValidacion;
}

/**
 * Genera un objeto según los parámetros pasados; funciona como un constructor
 * @param {String} input id del input
 * @param {String} inputError id del error asociado
 * @param {function} metodoValidar función que valida ese input
 */
function generarObjetoParaValidacion(input, inputError, metodoValidar) {
  let objeto = new Object();
  objeto.inputId = input;
  objeto.inputErrorId = inputError;
  objeto.validar = metodoValidar;
  return objeto;
}

/**
 * Genera un objeto Username al llamar a generarObjetoParaValidacion(input, inputError, metodoValidar)
 */
export function generarUsername() {
  let usuario = generarObjetoParaValidacion(
    "suUsername",
    "suUsernameError",
    validarUsuario(document.getElementById("suUsername").value)
  );
  return usuario;
}

/**
 * Genera un objeto Contraseña al llamar a generarObjetoParaValidacion(input, inputError, metodoValidar)
 */
export function generarPassw() {
  let contrasena = generarObjetoParaValidacion(
    "suPassw",
    "suPasswError",
    validarContrasena(document.getElementById("suPassw").value)
  );
  return contrasena;
}

/**
 * Genera un objeto de comprobación de constraseña al llamar a generarObjetoParaValidacion(input, inputError, metodoValidar)
 */
export function generarPassw2() {
  let contrasena2 = generarObjetoParaValidacion(
    "suPassw2",
    "suPasswError2",
    validarIgualdad(
      document.getElementById("suPassw").value,
      document.getElementById("suPassw2").value
    )
  );
  return contrasena2;
}

/**
 * Genera un objeto Teléfono al llamar a generarObjetoParaValidacion(input, inputError, metodoValidar)
 */
export function generarTelf() {
  let telefono = generarObjetoParaValidacion(
    "suTelf",
    "suTelfError",
    validarTelefono(document.getElementById("suTelf").value)
  );
  return telefono;
}

/**
 * Genera un objeto E-mail al llamar a generarObjetoParaValidacion(input, inputError, metodoValidar)
 */
export function generarMail() {
  let mail = generarObjetoParaValidacion(
    "suMail",
    "suMailError",
    validarMail(document.getElementById("suMail").value)
  );
  return mail;
}

/**
 * Genera un objeto de comprobación de E-mail al llamar a generarObjetoParaValidacion(input, inputError, metodoValidar)
 */
export function generarMail2() {
  let mail2 = generarObjetoParaValidacion(
    "suMail2",
    "suMailError2",
    validarIgualdad(
      document.getElementById("suMail").value,
      document.getElementById("suMail2").value
    )
  );
  return mail2;
}
