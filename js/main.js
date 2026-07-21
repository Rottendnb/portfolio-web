"use strict";

/* =========================
   MENÚ DE NAVEGACIÓN MÓVIL
========================= */

const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu");
const enlacesMenu = document.querySelectorAll(".menu a");

if (botonMenu && menu) {
    botonMenu.addEventListener("click", () => {
        const menuAbierto = menu.classList.toggle("activo");

        botonMenu.setAttribute(
            "aria-expanded",
            menuAbierto.toString()
        );
    });
}

/* Cierra el menú móvil al pulsar un enlace */

enlacesMenu.forEach((enlace) => {
    enlace.addEventListener("click", () => {
        if (menu) {
            menu.classList.remove("activo");
        }

        if (botonMenu) {
            botonMenu.setAttribute("aria-expanded", "false");
        }
    });
});

/* Cierra el menú al pulsar fuera de él */

document.addEventListener("click", (evento) => {
    if (!botonMenu || !menu) {
        return;
    }

    const pulsacionDentroDelMenu = menu.contains(evento.target);
    const pulsacionEnBoton = botonMenu.contains(evento.target);

    if (!pulsacionDentroDelMenu && !pulsacionEnBoton) {
        menu.classList.remove("activo");
        botonMenu.setAttribute("aria-expanded", "false");
    }
});


/* =========================
   AÑO AUTOMÁTICO DEL FOOTER
========================= */

const elementoAnio = document.getElementById("anio");

if (elementoAnio) {
    elementoAnio.textContent = new Date().getFullYear();
}


/* =========================
   ENLACE ACTIVO DEL MENÚ
========================= */

const secciones = document.querySelectorAll("section[id]");

function marcarEnlaceActivo() {
    const posicionScroll = window.scrollY + 150;

    secciones.forEach((seccion) => {
        const inicioSeccion = seccion.offsetTop;
        const alturaSeccion = seccion.offsetHeight;
        const idSeccion = seccion.getAttribute("id");

        const enlaceCorrespondiente = document.querySelector(
            `.menu a[href="#${idSeccion}"]`
        );

        if (!enlaceCorrespondiente) {
            return;
        }

        const estaDentro =
            posicionScroll >= inicioSeccion &&
            posicionScroll < inicioSeccion + alturaSeccion;

        enlaceCorrespondiente.classList.toggle(
            "enlace-activo",
            estaDentro
        );
    });
}

window.addEventListener("scroll", marcarEnlaceActivo);
window.addEventListener("load", marcarEnlaceActivo);


/* =========================
   FORMULARIO DE CONTACTO
========================= */

const formularioContacto = document.getElementById(
    "formulario-contacto"
);

if (formularioContacto) {
    formularioContacto.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = document
            .getElementById("nombre")
            .value
            .trim();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const asunto = document
            .getElementById("asunto")
            .value
            .trim();

        const mensaje = document
            .getElementById("mensaje")
            .value
            .trim();

        if (!nombre || !email || !asunto || !mensaje) {
            mostrarMensajeFormulario(
                "Por favor, completa todos los campos.",
                "error"
            );

            return;
        }

        if (!validarEmail(email)) {
            mostrarMensajeFormulario(
                "Introduce un correo electrónico válido.",
                "error"
            );

            return;
        }

        mostrarMensajeFormulario(
            "Formulario completado correctamente. Todavía falta conectarlo para enviar correos.",
            "correcto"
        );

        formularioContacto.reset();
    });
}


/* Comprueba que el correo tenga un formato válido */

function validarEmail(email) {
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresionEmail.test(email);
}


/* Crea un mensaje debajo del botón del formulario */

function mostrarMensajeFormulario(texto, tipo) {
    if (!formularioContacto) {
        return;
    }

    let mensajeFormulario = document.getElementById(
        "mensaje-formulario"
    );

    if (!mensajeFormulario) {
        mensajeFormulario = document.createElement("p");
        mensajeFormulario.id = "mensaje-formulario";
        mensajeFormulario.setAttribute("role", "status");

        formularioContacto.appendChild(mensajeFormulario);
    }

    mensajeFormulario.textContent = texto;
    mensajeFormulario.className = `mensaje-formulario ${tipo}`;
}

/* =========================
   AVISO DE WHATSAPP
========================= */

const botonWhatsapp = document.getElementById("boton-whatsapp");

if (botonWhatsapp) {
    botonWhatsapp.addEventListener("click", () => {
        mostrarAvisoWhatsapp();
    });
}

function mostrarAvisoWhatsapp() {
    let aviso = document.getElementById("aviso-whatsapp");

    if (!aviso) {
        aviso = document.createElement("div");
        aviso.id = "aviso-whatsapp";
        aviso.className = "aviso-whatsapp";
        aviso.setAttribute("role", "status");

        aviso.innerHTML = `
            <strong>¡Gracias por contactar!</strong>
            <span>En cuanto vea tu mensaje me pondré en contacto contigo.</span>
        `;

        document.body.appendChild(aviso);
    }

    aviso.classList.add("visible");

    setTimeout(() => {
        aviso.classList.remove("visible");
    }, 4000);
}

/* =========================
   BOTÓN VOLVER ARRIBA
========================= */

const botonVolverArriba = document.getElementById("volver-arriba");

if (botonVolverArriba) {
    window.addEventListener("scroll", () => {
        botonVolverArriba.classList.toggle(
            "visible",
            window.scrollY > 500
        );
    });

    botonVolverArriba.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}