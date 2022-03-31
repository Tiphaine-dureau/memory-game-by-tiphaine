/**
 * Affiche dynamiquement et aléatoirement les cases du plateau de jeu
 */
function createBoardGame() {
    loadedCards = isEasyMode ? easyBoardCards : hardBoardCards;
    shuffleCards(loadedCards);
    $('#game-board').empty();
    createRows();
}

function createRows() {
    for (let i = 0; i < getBoardSize(); i++) {
        createRow(i);
    }
}

function createRow(i) {
    const rowId = `row-${i}`;
    const rowElement = `<div class="row" id="${rowId}"></div>`;
    $('#game-board').append(rowElement);
    createCols(i, rowId);
}

function createCols(i, rowId) {
    for (let j = 0; j < getBoardSize(); j++) {
        createCol(j, i, rowId);
    }
}

function createCol(j, i, rowId) {
    const colId = `col-${i}-${j}`;
    const colElement = `<div class="col pb-4 memory-card" id="${colId}"></div>`;
    const rowIdSelector = `#${rowId}`;
    $(rowIdSelector).append(colElement);
    const colIdSelector = `#${colId}`;
    const currentCardId = getCardId(i, j);
    const cardImgSrc = `assets/images/${loadedCards[currentCardId].name}.svg`;
    const backFaceSuffix = isEasyMode ? 'easy' : 'hard';
    const imgBackFace = `<img src="assets/images/time-bomb-${backFaceSuffix}.svg" alt="dos des images"/>`
    const imgFrontFace = `<img src=${cardImgSrc} alt="images du jeu" style="display: none"/>`;
    $(colIdSelector).append(imgBackFace);
    $(colIdSelector).append(imgFrontFace);
    addEventOnImageClick(colIdSelector);
}