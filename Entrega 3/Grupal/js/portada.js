const busqueda = JSON.parse(localStorage.getItem("busqueda"));
const datos = busqueda.data[0];

const contenedor = document.getElementById("contenedor");
contenedor.style.padding = "1rem";

const getFullData = async () => {
  const response = await fetch(busqueda.href);

  const data = await response.json();

  return data;
};

const poblar = async () => {
  const data = await getFullData();

  contenedor.innerHTML += `
    <h1>${datos.title}</h1>
    <small>Date created: ${datos.date_created}</small>
    <small>Center: ${datos.center}</small>
    <small>Center: ${datos.nasa_id}</small>
    <p class="mt-4">${datos.description}</p>
    <div class="row gap-1" id="keywords"></div>
    <div id="contenedorImagen" class="row mt-4"></div>
  `;

  const keywordsDiv = document.getElementById("keywords");

  for (let i = 0; i < datos.keywords.length; i++) {
    const element = datos.keywords[i];

    keywordsDiv.innerHTML += `
      <div class="col border border-2 rounded-pill text-center">${element}</div>
    `;
  }

  const contenedorImagen = document.getElementById("contenedorImagen");

  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    if (
      (String(element).includes("jpg") && String(element).includes("orig")) ||
      (String(element).includes("png") && String(element).includes("orig"))
    ) {
      contenedorImagen.innerHTML += `
        <img class="img-fluid" src="${element}" />
      `;
    }
  }

  if (contenedorImagen.innerHTML === "") {
    contenedorImagen.innerHTML =
      "Imagen en su resolucion original no encontrada, devolvemos todas las fotos encontradas:";
    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      if (String(element).includes("jpg") || String(element).includes("png")) {
        contenedorImagen.innerHTML += `
          <img class="img-fluid mt-4" src="${element}" />
        `;
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  poblar();
});
