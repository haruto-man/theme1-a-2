document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-button");
    const itemList = document.getElementById("item-list");

    const itemInput = document.getElementById("item-input");
    const pickupplaceInput = document.getElementById("pickupplace-input");
    const dateInput = document.getElementById("date-input");
    const nowplaceInput = document.getElementById("nowplace-input");

    if (
        !addButton ||
        !itemList ||
        !itemInput ||
        !pickupplaceInput ||
        !dateInput ||
        !nowplaceInput
    ) {
        return;
    }

    addButton.addEventListener("click", (e) => {
        e.preventDefault();

        const item = itemInput.value.trim();
        const pickupplace = pickupplaceInput.value.trim();
        const date = dateInput.value.trim();
        const nowplace = nowplaceInput.value.trim();

        const row = document.createElement("li");
        row.textContent = `品目: ${item} / 受取場所: ${pickupplace} / 日付: ${date} / 現在地: ${nowplace}`;

        itemList.appendChild(row);

        itemInput.value = "";
        pickupplaceInput.value = "";
        dateInput.value = "";
        nowplaceInput.value = "";
    });
});