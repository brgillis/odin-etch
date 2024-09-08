const CELL_SIZE_PX = 32;
const NUM_CELLS_X = 16;
const NUM_CELLS_Y = 16;

// 2D array planned to contain references to all cells
const aEtchCells = [];

function fillEtchContainer() {
  const oEtchPanel = document.querySelector(".etch-container .max-width-box");

  const oEtchRow = createEtchRow();
  oEtchPanel.appendChild(oEtchRow);
  aEtchCells.push(Array.from(oEtchRow.childNodes));


  for(let i=1; i<NUM_CELLS_Y; ++i) {
    const oNewEtchRow = oEtchRow.cloneNode(true);
    oEtchPanel.appendChild(oNewEtchRow);
    aEtchCells.push(Array.from(oNewEtchRow.childNodes));
  }
}

function createEtchRow() {
  const oEtchRow = document.createElement("div");
  oEtchRow.classList.add("etch-row");

  const oEtchCell = createEtchCell();
  oEtchRow.appendChild(oEtchCell);

  for(let i=1; i<NUM_CELLS_X; ++i) {
    oEtchRow.appendChild(oEtchCell.cloneNode(true));
  }

  return oEtchRow;
}

function createEtchCell() {
  const oEtchCell = document.createElement("div");
  oEtchCell.classList.add("etch-cell");
  return oEtchCell;
}

fillEtchContainer();

// Hook up mouse operations to each cell
function mouseEnterCell(e) {
  const oEtchCell = e.target;
  oEtchCell.classList.add("hover");
  oEtchCell.classList.add("traced");
}

function mouseLeaveCell(e) {
  const oEtchCell = e.target;
  oEtchCell.classList.remove("hover");
}

function mouseClickCell(e) {
  const oEtchCell = e.target;
  oEtchCell.classList.toggle("active");
}

for (let i=0; i<aEtchCells.length; ++i) {

  const aEtchRow = aEtchCells[i];

  for (let j=0; j<aEtchRow.length; ++j) {
    const oEtchCell = aEtchRow[j];
    oEtchCell.addEventListener("mouseover", mouseEnterCell);
    oEtchCell.addEventListener("mouseout", mouseLeaveCell);
    oEtchCell.addEventListener("mousedown", mouseClickCell);
  }

}

// Hook up the reset button to a reset operation
function resetEtchContainer() {

  for (let i=0; i<aEtchCells.length; ++i) {

    const aEtchRow = aEtchCells[i];

    for (let j=0; j<aEtchRow.length; ++j) {
      const oEtchCell = aEtchRow[j];
      resetEtchCell(oEtchCell);
    }

  }

}

function resetEtchCell(oEtchCell) {
  // TODO
}

document.querySelector("button.reset").addEventListener("click", resetEtchContainer);