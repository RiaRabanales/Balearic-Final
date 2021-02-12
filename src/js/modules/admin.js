export function gestionarAdmin() {
  getConstrucciones();
  document.getElementById("nuevaConstruccion").addEventListener("click", () => {
    generarConstruccion();
  });
}

function getConstrucciones() {
  fetch("http://localhost:3000/construccions")
    .then((response) => response.json())
    //.then((json) => console.log(json));
    .then((json) => mostrarTablaConstrucciones(json));
}

function mostrarTablaConstrucciones(arrayConstrucciones) {
  //FALTA BOTON DE VER DETALLE
  arrayConstrucciones.forEach((elemento) => {
    let conId = elemento.id;
    let conIdView = "viewId" + conId;
    let conIdImg = "imgId" + conId;
    let conIdEdit = "editId" + conId;
    let conIdDelete = "deleteId" + conId;
    let conNombre = elemento.nom;
    let conX = elemento.x;
    let conY = elemento.y;
    let conImagen = elemento.img;
    //Aquí genero el html via literal de js:
    let construccion = `
        <tr>
        <th scope="row">${conId}</th>
        <td>${conNombre}</td>
        <td>${conY} x ${conX}</td>
        <td>
            <i class="bi bi-file-image text-primary mx-1" id="${conIdImg}" title="Imagen" data-toggle="modal" data-target="#imgModal" role="button"></i>
            <i class="bi bi-eye-fill text-primary mx-1" id="${conIdView}" title="Detalles" role="button"></i>
            <i class="bi bi-pencil-fill text-primary mx-2" id="${conIdEdit}" title="Editar" role="button"></i>
            <i class="bi bi-trash-fill text-primary mx-1" id="${conIdDelete}" title="Eliminar" role="button"></i>
        </td>
        </tr>
        `;
    document.getElementById("listaConstrucciones").innerHTML += construccion;

    //Aquí añado los eventos para ver imagen / editar / borrar
    document.getElementById(conIdView).addEventListener("click", () => {
      getImagen(conId);
    });
    document.getElementById(conIdView).addEventListener("click", () => {
      getConstruccion(conId);
    });
    //TODO document.getElementById(conIdEdit).addEventListener("click", editarConstruccion);
    document.getElementById(conIdDelete).addEventListener("click", () => {
      deleteConstruccion(conId);
    });
  });
}

function getConstruccion(idConstruccion) {
  let url = "http://localhost:3000/construccions/" + idConstruccion;
  fetch(url)
    .then((response) => response.json())
    .then((json) => mostrarConstruccion(json));
}

function mostrarConstruccion(construccion) {
  //TODO unificar desde getConstruccion para poder crear editarConstruccion
  document.getElementById("construccionDetalle").classList.remove("d-none");
  document.getElementById("fcTitulo").innerText = "Construcción con ID " + construccion.id + ":";
  document.getElementById("fcButton").innerText = "CERRAR";
  document.getElementById("fcButton").addEventListener("click", () => {
    document.getElementById("construccionDetalle").classList.add("d-none");
  });
  document.getElementById("fcNombre").value = construccion.nom;
  document.getElementById("fcNombre").setAttribute("disabled", true);
  document.getElementById("fcX").value = construccion.x;
  document.getElementById("fcX").setAttribute("disabled", true);
  document.getElementById("fcY").value = construccion.y;
  document.getElementById("fcY").setAttribute("disabled", true);
  document.getElementById("fcImg").value = construccion.img;
  document.getElementById("fcImg").setAttribute("disabled", true);
}

function deleteConstruccion(idConstruccion) {
  let url = "http://localhost:3000/construccions/" + idConstruccion;
  fetch(url, { method: "DELETE" }).then((response) => {
    if (response.status == "200") console.log("Construcción eliminada.");
    else throw new Error(response.status);
    response.json();
  });
}

function generarConstruccion() {
  document.getElementById("construccionDetalle").classList.remove("d-none");
  document.getElementById("fcTitulo").innerText = "Nueva construcción:";
  document.getElementById("fcButton").innerText = "AÑADIR";
  document.getElementById("fcButton").addEventListener("click", () => {
    addConstruccion();
  });
}

function addConstruccion() {

  fetch("http://localhost:3000/construccions", {
    method: "POST",
    body: JSON.stringify({
      nom: document.getElementById("fcNombre").value,
      y: document.getElementById("fcY").value,
      x: document.getElementById("fcX").value,
      img: document.getElementById("fcImg").value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

function getImagen(idConstruccion) {
  let url = "http://localhost:3000/construccions/" + idConstruccion;
  fetch(url)
    .then((response) => response.json())
    .then((json) => mostrarImagen(json.img));
}

function mostrarImagen (urlImagen) {
  //TODO HACER
}
