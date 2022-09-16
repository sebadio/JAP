const contenedor = document.getElementById("contenedor");

const fetchApi = async (search) => {
  const url = `https://images-api.nasa.gov/search?q=${search}`;
  const response = await fetch(url);

  const { collection } = await response.json();

  return collection;
};

const poblar = (data) => {
  contenedor.innerHTML = "";
  document.getElementById("inputBuscar").value = "";

  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    const item = document.createElement("div");
    item.style.width = "30%";
    item.style.cursor = "pointer";
    item.classList.add("card");
    item.innerHTML += `
        <img class="card-img-top imagenCarta" src="${element.links[0].href}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${element.data[0].title}</h5>
            <p class="card-text overflow-auto">${element.data[0].description}</p>
            <small>${element.data[0].date_created}</small>
        </div>
    `;

    item.addEventListener("click", () => {
      localStorage.setItem("busqueda", JSON.stringify(element));
      location.href = "portada.html";
    });
    contenedor.appendChild(item);
  }
};

const functionality = async () => {
  contenedor.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;
  const search = document.getElementById("inputBuscar").value;
  const data = await fetchApi(search);
  poblar(await data.items);
};

document.getElementById("btnBuscar").addEventListener("click", () => {
  functionality();
});

document.getElementById("inputBuscar").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    functionality();
  }
});
