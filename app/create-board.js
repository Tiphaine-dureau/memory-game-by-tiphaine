/**
 * Affiche dynamiquement et aléatoirement les cases du plateau de jeu
 */
function createBoardGame() {
    g_loadedCards = g_isEasyMode ? easyBoardCards : hardBoardCards;
    shuffleCards(g_loadedCards);
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
    const cardIndex = getCardIndex(i, j);
    const colElement = `<div class="col pb-4 memory-card" id="${cardIndex}"></div>`;
    const rowIdSelector = `#${rowId}`;
    $(rowIdSelector).append(colElement);
    addFaces(cardIndex);
    addEventOnCardClick(cardIndex);
}

function addFaces(cardIndex) {
    const colIdSelector = `#${cardIndex}`;
    addFrontFace(cardIndex, colIdSelector);
    addBackFace(colIdSelector);
}

function addBackFace(colIdSelector) {
    const backFaceSuffix = g_isEasyMode ? 'easy' : 'hard';
    const imgBackFace = `<img src="assets/images/time-bomb-${backFaceSuffix}.svg" alt="dos des images"/>`
    $(colIdSelector).append(imgBackFace);
}

function addFrontFace(cardIndex, colIdSelector) {
    const cardImgSrc = `assets/images/${g_loadedCards[cardIndex].name}.svg`;
    const imgFrontFace = `<img src=${cardImgSrc} alt="images du jeu" style="display: none"/>`;
    $(colIdSelector).append(imgFrontFace);
}