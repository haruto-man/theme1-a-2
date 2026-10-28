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

    const filterState = {
        item: "",
        pickupplace: "",
        date: "",
        nowplace: ""
    };

    function updateRowNumbers() {
        Array.from(itemList.children).forEach((row, index) => {
            const numberCell = row.children[0];
            if (numberCell) {
                numberCell.textContent = String(index + 1);
            }
        });
    }

    function hideAllPopovers() {
        document.querySelectorAll(".filter-popover").forEach((popover) => {
            popover.classList.remove("is-open");
        });
    }

    function applyFilters() {
        Array.from(itemList.children).forEach((row) => {
            const cells = Array.from(row.children);

            const item = (cells[1]?.textContent || "").trim().toLowerCase();
            const pickupplace = (cells[2]?.textContent || "").trim().toLowerCase();
            const date = (cells[3]?.textContent || "").trim();
            const nowplace = (cells[4]?.textContent || "").trim().toLowerCase();

            const matches =
                (filterState.item === "" || item.includes(filterState.item)) &&
                (filterState.pickupplace === "" || pickupplace.includes(filterState.pickupplace)) &&
                (filterState.date === "" || date === filterState.date) &&
                (filterState.nowplace === "" || nowplace.includes(filterState.nowplace));

            row.style.display = matches ? "" : "none";
        });
    }

    document.querySelectorAll(".filter-button").forEach((button) => {
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

    document.querySelectorAll(".filter-input").forEach((input) => {
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

    document.querySelectorAll(".filter-clear").forEach((button) => {
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

    document.addEventListener("click", (event) => {
        if (
            !event.target.closest(".filter-button") &&
            !event.target.closest(".filter-popover") &&
            !event.target.closest(".filter-input") &&
            !event.target.closest(".filter-clear")
        ) {
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
        const deleteCell = document.createElement("td");

        numberCell.textContent = String(itemList.children.length + 1);

        itemCell.textContent = item;
        pickupplaceCell.textContent = pickupplace;
        dateCell.textContent = date;
        nowplaceCell.textContent = nowplace;

        itemCell.dataset.label = "落し物の名前";
        pickupplaceCell.dataset.label = "拾得場所";
        dateCell.dataset.label = "日付";
        nowplaceCell.dataset.label = "保管場所";
        deleteCell.dataset.label = "削除";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "削除";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => {
            row.remove();
            updateRowNumbers();
            applyFilters();
        });

        deleteCell.appendChild(deleteButton);

        row.appendChild(numberCell);
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

        applyFilters();
    });
});