'use strict';

let listCocktails = [];
let favorites = [];

const cocktails = document.querySelector('.js-list');
const favCocktails = document.querySelector('.js-favorit-list');
const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-button');
const resetBtn = document.querySelector('.js-reset');
const resetFavBtn = document.querySelector('.js-reset-fav');
const logBtn = document.querySelector('.js-log');

function reset() {
  listCocktails = [];
  input.value = '';
  paintCocktails(listCocktails);
}

function resetFavourites() {
  favorites = [];
  localStorage.setItem('favCocktails', JSON.stringify(favorites));
  paintFavoritesCocktail(favorites);
}

function refresh() {
  let liItems = document.querySelectorAll('.js-li');
  for (const item of liItems) {
    item.addEventListener('click', handleClickdrinks);
  }
}
function logButton() {
  console.log(`Tienes ${favorites.length} favoritos`);
}

if (localStorage.getItem('favCocktails') !== null) {
  favorites = JSON.parse(localStorage.getItem('favCocktails'));
  paintFavoritesCocktail(favorites);
}

function paintCocktails(drinks) {
  let html = '';
  for (const cocktail of drinks) {
    let classFavorite = '';
    const favoriteFoundIndex = favorites.findIndex(
      (fav) => fav.idDrink === cocktail.idDrink
    );
    if (favoriteFoundIndex !== -1) {
      classFavorite = 'cocktail-favorite';
    } else {
      classFavorite = '';
    }
    html += `<li class="js-li all_list ${classFavorite}" id="${cocktail.idDrink}">`;
    html += `<h3>${cocktail.strDrink}</h3>`;
    if (cocktail.strDrinkThumb === null) {
      html += `<img class="img-small" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
    } else {
      html += `<img class="img-small" src="${cocktail.strDrinkThumb}"/>`;
    }
    html += `<p>${cocktail.strIngredient1}, ${cocktail.strIngredient2}, ${cocktail.strIngredient3},</p>`;
    if (cocktail.strIngredient4 === null) {
      html += '';
    } else {
      html += `<p> ${cocktail.strIngredient4}</p>`;
    }
    html += `</li>`;
  }
  cocktails.innerHTML = html;
  refresh();
}

function paintFavoritesCocktail(favoriteCocktail) {
  let html = '';
  for (const favCocktails of favoriteCocktail) {
    let classFavorite = '';
    html += `<li class="js-li fav_list ${classFavorite} " id="${favCocktails.idDrink}">`;
    html += `<h3>${favCocktails.strDrink}</h3>`;
    if (favCocktails.strDrinkThumb === null) {
      html += `<img class="img-small" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
    } else {
      html += `<img class="img-small" src="${favCocktails.strDrinkThumb}"/>`;
    }
    html += `</li>`;
  }
  favCocktails.innerHTML = html;
  refresh();
}

function handleClickdrinks(event) {
  const idCocktailSelected = event.currentTarget.id;
  const cocktailFound = listCocktails.find(
    (fav) => fav.idDrink === idCocktailSelected
  );
  const favoriteFoundIndex = favorites.findIndex((fav) => {
    return fav.idDrink === idCocktailSelected;
  });
  if (favoriteFoundIndex === -1) {
    favorites.push(cocktailFound);
  } else {
    favorites.splice(favoriteFoundIndex, 1);
  }
  localStorage.setItem('favCocktails', JSON.stringify(favorites));
  paintFavoritesCocktail(favorites);
  paintCocktails(listCocktails);
}

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
  paintFavoritesCocktail(favorites);
}

btn.addEventListener('click', getCocktails);
resetBtn.addEventListener('click', reset);
resetFavBtn.addEventListener('click', resetFavourites);
logBtn.addEventListener('click', logButton);
