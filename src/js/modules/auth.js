export function gestionarToken() {
  document
    .getElementById("buttonAuthToken")
    .addEventListener("click", mostrarToken);
}

function mostrarToken() {
  let miToken = getCookie("authToken");
  console.log(miToken);
  document.getElementById("divAuthToken").innerHTML = "<p>" + miToken + "</p>";
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
    .then((json) => console.log(json));
  //TODO meter esto en cookie
}

export function iniciarUsuario(username, password) {
  let url = "http://localhost:3001/auth/login";
  let headers = new Headers();

  //headers.append('Content-Type', 'text/json');
  headers.append(
    "Authorization",
    "Basic " + btoa(username + ":" + password)
  );

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((json) => crearCookie(json.access_token))
    .then(() => {
        window.location.href = "../src/ok.html";
    });
}

function crearCookie(valor) {
  document.cookie = "authToken=" + valor;
}

export function getCookie(cname) {
  var name = cname + "=";
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
