const numero = Math.floor(Math.random() * 100);

const limiteIntentos = 10;
let intentos = 0;

const input = document.getElementById("gameInput");
document.getElementById("gameForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const intentoActual = Number(input.value);

  if (intentoActual === numero) {
    alert("Adivinaste correctamente!");
    input.readOnly = true;
  }

  if (intentoActual > numero) {
    intentos++;
    if (intentos === limiteIntentos) {
      alert(
        `El numero que adivinaste es mayor y te quedaste sin intentos. El numero era ${numero}`
      );
      input.readOnly = true;

      return;
    }
    alert(
      `El numero que adivinaste es mayor. Te quedan ${
        limiteIntentos - intentos
      } intentos`
    );
  }

  if (intentoActual < numero) {
    intentos++;
    if (intentos === limiteIntentos) {
      alert(
        `El numero que adivinaste es mayor y te quedaste sin intentos. El numero era ${numero}`
      );
      input.readOnly = true;
      return;
    }
    alert(
      `El numero que adivinaste es menor Te quedan ${
        limiteIntentos - intentos
      } intentos`
    );
  }

  input.value = "";
});
