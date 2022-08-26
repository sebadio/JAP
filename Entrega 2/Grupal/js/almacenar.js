const aggregarButton = document.getElementById("agregar");
const limpiarButton = document.getElementById("limpiar");
const input = document.getElementById("item");
const contenedor = document.getElementById("contenedor");
const local =
  localStorage.getItem("listado") && localStorage.getItem("listado");

aggregarButton.addEventListener("click", () => {
  if (input.value && input.value !== "") {
    contenedor.innerHTML += `<li class="list-group-item list-group-item-action">${input.value}</li>`;
    localStorage.setItem("listado", contenedor.innerHTML);
    input.value = "";
  }
});

limpiarButton.addEventListener("click", () => {
  localStorage.removeItem("listado");
  contenedor.innerHTML = "";
  input.value = "";
});

window.onload = () => {
  if (local && local !== "") {
    contenedor.innerHTML = local;
  }
};
