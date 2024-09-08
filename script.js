const CELL_SIZE_PX = 32;
const NUM_CELLS_X = 16;
const NUM_CELLS_Y = 16;

function fillEtchContainer() {
  const oEtchPanel = document.querySelector(".etch-container .max-width-box");

  let oEtchRow = createEtchRow();
  oEtchPanel.appendChild(oEtchRow);

  for(let i=1; i<NUM_CELLS_Y; ++i) {
    oEtchPanel.appendChild(oEtchRow.cloneNode(true));
  }
}

function createEtchRow() {
  const oEtchRow = document.createElement("div");
  oEtchRow.classList.add("etch-row");

  let oEtchCell = createEtchCell();
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