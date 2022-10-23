const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function() {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function() {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url) {
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

let logOut = function() {
  localStorage.removeItem("usuario");
  localStorage.setItem("redirectedFrom",window.location);
  window.location = "login.html";
}

// Mostrar menu de usuario en barra de navegacion:
let usuario = localStorage.getItem("usuario");
let navItem = document.getElementsByClassName('nav-item');
if (usuario != null) {
  navItem[3].innerHTML = `
  <div class="dropdown">
    <button class="btn btn-dark dropdown-toggle" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
      ${usuario}
    </button>
    <ul class="dropdown-menu" aria-labelledby="userMenu">
      <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
      <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
      <li><p class="dropdown-item cursor-active" onclick="logOut()">Cerrar sesión</p></li>
    </ul>
  </div>
  `;
} else {
  navItem[3].innerHTML = `
  <a class="nav-link" href="login.html" onclick='localStorage.setItem("redirectedFrom",window.location)'>Log In</a>
  `;
};

// Inicializo carrito de compras:
let cart = JSON.parse(localStorage.getItem("cart"));
if (cart == null) {
  cart = {};
}