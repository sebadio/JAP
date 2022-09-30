const url = `https://japceibal.github.io/japflix_api/movies-data.json`;

const getData = async () => {
  const response = await fetch(url);

  const data = await response.json();

  return data;
};

const handleSearch = async (data) => {
  const userInput = document.getElementById("inputBuscar").value.toLowerCase();
  const lista = document.getElementById("lista");

  lista.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    if (
      !userInput ||
      userInput.innerHTML === " " ||
      userInput.innerHTML === "" ||
      userInput.length < 1
    ) {
      return;
    }

    if (
      element.title
        .toLowerCase()
        .split(" ")
        .some((word) => word.toLowerCase().replace(/\W/g, "") === userInput) ||
      element.overview
        .toLowerCase()
        .split(" ")
        .some((word) => word.toLowerCase().replace(/\W/g, "") === userInput) ||
      element.tagline
        .toLowerCase()
        .split(" ")
        .some((word) => word.toLowerCase().replace(/\W/g, "") === userInput) ||
      element.genres.some((genero) =>
        genero.name.toLowerCase().includes(userInput)
      )
    ) {
      const listItem = document.createElement("li");
      listItem.className =
        "list-group-item bg-dark text-white border-secondary d-flex justify-content-between";
      listItem.setAttribute("data-bs-toggle", "offcanvas");
      listItem.setAttribute("data-bs-target", "#offcanvasTop");
      listItem.setAttribute("aria-controls", "offcanvasTop");
      listItem.innerHTML = `
          <div>
                <p class="fw-bold m-0">${element.title}</p>
                <p class="fst-italic m-0 text-secondary ">${element.tagline}</p>
          </div>
          <div id="stars"></div>
      `;

      lista.appendChild(listItem);

      estrellas(element);

      handleOffCanvas(listItem, element);
    }
  }
};

const estrellas = (element) => {
  const stars = document.getElementById("stars");

  for (let s = 0; s < 5; s++) {
    if (Math.floor(element.vote_average / 2) > s) {
      stars.innerHTML += '<span class="fa fa-star checked"></span>';
    } else {
      stars.innerHTML += '<span class="fa fa-star"></span>';
    }
  }

  stars.removeAttribute("id");
};

const agregarOffCanvas = () => {
  document.getElementsByTagName("main")[0].innerHTML += `
      <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
          <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasTopLabel"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
              <div id="offcanvasBody" class="offcanvas-body">
          </div>
      </div>
      `;
};

const handleOffCanvas = (listItem, element) => {
  listItem.addEventListener("click", () => {
    document.getElementById(
      "offcanvasTopLabel"
    ).innerHTML = `<b>${element.title}</b>`;

    document.getElementById("offcanvasBody").innerHTML = `
        
        <div class="row">
                <p>${element.overview}</p>
        </div>
        <hr >
        <div class="row d-flex justify-content-between">
            <div id="generos" class="col-10 d-flex"></div>
            <div class="col-2">
                <div class="dropdown position-absolute">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More
                    </button>
                    <ul id="dropdownUl" class="dropdown-menu">
                        <li class="dropdown-item-text d-flex justify-content-between"><span>Runtime:</span> <span>${
                          element.runtime
                        } mins</span></li>
                        <li class="dropdown-item-text d-flex justify-content-between"><span>Year:</span> <span>${
                          element.release_date.split("-")[0]
                        }</span></li>
                        <li class="dropdown-item-text d-flex justify-content-between"><span>Budget:</span> <span>$${
                          element.budget
                        }</span> </li>
                        <li class="dropdown-item-text d-flex justify-content-between"><span>Revenue:</span> <span>$${
                          element.revenue
                        }</span> </li>
                    </ul>
                </div>
            </div>
        </div>   
        `;

    for (let i = 0; i < element.genres.length; i++) {
      const genero = element.genres[i].name;

      document.getElementById(
        "generos"
      ).innerHTML += `<p class="m-1">${genero}</p>`;
    }
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  agregarOffCanvas();

  const data = await getData();

  document.getElementById("btnBuscar").addEventListener("click", () => {
    handleSearch(data);
  });

  document.getElementById("inputBuscar").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    handleSearch(data);
  });
});
