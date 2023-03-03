// Récupération des produits depuis le fichier JSON

const products = document.querySelector(".products");
fetch("./database/store.json")
  .then((res) => res.json())
  .then((json) => {
    // iterating products
    for (let value of json) {
      addElement(products, value);
    }
  });

/**
 * It creates a div element, assigns it a class, and then assigns it some innerHTML.
 *
 * The innerHTML is a template literal that contains the values of the object passed to the function.
 *
 * The function then appends the div to the article element.
 * @param article - the parent element
 * @param value - {
 */
function addElement(article, value) {
  let div = document.createElement("div");
  div.className = "item justify-self-center";

  let { image, title, category, price } = value;

  div.innerHTML = `
              <img src="${image}" class="object-cover img mx-auto" alt="img1">
              <div class="text-center py-3 font-poppins">
                  <h1 class="text-lg title">${title}</h1>
                  <a href="#" class="block"><span class="text-sm text-red-400">${category}</span></a>
                  <span class="block py-3">$<span class="text-md">${price}</span></span>
                  <button class="border-2 px-8 py-1 bg-yellow-400 border rounded-md">Buy Now</button>
              </div>
      `;
  article.appendChild(div);
}
