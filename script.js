var URL_DESTINO = "https://jsonplaceholder.typicode.com/posts";

var form = document.getElementById("formContacto");
var boton = document.getElementById("enviar");
var respuesta = document.getElementById("respuesta");

var nombre = document.getElementById("nombre");
var correo = document.getElementById("correo");
var mensaje = document.getElementById("mensaje");

function validarCorreo(texto) {
    var arroba = texto.indexOf("@");
    var punto = texto.lastIndexOf(".");
    if (arroba < 1) {
        return false;
    }
    if (punto < arroba + 2) {
        return false;
    }
    if (punto >= texto.length - 1) {
        return false;
    }
    if (texto.indexOf(" ") != -1) {
        return false;
    }
    return true;
}

function mostrarError(id, texto) {
    document.getElementById("error-" + id).textContent = texto;
    document.getElementById(id).parentElement.classList.add("invalido");
}

function limpiarError(id) {
    document.getElementById("error-" + id).textContent = "";
    document.getElementById(id).parentElement.classList.remove("invalido");
}

function validar() {
    var valido = true;

    limpiarError("nombre");
    limpiarError("correo");
    limpiarError("mensaje");

    if (nombre.value.trim() == "") {
        mostrarError("nombre", "Escribe tu nombre.");
        valido = false;
    }

    if (correo.value.trim() == "") {
        mostrarError("correo", "Escribe tu correo electrónico.");
        valido = false;
    } else if (validarCorreo(correo.value.trim()) == false) {
        mostrarError("correo", "Escribe un correo válido, por ejemplo nombre@dominio.com.");
        valido = false;
    }

    if (mensaje.value.trim() == "") {
        mostrarError("mensaje", "Escribe un mensaje.");
        valido = false;
    }

    return valido;
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    respuesta.className = "";
    respuesta.textContent = "";

    if (validar() == false) {
        return;
    }

    var datos = {
        nombre: nombre.value.trim(),
        correo: correo.value.trim(),
        mensaje: mensaje.value.trim()
    };

    boton.disabled = true;
    boton.textContent = "Enviando...";

    fetch(URL_DESTINO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
        .then(function (resp) {
            if (resp.ok) {
                respuesta.className = "ok";
                respuesta.textContent = "¡Gracias, " + datos.nombre + "! Tu mensaje se envió correctamente.";
                form.reset();
            } else {
                respuesta.className = "fallo";
                respuesta.textContent = "No se pudo enviar el mensaje. Inténtalo de nuevo.";
            }
            boton.disabled = false;
            boton.textContent = "Enviar";
        })
        .catch(function () {
            respuesta.className = "fallo";
            respuesta.textContent = "No se pudo enviar el mensaje. Inténtalo de nuevo.";
            boton.disabled = false;
            boton.textContent = "Enviar";
        });
});

nombre.addEventListener("input", function () {
    limpiarError("nombre");
});

correo.addEventListener("input", function () {
    limpiarError("correo");
});

mensaje.addEventListener("input", function () {
    limpiarError("mensaje");
});
