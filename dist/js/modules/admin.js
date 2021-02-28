export function gestionarAdmin() {
  getConstrucciones();
  document.getElementById("botonBusqueda").addEventListener("click", () => {
    buscarConstruccion();
  });
  document.getElementById("nuevaConstruccion").addEventListener("click", () => {
    generarConstruccion();
  });
}

function getConstrucciones() {
  fetch("http://localhost:3000/construccions")
    .then((response) => response.json())
    .then((json) => mostrarTablaConstrucciones(json));
}

function mostrarTablaConstrucciones(arrayConstrucciones) {
  document.getElementById("listaConstrucciones").innerHTML = "";

  //Informo si la tabla está vacía, y si no lo está opero:
  if (arrayConstrucciones.length < 1) {
    document.getElementById("listaConstrucciones").innerHTML = `
      <p class="small text-muted mt-4 mb-5">
      No se han encontrado construcciones.
      </p>
    `;
    //TODO el footer se me descoloca
  } else {
    // No puedo poner los event listeners en el bucle porque los anularía en cada ciclo.
    // Creo un array de objetos y los añadiré al final
    let arrayEventosConstrucciones = [];

    arrayConstrucciones.forEach((elemento) => {
      let conId = elemento.id;
      let conNombre = elemento.nom;
      let conX = elemento.x;
      let conY = elemento.y;
      let conImagen = elemento.img;
      let conIdImg = "imgId" + conId;
      let conIdView = "viewId" + conId;
      let conIdEdit = "editId" + conId;
      let conIdDelete = "deleteId" + conId;

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
      arrayEventosConstrucciones.push(
        generarObjetoEventos(conId, conIdImg, conIdView, conIdEdit, conIdDelete, conNombre, conImagen)
      );
    });

    añadirEventosConstrucciones(arrayEventosConstrucciones);
  }
}

function generarObjetoEventos(id, idImg, idView, idEdit, idDelete, nombre, imgUrl) {
  var objetoEventos = new Object();
  objetoEventos.id = id;
  objetoEventos.imagen = idImg;
  objetoEventos.detalles = idView;
  objetoEventos.edicion = idEdit;
  objetoEventos.borrado = idDelete;
  objetoEventos.nombre = nombre;
  objetoEventos.imgUrl = imgUrl;
  return objetoEventos;
}

function añadirEventosConstrucciones(listaIds) {
  //Aquí añado los eventos para ver imagen / editar / borrar

  listaIds.forEach((elemento) => {
    document.getElementById(elemento.imagen).addEventListener("click", () => {
      getImagen(elemento.id);
    });
    document.getElementById(elemento.detalles).addEventListener("click", () => {
      mostrarConstruccion(elemento.id);
    });
    document.getElementById(elemento.edicion).addEventListener("click", () => {
      editarConstruccion(elemento.id);
    });
    document.getElementById(elemento.borrado).addEventListener("click", () => {
      deleteConstruccion(elemento.id);
    });
  });
}

function mostrarConstruccion(idConstruccion) {
  let url = "http://localhost:3000/construccions/" + idConstruccion;
  fetch(url)
    .then((response) => response.json())
    .then((construccion) => {
      document.getElementById("construccionDetalle").classList.remove("d-none");
      document.getElementById("fcTitulo").innerText =
        "Construcción con ID " + construccion.id + ":";
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
    });
}

function editarConstruccion(idConstruccion) {
  let url = "http://localhost:3000/construccions/" + idConstruccion;
  fetch(url)
    .then((response) => response.json())
    .then((construccion) => {
      document.getElementById("construccionDetalle").classList.remove("d-none");
      document.getElementById("fcTitulo").innerText =
        "Editar construcción " + construccion.id + ":";

      document.getElementById("fcNombre").value = construccion.nom;
      document.getElementById("fcNombre").removeAttribute("disabled");
      document.getElementById("fcX").value = construccion.x;
      document.getElementById("fcX").removeAttribute("disabled");
      document.getElementById("fcY").value = construccion.y;
      document.getElementById("fcY").removeAttribute("disabled");
      document.getElementById("fcImg").value = construccion.img;
      document.getElementById("fcImg").removeAttribute("disabled");

      document.getElementById("fcButton").innerText = "MODIFICAR";
      document.getElementById("fcButton").addEventListener("click", () => {
        putConstruccion(idConstruccion);
      });
    });
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

function putConstruccion(id) {
  let url = "http://localhost:3000/construccions/" + id;
  fetch(url, {
    method: "PUT",
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
    .then((json) => mostrarImagen(json.nom, json.img));
}

function mostrarImagen(edificio, urlImagen) {
  document.getElementById("imgModalLabel").innerHTML = edificio;
  //Si la imagen tiene url vacía muestro imagen estandar; si tengo tiempo: comprobar que existe imagen
  if (urlImagen == "") {
    urlImagen = "assets/images/pj.png";
  }
  document.getElementById("imgModalDiv").innerHTML = `
    <img src="${urlImagen}" alt="${edificio}" style="width:300px" />
    `;
}

function buscarConstruccion() {
  var valorBusqueda = document.getElementById("inputBusqueda").value.trim();

  fetch("http://localhost:3000/construccions")
    .then((response) => response.json())
    .then((json) => {
      if (valorBusqueda == "") {
        //Si el campo de búsqueda está vacío quiero que muestre todas las construcciones
        return json;
      } else {
        // Aquí filtro el json que recibo para retornar sólo los valores de id y/o nombre que coinciden con la búsqueda
        return json.filter((elemento) => {
          return (elemento.id == valorBusqueda || elemento.nom.toLowerCase() == valorBusqueda.toLowerCase());
        });
      }
    })
    .then((json) => mostrarTablaConstrucciones(json));
}
