let subtotal = 0;
let shippingCost = 0;
let total = 0;

// Funcion que avisa si el carrito esta vacio:
function showEmptyCart() {
    document.getElementById("cartContainer").innerHTML = `
    <div class="alert alert-dark text-center" role="alert">
      <h4 class="alert-heading">¡Tu carrito de compras está vacío!</h4>
      <p>Añade artículos a tu lista para ver las opciones de compra.</p>
      <a href="categories.html" class="alert-link">Ver categorías de productos</a>
    </div>
    `;
}

// Funcion que muestra lista de articulos:
function showArticlesList() {
    let htmlContentToAppend = "";
    for (let article in cart) {
        htmlContentToAppend += `
        <div class="row border-bottom py-2">
            <div class="col-2">
                <img height="50px" src="${cart[article][0].image}" alt="${cart[article][0].name}">
            </div>
            <div class="col-3">
                ${cart[article][0].name}
            </div>
            <div class="col-2">
            ${cart[article][0].currency} ${cart[article][0].unitCost}
            </div>
            <div class="col-2">
                <input class="form-control w-50" type="number" id="cantidad" name="cantidad" min="1" value="${cart[article][0].count}" 
                    oninput="modifyArticleCount(${article},this.value)">
            </div>
            <div class="col-2">
                <strong>${cart[article][0].currency} </strong>
                <strong class="subtotal" id="${article}">${cart[article][0].subtotal}</strong>
            </div>
            <div class="col-1">
                <button type="button" class="btn btn-outline-danger" onclick="deleteArticle(${article})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
            </div>
        </div>
        `;
    }
    document.getElementById("articlesList").innerHTML += htmlContentToAppend;
}

// Funcion que elimina un articulo del carrito:
function deleteArticle(article) {
    let id = article.getAttribute('id');
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    if (Object.entries(cart).length === 0) {
        showEmptyCart();
    } else {
        event.target.parentNode.parentNode.remove();
    }
}

// Funcion que modifica la cantidad de un articulo y recalcula subtotales:
function modifyArticleCount(article, count) {
    let id = article.getAttribute('id');
    cart[id][0].count = count;
    cart[id][0].subtotal = cart[id][0].unitCost * count;
    article.innerHTML = cart[id][0].subtotal;
    localStorage.setItem("cart", JSON.stringify(cart));
    calculateSubtotal(); // recalcula subtotal general
    calculateShippingCost(); // recalcula costo de envio
    calculateTotal(); // recalcula total
}

// Función que calcula el subtotal general:
function calculateSubtotal() {
    subtotal = 0;
    for (let article in cart) {
        if (cart[article][0].currency == "UYU") {
            subtotal += cart[article][0].subtotal * 0.025;
        } else {
            subtotal += cart[article][0].subtotal;
        }
    }
    document.getElementById("subtotal").innerHTML = subtotal.toFixed(2);
}

// Función que calcula el costo de envio:
function calculateShippingCost() {
    shippingCost = 0;
    if (document.getElementById("premium").checked) {
        shippingCost = subtotal * 0.15;
    } else if (document.getElementById("express").checked) {
        shippingCost = subtotal * 0.07;
    } else {
        shippingCost = subtotal * 0.05;
    }
    document.getElementById("shippingCost").innerHTML = shippingCost.toFixed(2);
}

// Función que calcula el total:
function calculateTotal() {
    total = subtotal + shippingCost;
    document.getElementById("total").innerHTML = total.toFixed(2);
}

// Funciones que se ejecutan una vez cargado todo el HTML:
document.addEventListener("DOMContentLoaded", function () {
    if (Object.entries(cart).length === 0) {
        showEmptyCart(); // aviso si el carrito esta vacio
    } else {
        // Cargo carrito y calculo costos:
        showArticlesList();
        calculateSubtotal();
        calculateShippingCost();
        calculateTotal();
        // Recalculo costos si cambia tipo de envio:
        document.getElementsByName("tipoEnvio").forEach(function(radios) {
            radios.addEventListener("change", function() {
                calculateShippingCost();
                calculateTotal();
            })
        });
        // Desabilito opciones del medio de pago no seleccionado:
        document.getElementsByName("medioPago").forEach(function(radios) {
            radios.addEventListener("change", function() {
                if (document.getElementById("tarjeta").checked) {
                    document.getElementById("numeroCuenta").disabled = true;
                    document.getElementById("numeroTarjeta").disabled = false;
                    document.getElementById("codigoSeg").disabled = false;
                    document.getElementById("vencimiento").disabled = false;
                }
                if (document.getElementById("transferencia").checked) {
                    document.getElementById("numeroCuenta").disabled = false;
                    document.getElementById("numeroTarjeta").disabled = true;
                    document.getElementById("codigoSeg").disabled = true;
                    document.getElementById("vencimiento").disabled = true;
                }
            })
        });
    }
});