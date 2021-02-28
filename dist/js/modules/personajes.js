import { getCookie } from "./auth.js";

export function gestionarPersonajes() {
  let authToken = getCookie("authToken");
  if (authToken == "") {
    document.getElementById("section0").classList.remove("d-none");
  } else {
    document.getElementById("section1").classList.remove("d-none");
    mostrarCarrusel(authToken);
    document.getElementById("section2").classList.remove("d-none");
    mostrarPersonajes(authToken);
  }
}

async function getPersonajes(token) {
  let url = "http://localhost:3001/characters";
  let headers = new Headers();

  //headers.append('Content-Type', 'text/json');
  headers.append(
    "Authorization",
    "Bearer " + token
  );

  return fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json());
}

async function getPersonaje(token, id) {
  let url = "http://localhost:3001/characters/" + id;
  let headers = new Headers();

  //headers.append('Content-Type', 'text/json');
  headers.append(
    "Authorization",
    "Bearer " + token
  );

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  return await response.json();
}

function mostrarCarrusel(token) {
  getPersonajes(token)
  .then((json) => json.forEach(personaje => {
    let html = "";
    let personajeImg = personaje.img;
    if (personaje.id == 1) {
      html = `
      <div class="carousel-item active">
        <img class="d-block rounded-circle" src="${personajeImg}" alt="Personajes" style="max-height:180px; margin:auto">
      </div>
      `;
    } else {
      html = `
      <div class="carousel-item">
        <img class="d-block rounded-circle" src="${personajeImg}" alt="Personajes" style="max-height:180px; margin:auto">
      </div>
      `;
    }
    document.getElementById("carouselIn").innerHTML += html;
  }));

  $('.carousel').carousel({
    interval: 1500
  })
}

function mostrarPersonajes(token) {
  let arrayIds = [];
  getPersonajes(token)
  .then((json) => json.forEach(personaje => {
    let personajeNombre = personaje.name;
    let personajeImg = personaje.img;
    let personajeId = personaje.id;
    arrayIds.push(personajeId);
    let personajeHtml = `
    <div class="card m-2 p-1 bg-primary text-white" style="width: 11rem;" id="${personajeId}" role="button" data-toggle="modal" data-target="#pjModal">
      <div class="card-body d-flex flex-column justify-content-between">
        <div class="imgWrapper">
          <img class="card-img-top" src="${personajeImg}" alt="${personajeNombre}">
        </div>
        <p class="card-text text-center small pt-2">${personajeNombre}</p>
      </div>
    </div>
    `;
    document.getElementById("personajesLista").innerHTML += personajeHtml;
  }))
  .then(() => {
    arrayIds.forEach(id => {
      document.getElementById(id).addEventListener("click", () => {
        mostrarPersonajeModal(token, id);
      });
    })
  });
}
 function mostrarPersonajeModal(token, personajeId) { 
   getPersonaje(token, personajeId)
   .then((json) => {
    let personajeNombre = json.name;
    let personajeImg = json.img;
    let personajeMotto = json.motto;

    document.getElementById("pjTitulo").innerHTML = personajeNombre + " (personaje #" + personajeId + ")";
    document.getElementById("pjContent").innerHTML = `
      <img src="${personajeImg}" alt="${personajeNombre}" style="width: 40%" />
      <p class="text-center mx-3">"${personajeMotto}"</p>
    `;
   });
 }