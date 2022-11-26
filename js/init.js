const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

// Defino variables de usuario que voy a usar en varias paginas:
let user = localStorage.getItem("user");
let shortUser = "anonymous";
let cartUser = "anonymous";
if (user != null) {
  shortUser = user.slice(0, user.indexOf("@"));
  cartUser = user.replace("@", "").replaceAll(".", "");
}

// Funciones para spinner de carga:
let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

// Funcion para solicitar datos de un JSON:
let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

// Funcion para cerrar sesion:
let logOut = function () {
  localStorage.removeItem("user");
  localStorage.setItem("redirectedFrom", window.location);
  window.location = "login.html";
}

// Mostrar menu de user en barra de navegacion:
let navItem = document.getElementsByClassName('nav-item');
if (user != null) {
  navItem[3].innerHTML = `
  <div class="dropdown">
    <button class="btn btn-dark dropdown-toggle" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
      ${shortUser}
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

// Inicializo datos de usuario:
let userData = JSON.parse(localStorage.getItem("userData"));
if (userData == null) {
    userData = {};
}