function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
}

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");

const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");

const terminos = document.getElementById("terminos");

const boton = document.getElementById("regBtn");

boton.addEventListener("click", () => {
  if (
    nombre.value.trim("") !== "" &&
    apellido.value.trim("") !== "" &&
    email.value.trim("") !== "" &&
    password1.value.trim("") === password2.value.trim("") &&
    password1.value !== "" &&
    password2.value !== "" &&
    password1.value.length >= 6 &&
    terminos.validity.valid
  ) {
    showAlertSuccess();
  } else {
    showAlertError();
  }
});
