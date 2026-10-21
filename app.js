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

        if (!item) {
            return;
        }

        const row = document.createElement("li");
        row.className = "item-form";

        const fields = [
            { className: "item-input", label: "品目", value: item },
            {
                className: "pickupplace-input",
                label: "受取場所",
                value: pickupplace || "-",
            },
            { className: "date-input", label: "日付", value: date || "-" },
            {
                className: "nowplace-input",
                label: "現在地",
                value: nowplace || "-",
            },
        ];

        fields.forEach(({ className, label, value }) => {
            const field = document.createElement("div");
            field.className = className;
            field.textContent = `${label}: ${value}`;
            row.appendChild(field);
        });

        itemList.appendChild(row);

        itemInput.value = "";
        pickupplaceInput.value = "";
        dateInput.value = "";
        nowplaceInput.value = "";
    });
});