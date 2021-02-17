import { getCookie } from "./auth.js";

export function gestionarPersonajes() {
  let authToken = getCookie("authToken");
  if (authToken == "") {
    //TODO q no se vea nada; preparar frontal
  } else {
    let jsonPersonajes = getPersonajes(authToken);
    //TODO mostrarCarrusel(jsonPersonajes);
    //TODO mostrarPersonajes(jsonPersonajes);
  }
}

function getPersonajes(token) {
  let url = "http://localhost:3001/characters";
  let headers = new Headers();

  //headers.append('Content-Type', 'text/json');
  headers.append(
    "Authorization",
    "Bearer " + token
  );

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
