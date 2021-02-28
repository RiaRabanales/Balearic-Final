export function gestionarToken() {
  document
    .getElementById("buttonAuthToken")
    .addEventListener("click", mostrarToken);
}

function mostrarToken() {
  let miToken = getCookie("authToken");
  console.log(miToken);
  document.getElementById("divAuthToken").innerHTML = miToken;
}

/**
 * Llama al server y guarda el nuevo usuario por post; recibe un token de autorización.
 * @param {*} mail
 * @param {*} pw
 */
export function crearUsuario(mail, pw) {
  let url = "http://localhost:3001/auth/register";
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: mail,
      password: pw,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => setCookie("authToken", json.access_token, 1))
    .then(() => {
      window.location.href = "../src/ok.html";
    });
}

export function iniciarUsuario(username, password) {
  let url = "http://localhost:3001/auth/login";
  let headers = new Headers();

  //headers.append('Content-Type', 'text/json');
  headers.append("Authorization", "Basic " + btoa(username + ":" + password));

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.access_token != undefined) {
        // Sólo me pasa a la página de control si efectivamente hace log-in
        setCookie("authToken", json.access_token, 1);
        window.location.href = "../src/ok.html";
      } 
    });
}

export function setCookie(nombre, valor, horas) {
  var d = new Date();
  d.setTime(d.getTime() + horas * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = nombre + "=" + valor + ";" + expires;
}

export function getCookie(nombre) {
  var name = nombre + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
