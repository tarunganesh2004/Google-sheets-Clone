// @ts-nocheck
const rows = 10;
const cols = 10;
const data = {};
let selectedCell = null;

function createSpreadsheet() {
    const spreadsheet = document.getElementById("spreadsheet");
    spreadsheet.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cellId = `${String.fromCharCode(65 + c)}${r + 1}`;
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.contentEditable = true;
            cell.dataset.cell = cellId;

            cell.addEventListener("click", () => {
                selectedCell = cell; // Track the selected cell
                document.getElementById("formulaBar").value = data[cellId] || "";
            });

            cell.addEventListener("input", (e) => updateCell(cellId, e.target.innerText));

            spreadsheet.appendChild(cell);
        }
    }
}


function updateCell(cellId, value) {
    data[cellId] = value;
    if (value.startsWith("=")) {
        executeFormula(cellId, value);
    }
}

function executeFormula(cellId, formula) {
    try {
        const expr = formula.substring(1).toUpperCase();
        const result = evalExpression(expr);

        // Ensure result is a valid number before updating the cell
        if (!isNaN(result) && result !== undefined) {
            document.querySelector(`[data-cell="${cellId}"]`).innerText = result;
            data[cellId] = result;
        } else {
            document.querySelector(`[data-cell="${cellId}"]`).innerText = "0";
            data[cellId] = "Error";
        }
    } catch (error) {
        console.error("Formula error:", error);
        document.querySelector(`[data-cell="${cellId}"]`).innerText = "0";
    }
}


function evalExpression(expr) {
    if (expr.includes("SUM")) {
        return SUM(getRange(expr));
    } else if (expr.includes("AVERAGE")) {
        return AVERAGE(getRange(expr));
    } else if (expr.includes("MAX")) {
        return MAX(getRange(expr));
    } else if (expr.includes("MIN")) {
        return MIN(getRange(expr));
    } else if (expr.includes("COUNT")) {
        return COUNT(getRange(expr));
    }
    return eval(expr); // Handles basic calculations like =5+5
}

function getRange(expression) {
    const match = expression.match(/\((.*?)\)/);
    if (!match) return [];

    const range = match[1];

    // Handle comma-separated values (e.g., MAX(A1, B2))
    if (range.includes(",")) {
        return range.split(",").map(cellId => parseFloat(data[cellId.trim()]) || 0);
    }

    // Handle range (e.g., SUM(A1:A3))
    const parts = range.split(":");
    if (parts.length === 2) {
        const [startCell, endCell] = parts;
        const startCol = startCell.charCodeAt(0) - 65;
        const startRow = parseInt(startCell.slice(1)) - 1;
        const endCol = endCell.charCodeAt(0) - 65;
        const endRow = parseInt(endCell.slice(1)) - 1;

        let values = [];
        for (let r = startRow; r <= endRow; r++) {
            for (let c = startCol; c <= endCol; c++) {
                const cellId = `${String.fromCharCode(65 + c)}${r + 1}`;
                values.push(parseFloat(data[cellId]) || 0);
            }
        }
        return values;
    }

    return [];
}


// Mathematical functions
const SUM = (range) => range.reduce((acc, val) => acc + val, 0);
const AVERAGE = (range) => SUM(range) / range.length;
const MAX = (range) => Math.max(...range);
const MIN = (range) => Math.min(...range);
const COUNT = (range) => range.filter(val => !isNaN(val)).length;

// Formatting functions
function formatText(style) {
    if (selectedCell) {
        if (style === "bold") {
            selectedCell.style.fontWeight = selectedCell.style.fontWeight === "bold" ? "normal" : "bold";
        } else if (style === "italic") {
            selectedCell.style.fontStyle = selectedCell.style.fontStyle === "italic" ? "normal" : "italic";
        }
    }
}


document.addEventListener("click", function (event) {
    if (event.target.classList.contains("cell")) {
        selectedCell = event.target;
    }
});

function changeTextColor(color) {
    if (selectedCell) {
        selectedCell.style.color = color;
    }
}

function changeFontSize(size) {
    if (selectedCell) {
        selectedCell.style.fontSize = size + "px";
    }
}

// **🛠 Formula Bar Fix**
document.getElementById("formulaBar").addEventListener("keypress", (e) => {
    if (e.key === "Enter" && selectedCell) {
        const newValue = e.target.value;
        selectedCell.innerText = newValue;
        updateCell(selectedCell.dataset.cell, newValue);
    }
});


// Save and Load
function saveSheet() {
    localStorage.setItem("spreadsheetData", JSON.stringify(data));
    alert("Spreadsheet saved!");
}

function loadSheet() {
    const savedData = JSON.parse(localStorage.getItem("spreadsheetData"));
    if (savedData) {
        Object.keys(savedData).forEach(cellId => {
            const cell = document.querySelector(`[data-cell="${cellId}"]`);
            if (cell) {
                cell.innerText = savedData[cellId];
            }
        });
    }
}

createSpreadsheet();
