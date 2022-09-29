document.addEventListener("DOMContentLoaded", function(){
    // Funcion para obtener y validar datos ingresados en formulario de log in:
    document.getElementById("ingresar").addEventListener("click", function(){
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let valid = true; // bandera para validacion
        let alertas = document.getElementById("login-form").getElementsByTagName("span"); // alertas para campos invalidos
        if (email.value == "") {
            valid = false;
            alertas[0].innerHTML = `<br>Ingresa tu e-mail`;
            email.style.borderColor = "red";
        }
        if (password.value == "") {
            valid = false;
            alertas[1].innerHTML = `<br>Ingresa tu contraseña`;
            password.style.borderColor = "red";
        }
        if (valid == true) {
            window.location = "index.html"; // redirecciona a web principal si datos validos
            // Borro email previo del local storage si lo hubiera:
            if (localStorage.getItem("usuario") != null) {
                localStorage.removeItem("usuario");
            };
            // Guardo email ingresado en local storage:
            localStorage.setItem("usuario",email.value);
        }
    })
});