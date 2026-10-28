document.addEventListener("DOMContentLoaded", () => {
    const itemForm = document.getElementById("item-form");
    const addButton = document.getElementById("add-button");
    const itemList = document.getElementById("item-list");
    const filterButtons = document.querySelectorAll(".filter-button");
    const filterInputs = document.querySelectorAll(".filter-input");
    const filterClears = document.querySelectorAll(".filter-clear");

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
        !nowplaceInput ||
        filterButtons.length === 0
    ) {
        return;
    }

    const filterState = {
        item: "",
        pickupplace: "",
        date: "",
        nowplace: ""
    };

    const hideAllPopovers = () => {
        document.querySelectorAll(".filter-popover").forEach((popover) => {
            popover.classList.remove("is-open");
        });
    };

    const applyFilters = () => {
        Array.from(itemList.children).forEach((row) => {
            const item = (row.children[1]?.textContent || "").trim().toLowerCase();
            const pickupplace = (row.children[2]?.textContent || "").trim().toLowerCase();
            const date = (row.children[3]?.textContent || "").trim();
            const nowplace = (row.children[4]?.textContent || "").trim().toLowerCase();

            const matches =
                (filterState.item === "" || item.includes(filterState.item)) &&
                (filterState.pickupplace === "" || pickupplace.includes(filterState.pickupplace)) &&
                (filterState.date === "" || date === filterState.date) &&
                (filterState.nowplace === "" || nowplace.includes(filterState.nowplace));

            row.style.display = matches ? "" : "none";
        });
    };

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.dataset.target;
            const popover = document.querySelector(`.filter-popover[data-column="${target}"]`);

            if (!popover) return;

            const isOpen = popover.classList.contains("is-open");
            hideAllPopovers();

            if (!isOpen) {
                popover.classList.add("is-open");
            }
        });
    });

    filterInputs.forEach((input) => {
        input.addEventListener("input", () => {
            const column = input.dataset.column;
            const value = input.value.trim();

            if (column === "date") {
                filterState.date = value;
            } else {
                filterState[column] = value.toLowerCase();
            }

            applyFilters();
        });
    });

    filterClears.forEach((button) => {
        button.addEventListener("click", () => {
            const column = button.dataset.column;
            const input = document.querySelector(`.filter-input[data-column="${column}"]`);

            if (input) {
                input.value = "";
            }

            filterState[column] = "";
            applyFilters();
            hideAllPopovers();
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".filter-button") && !e.target.closest(".filter-popover")) {
            hideAllPopovers();
        }
    });

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

        applyFilters();
    });
});