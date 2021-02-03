const MIN_PASSW = 8;
const MAX_PASSW = 12;

/**
 * Valida el nombre de usuario cuando se hace click fuera del campo.
 * Cumple los siguientes requisitos: comienza por u minúscula, sigue un número de 6 cifras, y acaba por una única letra mayúscula.
 * @param {String} texto con el nombre de usuario a validar.
 */
export function validarUsuario(texto) {
  if (texto.length < 1) {
    return "ERROR: campo vacío.";
  }
  let patronUsuario = new RegExp(/^u[0-9]{6}[A-Z]$/);
  if (!patronUsuario.test(texto)) {
    return "ERROR: el patrón de usuario no es válido.";
  }
  return "VALIDATED";
}

/**
 * Valida si la contraseña sigue los siguientes estándares:
 * - entre 8 y 12 caracteres (en constantes)
 * - caracteres alfanuméricos o guiones bajos
 * - al menos una mayúscula (en cualquier posición)
 * @param {String} texto con la contraseña a validar
 */

export function validarContrasena(texto) {
  if (texto.length < 1) {
    return "ERROR: campo vacío.";
  } else if (texto.length < MIN_PASSW) {
    return (
      "ERROR: la contraseña no puede tener menos de " + MIN_PASSW + " caracteres."
    );
  } else if (texto.length > MAX_PASSW) {
    return (
      "ERROR: la contraseña no puede tener más de " + MAX_PASSW + " caracteres."
    );
  }
  let patronContrasena = new RegExp(/^(?=.*[A-Z])[a-zA-Z0-9_]{8,}/);
  // ?= comprueba que exista una mayúscula antes de evaluarme la expresión.  La mayúscula estará incluída en los 8, (del total)
  if (!patronContrasena.test(texto)) {
    return "ERROR: el patrón de contraseña no es válido.";
  }
  return "VALIDATED";
}

/**
 * Comprueba si dos valores son iguales.
 * @param {String} texto1 primera contraseña/mail/otro texto para comprobar
 * @param {String} texto2 segunda contraseña/mail/otro texto para comprobar
 * @returns true si son iguales, false si son diferentes
 */
export function validarIgualdad(texto1, texto2) {
  if (texto1 != texto2) {
    return "ERROR: la comprobación no coincide con el campo anterior.";
  }
  // Es error sólo si el primero no está vacío; de lo contrario me surgirá problema en el primero.
  if (texto1.length > 0) {
    if (texto2.length < 1) {
      return "ERROR: campo vacío.";
    }
  }
  return "VALIDATED";
}

/**
 * Valida que el texto tenga una longitud mímina de 2 caracteres (para evitar iniciales) y máxima concreta.
 * Devuelve los posibles errores.
 * @param {String} texto a validar
 * @param {Number} longitud máxima que puede tener el texto
 */
export function validarNombres(texto, longitud) {
  if (texto.length == 0) {
    return "ERROR: campo vacío.";
  } else if (texto.length < 2) {
    return "ERROR: no se permite el uso exclusivo de iniciales.";
  } else if (texto.length > longitud) {
    return (
      "ERROR: este campo no puede superar los " + longitud + " caracteres."
    );
  }
  return "VALIDATED";
}

/**
 * Valida un teléfono conforme a las siguientes reglas:
 * - formato aaa-aaaaaa
 * - sólo acepta números y el guión
 * - empieza con 6 o con 9
 * @param {String} texto con el teléfono a validar.
 */
export function validarTelefono(texto) {
  /* El teléfono no es obligatorio; no valido si está vacío.
  if (texto.length == 0) {
    return "ERROR: campo vacío.";
  }
  */
  //Quiero separar estas dos opciones pero si las quisiera juntar: RegExp(/^(6|9)([0-9]{2})\-([0-9]{6})/)
  if (texto.length != 0) {
    let patronTelf = new RegExp(/^([0-9]{3})\-([0-9]{6})/);
    if (!patronTelf.test(texto)) {
      return "ERROR: formato de teléfono incorrecto.";
    } else {
      patronTelf = new RegExp(/^(6|9).*/); //Con .* marco que empiece por 6-9 y luego tenga cualquier caracter 0+ (*) veces
      if (!patronTelf.test(texto)) {
        return "ERROR: el teléfono debe comenzar por 6 o 9.";
      }
    }
  }
  return "VALIDATED";
}

/**
 * Valida un e-mail conforme a las siguientes reglas:
 * - formato aaaaaaaaa@bbbbbbbbbbb.ccc
 * - sólo una @ y un .
 * - aaaaaaa puede tener letras mayúsculas o minúsculas; bbbbbb un máximo de 20 letras minúsculas (y un mínimo de 2)
 * - ccc sólo puede ser ‘es’, ‘com’ o ‘net’
 * @param {String} texto con el e-mail a validar.
 */
export function validarMail(texto) {
  /* No me hace falta porque no es un campo required:
  if (texto.length == 0) {
    return "ERROR: campo vacío.";
  }
  */
 if (texto.length != 0) {
  let patronMail = new RegExp(/^[a-zA-Z]+@[a-z]{1,20}\.(es|com|net)/);
    if (!patronMail.test(texto)) {
      return "ERROR: formato de e-mail incorrecto.";
    }
  }
  return "VALIDATED";
}

/**
 * Comprueba que se haya elegido alguna de las opciones de edad.
 */
export function validarEdad() {
  if (
    document.getElementById("suAgeMayor").checked ||
    document.getElementById("suAgeMenor").checked
  ) {
    return "VALIDATED";
  }
  return "ERROR: campo vacío.";
}
