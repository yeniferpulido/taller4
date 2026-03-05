import { getItems, createItem, updateItem, deleteItem } from "./services/api.js";
import { renderItems } from "./ui/ui.js";

const form = document.getElementById("itemForm");
const tableBody = document.getElementById("itemsTable");

//FUNCION PARA VALIDAR CAMPOS
function validateData(data) {
    if (!data.name || !data.description || !data.image || !data.color || !data.size || !data.origin) {
        alert("Todos los campos deben estar llenos.");
        return false;
    }
    if (data.price <= 0) {
        alert("El precio no puede ser 0 o negativo.");
        return false;
    }
    if (data.stock < 0) {
        alert("El stock no puede ser negativo.");
        return false;
    }
    if (!["pequeña", "mediana", "grande"].includes(data.size)) {
        alert("El tamaño debe ser Pequeña, Mediana o Grande.");
        return false;
    }
    return true;
}

//EDITAR Y ELIMINAR DIRECTO EN TABLA
tableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const row = btn.closest("tr");

    if (btn.classList.contains("btn-delete")) {
        await deleteItem(id);
        loadItems();
        return;
    }

    //EDITAR
    if (btn.classList.contains("btn-edit")) {

        if (btn.textContent === "Guardar") {
            const inputs = row.querySelectorAll("input, select");
            const updatedData = {
                name: inputs[0].value.trim(),
                description: inputs[1].value.trim(),
                image: inputs[2].value.trim(),
                color: inputs[3].value.trim(),
                price: Number(inputs[4].value),
                size: inputs[5].value,
                origin: inputs[6].value.trim(),
                stock: Number(inputs[7].value)
            };

            if (!validateData(updatedData)) return;

            await updateItem(id, updatedData);
            loadItems();
            return;
        }

        const cells = row.querySelectorAll("td");

        for (let i = 1; i <= 8; i++) {
            let value;

            if (i === 6) { //Tamaño
                const currentSize = cells[i].textContent;
                cells[i].innerHTML = `
                    <select>
                        <option value="pequeña" ${currentSize==="pequeña"?"selected":""}>Pequeña</option>
                        <option value="mediana" ${currentSize==="mediana"?"selected":""}>Mediana</option>
                        <option value="grande" ${currentSize==="grande"?"selected":""}>Grande</option>
                    </select>
                `;
            } else if (i === 3) { //Imagen
                const img = cells[i].querySelector("img");
                value = img ? img.src : "";
                cells[i].innerHTML = `<input value="${value}">`;
            } else {
                value = cells[i].textContent;
                cells[i].innerHTML = `<input value="${value}">`;
            }
        }

        btn.textContent = "Guardar";
    }
});

//CREAR NUEVO ITEM
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: form.querySelector("#name").value.trim(),
        description: form.querySelector("#description").value.trim(),
        image: form.querySelector("#image").value.trim(),
        color: form.querySelector("#color").value.trim(),
        price: Number(form.querySelector("#price").value),
        size: form.querySelector("#size").value,
        origin: form.querySelector("#origin").value.trim(),
        stock: Number(form.querySelector("#stock").value)
    };

    if (!validateData(data)) return;

    await createItem(data);
    form.reset();
    loadItems();
});

// CARGAR ITEMS
async function loadItems() {
    const items = await getItems();
    renderItems(items, tableBody);
}

loadItems();