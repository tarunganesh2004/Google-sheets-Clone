# 📊 Responsive Spreadsheet Web Application

A simple, **Google Sheets-like** web application built with **HTML, CSS, and Vanilla JavaScript** that allows users to enter data, apply formulas, format text, and save/load data.

---

## 🚀 Features

✅ **Spreadsheet UI** – Fully responsive, displays rows & columns with headers (A, B, C... & 1, 2, 3...)  
✅ **Formula Support** – Supports functions like `=SUM(A1:A3)`, `=AVERAGE(A1:A3)`, `=MAX(A1:A3)`, etc.  
✅ **Auto-Save & Load** – Saves data to `localStorage` and restores on refresh  
✅ **Text Formatting** – Bold, Italic, Text Color, Font Size  
✅ **Responsive Design** – Works on **desktop, tablets, and mobile**  
✅ **Clear Sheet Option** – Reset spreadsheet when needed  

---
## 📜 How to Use

### 1️⃣ Open the Application
Simply **open `index.html`** in a web browser.

### 2️⃣ Enter Data
Click any cell and start typing.

### 3️⃣ Use Formulas
- Example: `=SUM(A1:A3)` → Adds values from A1 to A3  
- Other supported functions: `AVERAGE, MAX, MIN, COUNT`

### 4️⃣ Format Text
- Click on a **cell**, then use the toolbar:  
  - **Bold** 🅱  
  - **Italic** *I*  
  - **Change Font Size**  
  - **Change Text Color** 🎨  

### 5️⃣ Save & Load Data
- Click **"Save"** to store your spreadsheet.  
- Click **"Load"** to restore your saved data.  
- Click **"Clear"** to reset the spreadsheet.  

---

## 🛠 Technologies Used

- **HTML** – Structure of the web page  
- **CSS** – Styling and responsiveness  
- **JavaScript (Vanilla JS)** – Handles formulas, data storage, and UI interactions  

---

## 📌 Features in Detail

### 📊 Spreadsheet UI
- 10×10 grid with headers (A, B, C... | 1, 2, 3...)  
- Click on a cell to edit its content.  

### 🧮 Formulas & Calculations

| Formula  | Description  | Example |
|----------|-------------|---------|
| `=SUM(A1:A3)`  | Adds values in A1, A2, A3 | `=SUM(A1:A3)` → `15` |
| `=AVERAGE(A1:A3)`  | Finds average | `=AVERAGE(A1:A3)` → `5` |
| `=MAX(A1:A3)`  | Returns max value | `=MAX(A1:A3)` → `10` |
| `=MIN(A1:A3)`  | Returns min value | `=MIN(A1:A3)` → `2` |
| `=COUNT(A1:A3)`  | Counts numeric values | `=COUNT(A1:A3)` → `3` |

### 🎨 Formatting Options

- **Bold & Italic**: Style text in any cell.  
- **Font Size**: Adjust text size for readability.  
- **Text Color**: Change the text color with a color picker.  

### 💾 Save & Load

- **Auto-Saves Data** in `localStorage` after every edit.  
- **"Save" button** stores data manually.  
- **"Load" button** restores previous data.  
- **"Clear" button** resets the entire spreadsheet.  

---

## 🎯 Future Improvements

✅ Export & Import CSV  
✅ More advanced formulas (`IF`, `VLOOKUP`)  
✅ Multi-sheet support  

---



## 💡 Troubleshooting

| Issue  | Solution  |
|--------|----------|
| Formula not updating?  | Ensure the cell contains valid numbers. |
| Data lost after refresh?  | Click **Load** to restore. |
| Spreadsheet not saving?  | Check browser **localStorage permissions**. |

---


## 🎯 Final Notes

This is a lightweight, **fully responsive web-based spreadsheet** with **text formatting, formula calculations, and data persistence** using JavaScript. 🚀🎉  

