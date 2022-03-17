const titulo = document.getElementById("titulo");
const parrafo = document.getElementsByTagName("p");
const links = document.getElementsByClassName("links");

titulo.innerHTML = "Titulo cambiado";

document.getElementById("demo").innerHTML = 'The text in first paragraph (index 0) is: ' + parrafo[0].innerHTML;

links[0].href = "google.com";

titulo.style.color = "red"

function cambiarTexto(obj) {
  obj.innerHTML = "Texto clickeado"
}

function mOver(obj) {
  obj.innerHTML = "Mouse over now"
}

function mOut(obj) {
  obj.innerHTML = "Mouse out"
}

function mDown(obj) {
  obj.style.backgroundColor = "#1ec5e5";
  obj.innerHTML = "sueltame";
}

function mUp(obj) {
  obj.style.backgroundColor = "#D94A38";
  obj.innerHTML = "gracias";
}

const boton = document.getElementById("boton");
boton.addEventListener("click", alerta)

function alerta() {
  alert("alerta");
}