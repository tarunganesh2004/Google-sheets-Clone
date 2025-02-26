// @ts-nocheck
const rows = 10;
const cols = 10;
const data = JSON.parse(localStorage.getItem("spreadsheetData")) || {}; // Load saved data
let selectedCell = null;

function createSpreadsheet() {
    const spreadsheet = document.getElementById("spreadsheet");
    spreadsheet.innerHTML = "";

    // Create headers (A, B, C, ...)
    spreadsheet.appendChild(document.createElement("div")); // Empty corner cell
    for (let c = 0; c < cols; c++) {
        const header = document.createElement("div");
        header.classList.add("header-cell");
        header.innerText = String.fromCharCode(65 + c);
        spreadsheet.appendChild(header);
    }

    // Create cells with row numbers
    for (let r = 0; r < rows; r++) {
        const rowHeader = document.createElement("div");
        rowHeader.classList.add("header-cell");
        rowHeader.innerText = r + 1;
        spreadsheet.appendChild(rowHeader);

        for (let c = 0; c < cols; c++) {
            const cellId = `${String.fromCharCode(65 + c)}${r + 1}`;
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.contentEditable = true;
            cell.dataset.cell = cellId;

            // Load saved data into the cell
            if (data[cellId]) {
                cell.innerText = data[cellId];
            }

            // Update selected cell when clicked
            cell.addEventListener("focus", () => {
                selectedCell = cell;
                document.getElementById("formula-bar").value = data[cellId] || "";
            });

            // Handle cell input
            cell.addEventListener("input", (e) => updateCell(cellId, e.target.innerText));

            spreadsheet.appendChild(cell);
        }
    }
}

// Update cell value and save data
function updateCell(cellId, value) {
    data[cellId] = value;
    localStorage.setItem("spreadsheetData", JSON.stringify(data)); // Auto-save on change
    if (value.startsWith("=")) {
        executeFormula(cellId, value);
    }
}

// Execute formulas
function executeFormula(cellId, formula) {
    try {
        const expr = formula.substring(1).toUpperCase();
        const result = evalExpression(expr);
        document.querySelector(`[data-cell="${cellId}"]`).innerText = result;
        data[cellId] = result;
        localStorage.setItem("spreadsheetData", JSON.stringify(data)); // Save formula results
    } catch (error) {
        console.error("Formula error:", error);
    }
}

// Evaluate expressions
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
    return eval(expr);
}

// Extract range from formula
function getRange(expression) {
    const match = expression.match(/\((.*?)\)/);
    if (!match) return [];

    const range = match[1].split(":");
    if (range.length !== 2) return [];

    const startCell = range[0];
    const endCell = range[1];

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

// Math functions
const SUM = (range) => range.reduce((acc, val) => acc + val, 0);
const AVERAGE = (range) => SUM(range) / range.length;
const MAX = (range) => Math.max(...range);
const MIN = (range) => Math.min(...range);
const COUNT = (range) => range.filter(val => !isNaN(val)).length;

// Handle formula bar input
document.getElementById("formula-bar").addEventListener("keyup", function (e) {
    if (selectedCell) {
        const cellId = selectedCell.dataset.cell;
        selectedCell.innerText = e.target.value;
        updateCell(cellId, e.target.value);
    }
});

// Save the spreadsheet manually
function saveSheet() {
    localStorage.setItem("spreadsheetData", JSON.stringify(data));
    alert("Spreadsheet saved!");
}

// Load spreadsheet manually (restores data)
function loadSheet() {
    const savedData = JSON.parse(localStorage.getItem("spreadsheetData"));
    if (savedData) {
        Object.assign(data, savedData);
        createSpreadsheet();
        alert("Spreadsheet loaded!");
    }
}

// Clear spreadsheet data
function clearSheet() {
    if (confirm("Are you sure you want to clear the spreadsheet? This cannot be undone.")) {
        localStorage.removeItem("spreadsheetData");
        Object.keys(data).forEach(key => delete data[key]);
        createSpreadsheet();
    }
}

// Initialize the spreadsheet
createSpreadsheet();
