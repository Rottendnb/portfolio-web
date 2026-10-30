"use strict";

const options = {
    "web-inicial": { value: "Web inicial", title: "Web inicial", price: "Proyecto orientativo desde 290 €." },
    "web-profesional": { value: "Web profesional", title: "Web profesional", price: "Proyecto orientativo desde 490 €." },
    "solucion-medida": { value: "Solución a medida", title: "Solución a medida", price: "Proyecto orientativo desde 790 €." }
};

const params = new URLSearchParams(window.location.search);
const selected = options[params.get("servicio")];
const select = document.querySelector("[data-service-select]");
const title = document.querySelector("[data-selected-service]");
const price = document.querySelector("[data-selected-price]");
const subject = document.querySelector("[data-form-subject]");

const updateSummary = (service) => {
    const option = Object.values(options).find((item) => item.value === service);
    title.textContent = option?.title || service || "Proyecto por definir";
    price.textContent = option?.price || "Prepararemos el alcance contigo.";
    subject.value = `Nueva consulta de presupuesto: ${title.textContent}`;
};

if (selected && select) {
    select.value = selected.value;
    updateSummary(selected.value);
}

select?.addEventListener("change", (event) => updateSummary(event.target.value));
