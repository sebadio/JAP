const agregarInfo = (texto) => {
  const saltoDeLinea = "<br>";
  return (document.getElementById("info").innerHTML += texto + saltoDeLinea);
};

document.addEventListener("DOMContentLoaded", function () {
  // Incluye aquí el código necesario para mostrar en el párrafo "info", el número de enlaces de la página :

  const getLinks = document.getElementsByTagName("a");

  agregarInfo(`En la pagina hay <strong>${getLinks.length}</strong> enlaces`);

  // Incluye aquí el código necesario para mostrar en el párrafo "info", la dirección del penúltimo enlace de la página :

  agregarInfo(
    `La direccion del penultimo enlace es: <strong>${
      getLinks[getLinks.length - 1].href
    }</strong>`
  );

  // Incluye aquí el código necesario para mostrar en el párrafo "info", el número de enlaces que apuntan a http://prueba/ :
  const contarEnlacesSegunHref = (link) => {
    let enlaceApuntaPrueba = 0;
    for (let i = 0; i < getLinks.length; i++) {
      if (getLinks[i].href === link) {
        enlaceApuntaPrueba++;
      }
    }
    return enlaceApuntaPrueba;
  };

  agregarInfo(
    `La cantidad de enlaces que apuntan a "http://prueba/" es de: <strong>${contarEnlacesSegunHref(
      "http://prueba/"
    )}</strong>`
  );
  // Incluye aquí el código necesario para mostrar en el párrafo "info", el número de enlaces del tercer párrafo :

  const getChildrenOfParrafo = document.getElementsByTagName("p")[2].children;

  let cantOfLinkInsideThirdP = 0;

  Array.from(getChildrenOfParrafo).forEach((element) => {
    if (element.localName === "a") {
      cantOfLinkInsideThirdP++;
    }
  });

  agregarInfo(
    `La cantidad de enlaces que hay en el tercer parrafo es de: <strong>${cantOfLinkInsideThirdP}</strong>`
  );
});
