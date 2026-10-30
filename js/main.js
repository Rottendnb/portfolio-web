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
    formularioContacto.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        if (!formularioContacto.checkValidity()) {
            formularioContacto.reportValidity();

            mostrarMensajeFormulario(
                "Revisa los campos obligatorios y acepta el consentimiento para continuar.",
                "error"
            );

            return;
        }

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

        const botonEnviar = formularioContacto.querySelector(
            'button[type="submit"]'
        );
        const textoOriginalBoton = botonEnviar.textContent;

        botonEnviar.disabled = true;
        botonEnviar.textContent = "Enviando...";

        try {
            const respuesta = await fetch(formularioContacto.action, {
                method: "POST",
                body: new FormData(formularioContacto),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!respuesta.ok) {
                throw new Error("No se pudo completar el envío");
            }

            mostrarMensajeFormulario(
                "Mensaje enviado correctamente. Te responderé lo antes posible.",
                "correcto"
            );

            formularioContacto.reset();
        } catch (error) {
            mostrarMensajeFormulario(
                "No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbeme directamente por correo.",
                "error"
            );
        } finally {
            botonEnviar.disabled = false;
            botonEnviar.textContent = textoOriginalBoton;
        }
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
   FORMULARIO DE OPINIONES
========================= */

const formularioOpinion = document.getElementById(
    "formulario-opinion"
);

if (formularioOpinion) {
    formularioOpinion.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        if (!formularioOpinion.checkValidity()) {
            formularioOpinion.reportValidity();
            return;
        }

        const botonEnviar = formularioOpinion.querySelector(
            'button[type="submit"]'
        );
        const textoOriginalBoton = botonEnviar.textContent;

        botonEnviar.disabled = true;
        botonEnviar.textContent = "Enviando...";

        try {
            const respuesta = await fetch(formularioOpinion.action, {
                method: "POST",
                body: new FormData(formularioOpinion),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!respuesta.ok) {
                throw new Error("No se pudo completar el envío");
            }

            mostrarMensajeOpinion(
                "Gracias por compartir tu experiencia. Revisaré la opinión antes de publicarla.",
                "correcto"
            );

            formularioOpinion.reset();
        } catch (error) {
            mostrarMensajeOpinion(
                "No se ha podido enviar la opinión. Inténtalo de nuevo más tarde.",
                "error"
            );
        } finally {
            botonEnviar.disabled = false;
            botonEnviar.textContent = textoOriginalBoton;
        }
    });
}

function mostrarMensajeOpinion(texto, tipo) {
    if (!formularioOpinion) {
        return;
    }

    let mensajeOpinion = document.getElementById(
        "mensaje-opinion"
    );

    if (!mensajeOpinion) {
        mensajeOpinion = document.createElement("p");
        mensajeOpinion.id = "mensaje-opinion";
        mensajeOpinion.setAttribute("role", "status");
        mensajeOpinion.className = "campo-completo";

        formularioOpinion.appendChild(mensajeOpinion);
    }

    mensajeOpinion.textContent = texto;
    mensajeOpinion.className = `mensaje-formulario campo-completo ${tipo}`;
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
