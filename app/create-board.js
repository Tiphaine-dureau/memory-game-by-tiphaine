/**
 * Crée le plateau de jeu (arpès l'avoir vidé) en fonction de la difficulté
 * Le plateau possède autant de lignes que de colonnes
 * Les cartes du plateau sont mélangées au préalable
 */
function createBoardGame() {
    g_loadedCards = g_isEasyMode ? easyBoardCards : hardBoardCards;
    shuffleCards(g_loadedCards);
    $('#game-board').empty();
    createRows();
}

/**
 * Constructions des lignes
 */
function createRows() {
    for (let i = 0; i < getBoardSize(); i++) {
        createRow(i);
    }
}

/**
 * Construction d'une ligne et des colonnes de cette ligne
 * @param {number} i
 */
function createRow(i) {
    const rowId = `row-${i}`;
    const rowElement = `<div class="row" id="${rowId}"></div>`;
    $('#game-board').append(rowElement);
    createCols(i, rowId);
}

/**
 * Construction des colonnes d'une ligne
 * @param {number} i
 * @param {number} rowId
 */
function createCols(i, rowId) {
    for (let j = 0; j < getBoardSize(); j++) {
        createCol(j, i, rowId);
    }
}

/**
 * Construction d'une colonne
 * @param {number} j
 * @param {number} i
 * @param {number} rowId
 */
function createCol(j, i, rowId) {
    const cardIndex = getCardIndex(i, j);
    const colElement = `<div class="col pb-4 memory-card" id="${cardIndex}"></div>`;
    const rowIdSelector = `#${rowId}`;
    $(rowIdSelector).append(colElement);
    addFaces(cardIndex);
    addEventOnCardClick(cardIndex);
}

/**
 * Construction des deux faces d'une carte
 * @param {number} cardIndex
 */
function addFaces(cardIndex) {
    const colIdSelector = `#${cardIndex}`;
    addBackFace(colIdSelector);
    addFrontFace(cardIndex, colIdSelector);
}

/**
 * Construction de la face cachée d'une carte en fonction de la difficulté
 * @param {string} colIdSelector
 */
function addBackFace(colIdSelector) {
    const backFaceSuffix = g_isEasyMode ? 'easy' : 'hard';
    const imgBackFace = `<img src="assets/images/backface-${backFaceSuffix}.svg" alt="dos des images"/>`
    $(colIdSelector).append(imgBackFace);
}

/**
 * Construction de la face révélée d'une carte
 * @param {number} cardIndex
 * @param {string} colIdSelector
 */
function addFrontFace(cardIndex, colIdSelector) {
    const cardImgSrc = `assets/images/${g_loadedCards[cardIndex].name}.svg`;
    const imgFrontFace = `<img src=${cardImgSrc} alt="images du jeu" style="display: none"/>`;
    $(colIdSelector).append(imgFrontFace);
}