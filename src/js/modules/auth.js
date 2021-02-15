//Esta función me guarda los datos de usuario en una variable.
// No le pongo valor de 'expires'; quiero que muera bien manualmente, bien cuando vierre el servidor
function setCookie(nombreCookie, valor) {
  document.cookie = nombreCookie + "=" + valor;
}

//Aquí compruebo si la cookie está seteada, y si no lo está la seteo.
//Esto lo uso, por ejemplo, al abrir la página 'personajes': si no está seteada la cookie directamente no muestro nada.
export function checkCookie() {
    console.log("entra en checkcookie");
  var token = getCookie("sesion");
  if (token != "") {
    console.log("Sesión abierta con token: " + token);
    return true;
  } else {
    /*
    Hago las operaciones que procedan
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
    */
  }
  return false;
}

//Aquí recupero el valor de la cookie
function getCookie(nombreCookie) {
    var nombre = nombreCookie + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }             //revisar este código de https://www.w3schools.com/js/js_cookies.asp
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
