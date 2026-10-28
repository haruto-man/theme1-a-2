document.addEventListener("DOMContentLoaded", () => {
    const itemForm = document.getElementById("item-form");
    const itemList = document.getElementById("item-list");

    const itemInput = document.getElementById("item-input");
    const pickupplaceInput = document.getElementById("pickupplace-input");
    const dateInput = document.getElementById("date-input");
    const nowplaceInput = document.getElementById("nowplace-input");

    if (
        !itemForm ||
        !itemList ||
        !itemInput ||
        !pickupplaceInput ||
        !dateInput ||
        !nowplaceInput
    ) {
        return;
    }

    itemForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const item = itemInput.value.trim();
        const pickupplace = pickupplaceInput.value.trim();
        const date = dateInput.value.trim();
        const nowplace = nowplaceInput.value.trim();

        if (!item || !pickupplace || !date || !nowplace) {
            alert("全ての項目を入力してください。");
            return;
        }

        const row = document.createElement("tr");

        const itemCell = document.createElement("td");
        const pickupplaceCell = document.createElement("td");
        const dateCell = document.createElement("td");
        const nowplaceCell = document.createElement("td");
        const deleteCell = document.createElement("td");

        itemCell.textContent = item;
        pickupplaceCell.textContent = pickupplace;
        dateCell.textContent = date;
        nowplaceCell.textContent = nowplace;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "削除";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => {
            row.remove();
        });

        deleteCell.appendChild(deleteButton);

        row.appendChild(itemCell);
        row.appendChild(pickupplaceCell);
        row.appendChild(dateCell);
        row.appendChild(nowplaceCell);
        row.appendChild(deleteCell);

        itemList.appendChild(row);

        itemInput.value = "";
        pickupplaceInput.value = "";
        dateInput.value = "";
        nowplaceInput.value = "";
    });
});