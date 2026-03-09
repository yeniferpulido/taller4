import Flor from "./ui/flor.js";

const API_URL = "/api/items";

const modal = document.getElementById("flor-modal");
const closeModal = document.getElementById("close-modal");

const categorySelect = document.getElementById("categorySelect");
const valueSelect = document.getElementById("valueSelect");
const resultsContainer = document.getElementById("resultsContainer");

let allItems = [];

//Cargar todos los items al iniciar
async function loadItems() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error cargando items");
        allItems = await res.json();
    } catch (error) {
        console.error(error);
    }
}

loadItems();

//Cuando cambie la categoría
categorySelect.addEventListener("change", () => {
    const category = categorySelect.value;

    valueSelect.innerHTML = "";
    resultsContainer.innerHTML = "";

    if (!category) {
        valueSelect.disabled = true;
        return;
    }

    valueSelect.disabled = false;

    //Obtener valores únicos
    const uniqueValues = [
        ...new Set(
            allItems
                .map(item => item[category])
                .filter(value => value !== undefined && value !== null)
        )
    ];

    valueSelect.innerHTML = `<option value="">Seleccione una opción</option>`;

    uniqueValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        valueSelect.appendChild(option);
    });
});

//Cuando cambie el valor
valueSelect.addEventListener("change", () => {
    const category = categorySelect.value;
    const value = valueSelect.value;

    resultsContainer.innerHTML = "";

    if (!value) return;

    const filtered = allItems.filter(item => item[category] == value);

    if (filtered.length === 0) {
        resultsContainer.innerHTML = "<p class='no-results'>No se encontraron resultados</p>";
        return;
    }

    filtered.forEach(item => {
        renderItem(item);
    });
});

function renderItem(item) {

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

    card.innerHTML = `
        <h2>${flor.name}</h2>
        <img src="${item.image}" alt="${flor.name}" class="flor-img">
        <p><strong>$${flor.price}</strong></p>
    `;

    //Abrir modal al hacer click en la imagen
    card.querySelector("img").addEventListener("click", () => {
        openModal(flor, item.image);
    });

    resultsContainer.appendChild(card);
}

//Función para abrir el modal
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

//Cerrar modal si hacen click afuera
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

//Cerrar modal al hacer click en la X
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});