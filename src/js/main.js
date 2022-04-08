'use strict';

// const { info } = require('node-sass');

//Array con la lista de cocteles vacío
let listCocktails = [];
let favorites = [];

//constantes que voy a necesitar
const cocktails = document.querySelector('.js-list');
const favCocktails = document.querySelector('.js-favorit-list');
const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-button');
const resetBtn = document.querySelector('.js-reset');

//función para pintar el HTML
function paintCocktails(drinks) {
  let html = '';

  for (const cocktail of drinks) {
    //Busco con el id si está en favoritos
    let classFavorite = '';

    const favoriteFoundIndex = favorites.findIndex(
      (fav) => fav.idDrink === cocktail.idDrink
    );
    // console.log(favoriteFoundIndex);
    //Dependiendo del valor devuelto, añado la clase o no
    if (favoriteFoundIndex !== -1) {
      classFavorite = 'cocktail-favorite';
    } else {
      classFavorite = '';
    }
    html += `<li class="js-li all_list ${classFavorite}" id="${cocktail.idDrink}">`;
    html += `<h2>${cocktail.strDrink}</h2>`;
    if (cocktail.strDrinkThumb === undefined) {
      html += `<img class="img-small" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
    } else {
      html += `<img class="img-small" src="${cocktail.strDrinkThumb}"/>`;
    }
    html += `</li>`;
  }
  cocktails.innerHTML = html;

  //Declaro todas las li
  const liItems = document.querySelectorAll('.js-li');
  console.log(liItems);
  //Añado un evento click a cada li
  for (const item of liItems) {
    item.addEventListener('click', handleClickdrinks);
  }
}

//funcion de pintar los favoritos
function paintFavoritesCocktail(favoriteCocktail) {
  let html = '';
  for (const favCocktails of favoriteCocktail) {
    let classFavorite = '';
    html += `<li class="js-li fav_list ${classFavorite} " id="${favCocktails.idDrink}">`;
    html += `<h2>${favCocktails.strDrink}</h2>`;
    if (favCocktails.strDrinkThumb === undefined) {
      html += `<img class="img-small" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
    } else {
      html += `<img class="img-small" src="${favCocktails.strDrinkThumb}"/>`;
    }
    html += `</li>`;
  }
  favCocktails.innerHTML = html;
}
const listFavoritesStorage = JSON.parse(localStorage.getItem('favCocktails'));
paintFavoritesCocktail(favorites);

// Función manejadora del click
function handleClickdrinks(event) {
  //Saber a que cocktail le estoy dando click
  const idCocktailSelected = event.currentTarget.id;
  console.log(idCocktailSelected);
  const cocktailFound = listCocktails.find(
    (fav) => fav.idDrink === idCocktailSelected
  );
  console.log(cocktailFound);
  //comprobamos que el cocktail está en los favoritos
  const favoriteFoundIndex = favorites.findIndex((fav) => {
    return fav.idDrink === idCocktailSelected;
  });
  if (favoriteFoundIndex === -1) {
    favorites.push(cocktailFound);
  } else {
    favorites.splice(favoriteFoundIndex, 1);
  }
  // Aquí lo guardo en el localStorage
  // const listFavoritesStorage = JSON.parse(localStorage.getItem('favCocktails'));
  if (listFavoritesStorage !== null) {
    favorites = listFavoritesStorage;
    paintFavoritesCocktail(favorites);
  } else {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        listCocktails = data.drinks;
        localStorage.setItem('favCocktails', JSON.stringify(favorites));
      });
    // paintFavoritesCocktail(favorites);
  }
  paintCocktails(listCocktails);
  // paintFavoritesCocktail(favorites);
}

// función del botón de reset y que se borre la lista de bebidas
function reset() {
  listCocktails = [];
  input.value = '';
  paintCocktails(listCocktails);
}

// funcion de recoger los cocktails
function getCocktails(event) {
  const listFavoritesStorage = JSON.parse(localStorage.getItem('favCocktails'));
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
btn.addEventListener('click', getCocktails);
resetBtn.addEventListener('click', reset);
