// Manage and track whether to show a hover trail
const oCboxHover = document.querySelector("#cbox-hover");
let bHoverTrail = true;

function toggleHover() {
  if (oCboxHover.checked) {
    bHoverTrail = true;
  } else {
    bHoverTrail = false;
  }
}

oCboxHover.addEventListener("click", toggleHover);

// Manage the sketch grid

const CELL_SIZE_PX = 32;
const NUM_CELLS = 16;

const INIT_SIZE = CELL_SIZE_PX*NUM_CELLS;

const oEtchPanel = document.querySelector(".etch-container .max-width-box");

// 2D array planned to contain references to all cells
const aEtchCells = [];

function fillEtchContainer(iNumCells) {
  // Determine the cell size such that the size of the grid is always about the same
  const iCellSizePx = Math.floor(INIT_SIZE/iNumCells);

  const oEtchRow = createEtchRow(iNumCells, iCellSizePx);
  oEtchPanel.appendChild(oEtchRow);
  aEtchCells.push(Array.from(oEtchRow.childNodes));


  for(let i=1; i<iNumCells; ++i) {
    const oNewEtchRow = oEtchRow.cloneNode(true);
    oEtchPanel.appendChild(oNewEtchRow);
    aEtchCells.push(Array.from(oNewEtchRow.childNodes));
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
}

function createEtchRow(iNumCells, iCellSizePx) {
  const oEtchRow = document.createElement("div");
  oEtchRow.style.height = iCellSizePx + 'px';
  oEtchRow.style.flex = "0 " + iCellSizePx + 'px';
  oEtchRow.classList.add("etch-row");

  const oEtchCell = createEtchCell(iCellSizePx);
  oEtchRow.appendChild(oEtchCell);

  for(let i=1; i<iNumCells; ++i) {
    oEtchRow.appendChild(oEtchCell.cloneNode(true));
  }

  return oEtchRow;
}

function createEtchCell(iCellSizePx) {
  const oEtchCell = document.createElement("div");
  oEtchCell.classList.add("etch-cell");
  oEtchCell.style.height = iCellSizePx + 'px';
  oEtchCell.style.width = iCellSizePx + 'px';
  oEtchCell.style.flex = "0 " + iCellSizePx + 'px';
  return oEtchCell;
}

fillEtchContainer(NUM_CELLS);

// Set up mouse operations for each cell

bMouseButtonIsPressed = false;
bTargetActiveState = true;

function mouseEnterCell(e) {
  const oEtchCell = e.target;
  oEtchCell.classList.add("hover");
  if (bHoverTrail)
    oEtchCell.classList.add("traced");

  if(bMouseButtonIsPressed) {
    if(bTargetActiveState) {
      oEtchCell.classList.add("active");
    } else {
      oEtchCell.classList.remove("active");
    }
  }
}

function mouseLeaveCell(e) {
  const oEtchCell = e.target;
  oEtchCell.classList.remove("hover");
}

function mouseClickCell(e) {
  const oEtchCell = e.target;
  oEtchCell.classList.toggle("active");

  // Store the active state so we can apply it to any cells we drag into
  if(Array.from(oEtchCell.classList).includes("active")) {
    bTargetActiveState = true;
  } else {
    bTargetActiveState = false;
  }

  bMouseButtonIsPressed = true;
}

function mouseDown(e) {
  bMouseButtonIsPressed = true;
}

function mouseUp(e) {
  bMouseButtonIsPressed = false;
}

window.addEventListener("mousedown", mouseDown);
window.addEventListener("mouseup", mouseUp);

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
  oEtchCell.classList.remove("hover");
  oEtchCell.classList.remove("traced");
  oEtchCell.classList.remove("active");
}

document.querySelector("button.reset").addEventListener("click", resetEtchContainer);

// Hook up the resize button to a resize operation
function resizeEtchContainer() {
  iNewNumCells = parseInt(prompt("How many cells (per axis) would you like?"));

  // Check for validity, else output an error to the console
  if(!(iNewNumCells>0 && iNewNumCells<=100)) {
    console.error("Invalid number of cells - must be between 1 and 100.")
    return;
  }

  // Delete the existing canvas
  for (const child of Array.from(oEtchPanel.children)) {
    for (const grandchild of Array.from(child.children)) {
      grandchild.remove();
    }
    child.remove();
  }

  aEtchCells.length = 0;

  // Create a new canvas
  fillEtchContainer(iNewNumCells);

}

document.querySelector("button.resize").addEventListener("click", resizeEtchContainer);