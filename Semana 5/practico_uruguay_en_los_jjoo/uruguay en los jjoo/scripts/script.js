const medallas_url = "https://danikho2020.github.io/json/medallas.json";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cargar").addEventListener("click", function () {
    const tabla = document.getElementById("data");

    tabla.innerHTML = "";

    fetch(medallas_url)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          let row = document.createElement("tr");

          let anio = document.createElement("td");
          anio.innerHTML = element.anio;
          row.appendChild(anio);

          let sede = document.createElement("td");
          sede.innerHTML = element.sede;
          row.appendChild(sede);

          let deporte = document.createElement("td");
          deporte.innerHTML = element.deporte;
          row.appendChild(deporte);

          let medalla = document.createElement("td");
          let medallaImagen = document.createElement("img");

          if (element.posicion === 1) {
            medallaImagen.src = "./img/oro.png";
          }
          if (element.posicion === 2) {
            medallaImagen.src = "./img/plata.png";
          }
          if (element.posicion === 3) {
            medallaImagen.src = "./img/bronce.png";
          }

          medallaImagen.style.height = "1rem";
          medallaImagen.style.width = "auto";

          medalla.appendChild(medallaImagen);
          row.appendChild(medalla);

          tabla.appendChild(row);
        });
      })
      .catch((error) => {
        alert("Hubo un error");
        console.error(error);
      });
  });
});
