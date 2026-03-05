import Flor from "./ui/flor.js";

// Script base para la vista de catálogo
// Aquí deben consumir la API de items y mostrarlos en la página

// Constante con la URL base de la API
const API_URL = "/api/items";

// TODO: Seleccionar el contenedor donde se mostrarán los items
const catalogContainer = document.getElementById("catalogContainer");
const modal = document.getElementById("flor-modal");

// Función principal para cargar los items desde la API
async function loadCatalog() {
    try {
        // 1. Hacer fetch a la API (GET /api/items)
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("No se pudieron obtener los items");
        }
        // 2. Parsear la respuesta a JSON
        const items = await response.json();
        
        // 3. Limpiar el contenedor del catálogo
        catalogContainer.innerHTML = "";

        // 4. Iterar sobre cada item y llamar a renderItem()
         items.forEach(item => {
            renderItem(item);
        });
    } catch (err) {
        console.error("Error cargando catálogo:", err);
        // TODO: Mostrar mensaje de error en la UI
         catalogContainer.innerHTML = "<p>Error cargando los items</p>";
    }
}

// Función para renderizar un item en el catálogo
function renderItem(item) {

    // Crear objeto Flor (modelo)
    const flor = new Flor(
        item.id,
        item.name,
        item.price,
        item.color,
        item.size,
        item.origin,   
        item.description
    );

    const card = document.createElement("div");
    card.classList.add("card");

    // SOLO lo básico en la tarjeta
    card.innerHTML = `
        <h2>${flor.name}</h2>
        <img src="${item.image}" alt="${flor.name}" class="flor-img">
        <p><strong>$${flor.price}</strong></p>
    `;

    // Evento click en la imagen
    card.querySelector("img").addEventListener("click", () => {
        openModal(flor, item.image);
    });

    catalogContainer.appendChild(card);
}

function openModal(flor, image) {

    document.getElementById("modal-name").textContent = flor.name;
    document.getElementById("modal-img").src = image;
    document.getElementById("modal-id").textContent = "ID: " + flor.id;
    document.getElementById("modal-price").textContent = flor.price;
    document.getElementById("modal-color").textContent = flor.color;
    document.getElementById("modal-size").textContent = flor.size;
    document.getElementById("modal-origin").textContent = flor.origin;
    document.getElementById("modal-description").textContent = flor.description;

    modal.classList.remove("hidden");
}

// Cerrar modal si hacen click afuera
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});




// Inicializar el catálogo cuando cargue la página
loadCatalog();





