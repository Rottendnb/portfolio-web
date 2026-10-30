"use strict";

const projectForm = document.querySelector("[data-project-form]");
const submitButton = document.querySelector("[data-submit-button]");
const submitLabel = document.querySelector("[data-submit-label]");
const formStatus = document.querySelector("[data-form-status]");

projectForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    submitLabel.textContent = "Enviando…";
    formStatus.textContent = "";

    try {
        const response = await fetch(projectForm.action, {
            method: "POST",
            body: new FormData(projectForm),
            headers: { Accept: "application/json" }
        });

        if (!response.ok) throw new Error("No se pudo completar el envío");
        window.location.assign("gracias.html");
    } catch (error) {
        formStatus.textContent = "No se ha podido enviar la consulta. Inténtalo de nuevo o escríbeme por WhatsApp.";
        submitButton.disabled = false;
        submitLabel.textContent = "Enviar consulta";
    }
});
