$(document).ready(() => {
  //Carga de archivos de header y footer:
  fetch("./header.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("header").innerHTML = data;
    });

  fetch("./footer.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("footer").innerHTML = data;
    });

  cargarBotonTop();
});

function cargarBotonTop() {
  //TODO no funciona
  var botonTop = document.getElementById("botonTop");

  //Función para que al hacer click vuelva al principio:
  botonTop.addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });

  window.onscroll = function () {
    controlarBotonTop();
  };
}
