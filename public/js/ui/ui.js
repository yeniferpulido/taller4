export function renderItems(items, tableBody) {
    tableBody.innerHTML = "";

    items.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.description || ""}</td>
            <td><img src="${item.image}" alt="${item.name}" width="80"></td>
            <td>${item.color}</td>
            <td>${item.price}</td>
            <td>${item.size}</td>
            <td>${item.origin}</td>
            <td>${item.stock}</td>
            <td>
                <button class="btn-edit" data-id="${item.id}">Editar</button>
                <button class="btn-delete" data-id="${item.id}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

export function resetForm(form, submitBtn) {
    form.reset();
    if (submitBtn) submitBtn.textContent = "Agregar";
}

export function fillForm(form, item, submitBtn) {
    form.querySelector("#name").value = item.name;
    form.querySelector("#description").value = item.description || "";
    form.querySelector("#image").value = item.image || "";
    form.querySelector("#color").value = item.color || "";
    form.querySelector("#price").value = item.price || "";
    form.querySelector("#size").value = item.size || "";
    form.querySelector("#origin").value = item.origin || "";
    form.querySelector("#stock").value = item.stock || "";

    if (submitBtn) submitBtn.textContent = "Guardar cambios";
}