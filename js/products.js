const ORDER_ASC_BY_PRICE = "ascByPrice";
const ORDER_DESC_BY_PRICE = "descByPrice";
const ORDER_DESC_BY_RELEVANCE = "descByRelevance";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;
let catID = localStorage.getItem("catID");
let productos = PRODUCTS_URL + catID + ".json";

// Funcion de comparacion para ordenar productos segun criterio seleccionado:
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ) { return -1; }
            if ( a.cost > b.cost ) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ) { return -1; }
            if ( a.cost < b.cost ) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_RELEVANCE) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ) { return -1; }
            if ( aCount < bCount ) { return 1; }
            return 0;
        });
    }
    return result;
}

// Redireccion al producto al seleccionarlo:
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

// Funcion que muestra lista de productos sin ordenar:
function showProductsList() {
    let htmlContentToAppend = ""; // dejo lista de productos vacia para llenar
    for (let product of currentProductsArray) {
        if ( !(parseInt(product.cost) < minPrice) && !(parseInt(product.cost) > maxPrice) ) {
            htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
}

// Funcion que muestra productos ordenados segun criterio seleccionado:
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;
    if(productsArray != undefined) {
        currentProductsArray = productsArray;
    }
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList();
}

// Funciones que se ejecutan una vez cargado todo el HTML:
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(productos).then(function(resultObj) {
        if (resultObj.status === "ok") {
            document.getElementsByClassName("lead")[0].innerHTML += `Verás aquí todos los productos de la categoría ${resultObj.data.catName}.`;
            currentProductsArray = resultObj.data.products;
            showProductsList();
        }
    });

    // Funciones que activan el orden de productos segun el boton pulsado (seleccionan criterio):
    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });
    document.getElementById("sortByRelevance").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_RELEVANCE);
    });

    // Funcion para limpiar filtro de rango:
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";
        minPrice = undefined;
        maxPrice = undefined;
        showProductsList();
    });

    // Funcion para filtrar productos por precio:
    document.getElementById("rangeFilterPrice").addEventListener("click", function() {
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;
        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = undefined;
        }
        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = undefined;
        }
        showProductsList();
    });
});