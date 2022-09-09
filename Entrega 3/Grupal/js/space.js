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

    contenedor.innerHTML += `
    <div class="card" style="width: 30%">
        <img class="card-img-top" src="${element.links[0].href}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${element.data[0].title}</h5>
            <p class="card-text overflow-auto">${element.data[0].description}</p>
            <small>${element.data[0].date_created}</small>
        </div>
  </div>
    `;
  }
};

const functionality = async () => {
  const search = document.getElementById("inputBuscar").value;
  const data = await fetchApi(search);
  poblar(await data.items);
};

document.getElementById("btnBuscar").addEventListener("click", () => {
  functionality();
});
