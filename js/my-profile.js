// Inicializo datos de usuario (primera vez que ingresa):
if (Object.keys(userData).toString().indexOf(cartUser) === -1) {
    userData[cartUser] = [
        {
            primerNombre: "",
            segundoNombre: "",
            primerApellido: "",
            segundoApellido: "",
            eMail: user,
            telefono: ""
        }
    ]
    localStorage.setItem("userData", JSON.stringify(userData));
}

// Funcion que valida formulario al guardar cambios:
function validateForm(event) {
    if (!formDatosPerfil.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        saveChanges();
    }
    formDatosPerfil.classList.add('was-validated');
}

// Funcion que guarda cambios en datos del perfil:
function saveChanges() {
    // Primero cambio usuario si se modifico el email:
    if (document.getElementById("eMail").value != user) {
        delete userData[cartUser];
        user = document.getElementById("eMail").value;
        cartUser = user.replace("@", "").replaceAll(".", "");
        localStorage.setItem("user", user);
    }
    // Guardo nuevos datos de usuario:
    userData[cartUser] = [
        {
            primerNombre: document.getElementById("primerNombre").value,
            segundoNombre: document.getElementById("segundoNombre").value,
            primerApellido: document.getElementById("primerApellido").value,
            segundoApellido: document.getElementById("segundoApellido").value,
            eMail: document.getElementById("eMail").value,
            telefono: document.getElementById("telefono").value
        }
    ]
    localStorage.setItem("userData", JSON.stringify(userData));
}

// Funciones que se ejecutan una vez cargado todo el HTML:
document.addEventListener("DOMContentLoaded", function () {
    // Cargo datos preexistentes:
    document.getElementById("primerNombre").value = userData[cartUser][0].primerNombre;
    document.getElementById("segundoNombre").value = userData[cartUser][0].segundoNombre;
    document.getElementById("primerApellido").value = userData[cartUser][0].primerApellido;
    document.getElementById("segundoApellido").value = userData[cartUser][0].segundoApellido;
    document.getElementById("eMail").value = user;
    document.getElementById("telefono").value = userData[cartUser][0].telefono;

    // Guardo cambios:
    formDatosPerfil.addEventListener("submit", function () {
        validateForm(event);
    });
});