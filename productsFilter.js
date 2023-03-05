// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("./database/store.json");
const products = await reponse.json();

function generateProducts(products) {
  for (let i = 0; i < products.length; i++) {
    const article = products[i];

    /* Selecting the element with the class `products` and assigning it to the variable `sectionFiches`. */
    const sectionFiches = document.querySelector(".products");

    /* Creating an article element. */
    const productElement = document.createElement("article");
    productElement.style.display = "flex";
    productElement.style.flexDirection = "column";
    productElement.style.alignItems = "center";

    /* Creating the elements and assigning them to variables. */
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    imageElement.style.height = "32vh";
    imageElement.style.maxWidth = "80%";

    const titleElement = document.createElement("h2");
    titleElement.innerText = article.title;
    titleElement.style.marginTop = "14px";
    titleElement.style.textAlign = "center";
    const priceElement = document.createElement("p");
    priceElement.innerText = `Prix: ${article.price} € 
    `;

    /* Adding the article element to the section element. */
    sectionFiches.appendChild(productElement);

    /* Adding the image, name and price to the article element. */
    productElement.appendChild(imageElement);
    productElement.appendChild(titleElement);
    productElement.appendChild(priceElement);
  }
}

/* Calling the function `genererPieces` and passing the variable `products` as an argument. */
generateProducts(products);

/* Selecting the element with the class `sort-asc` and assigning it to the variable `sortButton`. */
const sortButton = document.querySelector(".sort-asc");

/* Sorting the products by price in ascending order. */
sortButton.addEventListener("click", function () {
  const productsOrders = Array.from(products);
  productsOrders.sort(function (a, b) {
    return a.price - b.price;
  });
  document.querySelector(".products").innerHTML = "";
  generateProducts(productsOrders);
});

const Descbutton = document.querySelector(".sort-desc");
/* Sorting the products by price in descending order. */

Descbutton.addEventListener("click", function () {
  const productsOrders = Array.from(products);
  productsOrders.sort(function (a, b) {
    return b.price - a.price;
  });
  document.querySelector(".products").innerHTML = "";
  generateProducts(productsOrders);
});

const filterButton = document.querySelector(".newProducts");

/* Filtering the products by the ones that are new. */
filterButton.addEventListener("click", function () {
  const productsFilter = products.filter(function (products) {
    return products.new;
  });
  document.querySelector(".products").innerHTML = "";
  generateProducts(productsFilter);
});
