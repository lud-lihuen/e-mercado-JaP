let productID = localStorage.getItem("productID");
let productURL = PRODUCT_INFO_URL + productID + ".json";
let commentsURL = PRODUCT_INFO_COMMENTS_URL + productID + ".json";
let images = "";
let indicators = "";
let carousel = "";

// Funcion que muestra informacion del producto:
function showProductInfo() {

    // Preparo imagenes extra para el carousel:
    for (let i = 1; i < product.images.length; i++) {
        images += `
        <div class="carousel-item" data-bs-interval="3000">
            <img src="${product.images[i]}" class="d-block w-100" alt="Slide ${i}">
        </div>
        `;
        indicators += `
        <button type="button" data-bs-target="#carouselForImages" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>
        `;
    }
    
    // Preparo carousel de imagenes para agregar luego al html:
    carousel = `
    <div id="carouselForImages" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselForImages" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            ${indicators}
        </div>

        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="3000">
                <img src="${product.images[0]}" class="d-block w-100" alt="Slide 1">
            </div>
            ${images}
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselForImages" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselForImages" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
        </button>
    </div>
    `;

    // Agrego informacion del producto al html:
    document.getElementById("product-info").innerHTML += `
    <div class="col-9 text-left mt-4 py-4">
        <h2>${product.name}</h2>
    </div>
    <div class="col-3 mt-4 py-4">
        <button type="button" class="btn btn-success" onclick="addToCart()">Comprar</button>
    </div>
    <hr>
    <div class="col-9 text-left">
        <h6 class="fw-bold">Precio</h6>
        <p>${product.currency} ${product.cost}</p>
        <h6 class="fw-bold">Descripción</h6>
        <p>${product.description}</p>
        <h6 class="fw-bold">Categoría</h6>
        <p>${product.category}</p>
        <h6 class="fw-bold">Cantidad de vendidos</h6>
        <p>${product.soldCount}</p>
        <h6 class="fw-bold">Imágenes ilustrativas</h6>
    </div>
    <div class="col-3">
        <a href="products.html" style="color: #212529; text-decoration: none;">&#129136; Volver al listado</a>
    </div>
    <div class="col-12 col-lg-8 mt-2 pb-4">
        ${carousel}
    </div>
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
        <div class="card">
            <div class="card-body">
                <p class="small mb-1"><b>${comment.user}</b> - ${comment.dateTime} - ${estrellas}</p>
                <p class="small text-muted mb-0">${comment.description}</p>
            </div>
        </div>
        `;
    }
    document.getElementById("product-comments").innerHTML += `
    <hr>
    <div class="m-4" id="comments-box">
        <h5 class="pb-2">Comentarios</h5>
        ${htmlContentToAppend}
    </div>
    `;
}

// Funcion que muestra controles para agregar comentario:
function showAddComment() {
    document.getElementById("product-comments").innerHTML += `
    <div class="m-4">
        <h5 class="pb-2">Comentar</h5>
        <div class="col-6 pb-4" id="add-comment">
            <p>Tu opinión:
            <textarea class="form-control" rows="3" id="commentDescription"></textarea></p>
            <p>Tu puntuación:
            <select class="form-select" style="max-width:25%" id="commentStars">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            </p>
            <button type="submit" class="btn btn-primary" id="enviarComentario">Enviar</button>
        </div>
    </div>
    `;
}

// Funcion para agregar comentario nuevo:
function addComment() {
    // Obtengo la informacion sobre el comentario:
    let commentDescription = document.getElementById("commentDescription").value;

    // Fecha:
    let commentTime = new Date();
    let year = commentTime.getFullYear();
    let month = String(commentTime.getMonth() + 1).padStart(2, '0');
    let date = String(commentTime.getDate()).padStart(2, '0');
    let hours = String(commentTime.getHours()).padStart(2, '0');
    let minutes = String(commentTime.getMinutes()).padStart(2, '0');
    let seconds = String(commentTime.getSeconds()).padStart(2, '0');
    commentTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    // Calificacion en estrellas:
    let commentStars = "";
    let checked = parseInt(document.getElementById("commentStars").value);
    let unchecked = 5 - checked;
    for (let i = 1; i <= checked; i++) {
        commentStars += `<span class="fa fa-star checked"></span>`
    }
    for (let i = 1; i <= unchecked; i++) {
        commentStars += `<span class="fa fa-star"></span>`
    }

    // Inserto comentario en el html:
    document.getElementById("comments-box").innerHTML += `
    <div class="card">
        <div class="card-body">
            <p class="small mb-1"><b>${shortUser}</b> - ${commentTime} - ${commentStars}</p>
            <p class="small text-muted mb-0">${commentDescription}</p>
        </div>
    </div>
    `;
}

// Funcion que muestra productos relacionados:
function showRelatedProducts() {
    // Preparo tarjetas de productos relacionados para agregar luego:
    let cards = "";
    for (let relatedProduct of product.relatedProducts) {
        cards += `
        <div class="col-6 col-md-3">
            <div class="card cursor-active" onclick="setProductID(${relatedProduct.id})">
                <img src="${relatedProduct.image}" class="card-img-top" alt="${relatedProduct.name}">
                <div class="card-body">
                    <h6 class="card-title">${relatedProduct.name}</h5>
                </div>
            </div>
        </div>
        `;
    }
    // Agrego productos relacionados al html:
    document.getElementById("related-products").innerHTML += `
    <hr>
    <div class="m-4">
        <h5 class="pb-2">Productos relacionados</h5>
        <div class="row">
            ${cards}
        </div>
    </div>
    `;
}

// Redireccion al producto relacionado al seleccionarlo:
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

// Funcion para agregar producto al carrito:
function addToCart() {
    if (user == null) {
        localStorage.setItem("redirectedFrom", window.location);
        window.location = "login.html";
    } else {
        let article = cartUser + productID;
        if (cart[article]) {
            window.location = "cart.html";
        } else {
            cart[article] = [
                {
                    id: product.id,
                    name: product.name,
                    count: 1,
                    unitCost: product.cost,
                    subtotal: product.cost,
                    currency: product.currency,
                    image: product.images[0]
                }
            ]
            localStorage.setItem("cart",JSON.stringify(cart));
            window.location = "cart.html";
        }
    }
}

// Funciones que se ejecutan una vez cargado todo el HTML:
document.addEventListener("DOMContentLoaded", function () {

    // Funcion que obtiene informacion del producto:
    getJSONData(productURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            showProductInfo(); // Muestro informacion del producto
            showRelatedProducts() // Muestro productos relacionados

            // Funcion que obtiene comentarios del producto:
            getJSONData(commentsURL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    comments = resultObj.data;
                    showComments(); // Muestro comentarios del producto

                    // Muestro controles para agregar comentario si hay usuario logueado:
                    if (localStorage.getItem("user") != null) {
                        showAddComment();

                        // Funcion para agregar comentario nuevo:
                        document.getElementById("enviarComentario").addEventListener("click", function () {
                            addComment();
                        });
                    }
                }
            });
        }
    });
});