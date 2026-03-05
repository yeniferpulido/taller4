import flor from "./flor.js";

// Script base para la vista de catálogo
// Aquí deben consumir la API de items y mostrarlos en la página

// Constante con la URL base de la API
const API_URL = "/api/items";

// TODO: Seleccionar el contenedor donde se mostrarán los items
const catalogContainer = document.getElementById("catalogContainer");
// const catalogContainer = document.getElementById("...");

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
    // Crear un elemento HTML (card)
    const card = document.createElement("div");
    card.classList.add("card");

    // Asignar los datos del item
    card.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}">
        <p><strong>ID:</strong> ${item.id}</p>
        <p>${item.description}</p>
        <p><strong>Precio:</strong> $${item.price}</p>
        <p><strong>Tamaño:</strong> ${item.size}</p>
        <p><strong>Origen:</strong> ${item.origen}</p>
    `;
    
    // Insertar el elemento en el contenedor
    catalogContainer.appendChild(card);
}

// Inicializar el catálogo cuando cargue la página
loadCatalog();





