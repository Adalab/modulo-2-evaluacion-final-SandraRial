'use strict';

//Array con la lista de cocteles vacío
let listCocktails = [];

//constantes que voy a necesitar
const cocktails = document.querySelector('.js-list');
const input = document.querySelector('.js-input');
//const btn = document.querySelector('.js-button');
const resetBtn = document.querySelector('.js-reset');

//función para pintar el HTML
function paintCocktails(drinks) {
  let html = '';
  for (const cocktail of drinks) {
    html += `<li>`;
    html += `<h1>${cocktail.strDrink}</h1>`;
    html += `<img class="img-small" src="${cocktail.strDrinkThumb}"/>`;
    html += `</li>`;
  }
  cocktails.innerHTML = html;
}

// función del botón de reset y que se borre la lista de bebidas
function reset() {
  listCocktails = [];
  paintCocktails(listCocktails);
}

// funcion de recoger los cocktails
function getCocktails(event) {
  event.preventDefault();
  if (input.value === '') {
    reset();
  } else {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        listCocktails = data.drinks;
        paintCocktails(listCocktails);
      });
  }
}

//hacemos un evento click -- que evento hay que hacer?
//btn.addEventListener('click', getCocktails);
input.addEventListener('keyup', getCocktails);
resetBtn.addEventListener('click', reset);
