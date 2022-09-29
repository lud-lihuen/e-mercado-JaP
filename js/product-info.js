let productID = localStorage.getItem("productID");
let productURL = PRODUCT_INFO_URL + productID + ".json";
let commentsURL = PRODUCT_INFO_COMMENTS_URL + productID + ".json";

// Funcion que muestra informacion del producto:
function showProductInfo() {
    // Preparo apartado de imagenes para agregar luego:
    let images = "";
    for (let imagen of product.images) {
        images += `
        <img height="150" src="${imagen}"</img>
        `;
    }
    // Agrego informacion del producto al html:
    document.getElementById("product-info").innerHTML += `
    <div class="text-left pt-4 pb-2">
        <h2>${product.name}</h2>
    </div>
    <hr>
    <h6 class="fw-bold">Precio</h6>
    <p>${product.currency} ${product.cost}</p>
    <h6 class="fw-bold">Descripción</h6>
    <p>${product.description}</p>
    <h6 class="fw-bold">Categoría</h6>
    <p>${product.category}</p>
    <h6 class="fw-bold">Cantidad de vendidos</h6>
    <p>${product.soldCount}</p>
    <h6 class="fw-bold">Imágenes ilustrativas</h6>
    <div class="mb-4">${images}</div>
    `;
}

// Funcion que muestra comentarios del producto:
function showComments() {
    let htmlContentToAppend = "";
    for (let comment of comments) {
        // Preparo apartado de estrellas para mostrar en comentarios:
        let estrellas = "";
        let checked = parseInt(comment.score);
        let unchecked = 5 - checked;
        for (let i = 1; i <= checked; i++) {
            estrellas += `<span class="fa fa-star checked"></span>`
        }
        for (let i = 1; i <= unchecked; i++) {
            estrellas += `<span class="fa fa-star"></span>`
        }
        // Agrego comentario del producto al html:
        htmlContentToAppend += `
        <div class="card mx-4">
            <div class="card-body">
                <p class="small mb-1"><b>${comment.user}</b> - ${comment.dateTime} - ${estrellas}</p>
                <p class="small text-muted mb-0">${comment.description}</p>
            </div>
        </div>
        `;
    }
    document.getElementById("product-comments").innerHTML += `
    <hr>
    <h5 class="m-4">Comentarios</h5>
    ${htmlContentToAppend}
    `;
}

// Funcion que muestra controles para agregar comentario:
function addComment() {
    document.getElementById("product-comments").innerHTML += `
    <h5 class="m-4">Comentar</h5>
    <div class="col-6 mx-4" id="add-comment">
        <p>Tu opinión:
        <textarea class="form-control" rows="3"></textarea></p>
        <p>Tu puntuación:
        <select class="form-select" style="max-width:25%">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        </p>
        <button type="submit" class="btn btn-primary">Enviar</button>
    </div>
    `;
}

// Funciones que se ejecutan una vez cargado todo el HTML:
document.addEventListener("DOMContentLoaded", function () {
    // Funcion que obtiene informacion del producto:
    getJSONData(productURL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            showProductInfo(); // Muestro informacion del producto
            // Funcion que obtiene comentarios del producto:
            getJSONData(commentsURL).then(function(resultObj) {
                if (resultObj.status === "ok") {
                    comments = resultObj.data;
                    showComments(); // Muestro comentarios del producto
                    addComment(); // Muestro controles para agregar comentario
                }
            });
        }
    });     
});

/* 
Decidí que lo más lógico es que SOLO cargue los comentarios si ya tengo el OK para la información del producto,
y que SOLO agregue la función de añadir comentario si ya tengo el OK para la carga de comentarios previos.
*/