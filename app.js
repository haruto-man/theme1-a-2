document.addEventListener("DOMContentLoaded", () => {
    const itemForm = document.getElementById("item-form");
    const addButton = document.getElementById("add-button");
    const itemList = document.getElementById("item-list");

    const itemInput = document.getElementById("item-input");
    const pickupplaceInput = document.getElementById("pickupplace-input");
    const dateInput = document.getElementById("date-input");
    const nowplaceInput = document.getElementById("nowplace-input");

    if (
        !itemForm ||
        !addButton ||
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
        const numberCell = document.createElement("td");
        const itemCell = document.createElement("td");
        const pickupplaceCell = document.createElement("td");
        const dateCell = document.createElement("td");
        const nowplaceCell = document.createElement("td");

        numberCell.dataset.label = "番号";
        itemCell.dataset.label = "落し物の名前";
        pickupplaceCell.dataset.label = "拾得場所";
        dateCell.dataset.label = "日付";
        nowplaceCell.dataset.label = "保管場所";

        numberCell.textContent = String(itemList.children.length + 1);
        itemCell.textContent = item;
        pickupplaceCell.textContent = pickupplace;
        dateCell.textContent = date;
        nowplaceCell.textContent = nowplace;

        row.appendChild(numberCell);
        row.appendChild(itemCell);
        row.appendChild(pickupplaceCell);
        row.appendChild(dateCell);
        row.appendChild(nowplaceCell);

        itemList.appendChild(row);

        itemInput.value = "";
        pickupplaceInput.value = "";
        dateInput.value = "";
        nowplaceInput.value = "";
    });
});