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
    productElement.classList = "article";
    //productElement.attributes["data-item"];
    productElement.dataset.item = article.category;
    productElement.style.display = "flex";
    productElement.style.flexDirection = "column";
    productElement.style.alignItems = "center";

    /* Creating the elements and assigning them to variables. */
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    imageElement.style.height = "32vh";
    imageElement.style.maxWidth = "80%";
    imageElement.style.margin = "0 auto";

    const titleElement = document.createElement("h2");
    titleElement.classList = "title";
    titleElement.innerText = article.title;
    titleElement.style.marginTop = "14px";
    titleElement.style.textAlign = "center";
    const priceElement = document.createElement("p");
    priceElement.innerText = `Prix: ${article.price} € 
    `;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.category;

    /* Adding the article element to the section element. */
    sectionFiches.appendChild(productElement);

    /* Adding the image, name and price to the article element. */
    productElement.appendChild(imageElement);
    productElement.appendChild(titleElement);
    productElement.appendChild(priceElement);
    productElement.appendChild(categorieElement);
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

//filter
const searchBox = document.querySelector("#search");
const buttons = document.querySelectorAll(".btn");
const boxes = document.querySelectorAll(".article");
const grid = document.querySelector(".products");

/**
 * If the search input value is found in the title of the product, display the product, otherwise, hide
 * it.
 */
search.addEventListener("keyup", filterProducts);

function filterProducts() {
  const filterValue = search.value.toUpperCase();
  const item = grid.querySelectorAll(".article");

  for (let i = 0; i < item.length; i++) {
    let h2 = item[i].querySelector(".title");

    if (h2.innerHTML.toUpperCase().indexOf(filterValue) > 1) {
      item[i].style.display = "initial";
    } else {
      item[i].style.display = "none";
    }
  }
}

/* A function that is called when the user clicks on a button. */
buttons.forEach((button) => {
  button.classList.remove("btn-clicked");
});
buttons[0].classList.add("btn-clicked");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveBtn(e);
    const btnfilter = e.target.dataset.filter;

    boxes.forEach((box) => {
      if (btnfilter == "all") {
        box.style.display = "block";
      } else {
        const boxfilter = box.dataset.item;
        if (btnfilter == boxfilter) {
          box.style.display = "block";
        } else {
          box.style.display = "none";
        }
      }
    });
  });
});

/**
 * When a button is clicked, remove the class 'btn-clicked' from all buttons, then add the class
 * 'btn-clicked' to the button that was clicked.
 * @param e - the event object
 */
function setActiveBtn(e) {
  buttons.forEach((button) => {
    button.classList.remove("btn-clicked");
  });
  e.target.classList.add("btn-clicked");
}
