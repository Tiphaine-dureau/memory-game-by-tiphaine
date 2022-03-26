/**
 * Affiche dynamiquement et aléatoirement les cases du plateau de jeu
 */
function createBoardGame() {
    shuffleCards(easyBoardCards);
    const boardSize = Math.sqrt(easyBoardCards.length);
    createRows(boardSize);
}

function createRows(boardSize) {
    for (let i = 0; i < boardSize; i++) {
        createRow(boardSize, i);
    }
}

function createRow(boardSize, i) {
    const rowId = `row-${i}`;
    const rowElement = `<div class="row" id="${rowId}"></div>`;
    $('#game-board').append(rowElement);
    createCols(boardSize, i, rowId);
}

function createCols(boardSize, i, rowId) {
    for (let j = 0; j < boardSize; j++) {
        createCol(j, i, rowId, boardSize);
    }
}

function createCol(j, i, rowId, boardSize) {
    const colId = `col-${i}-${j}`;
    const colElement = `<div class="col" id="${colId}"></div>`;
    const rowIdSelector = `#${rowId}`;
    $(rowIdSelector).append(colElement);
    const colIdSelector = `#${colId}`;
    const currentCardId = (i * boardSize) + j;
    const cardImgSrc = easyBoardCards[currentCardId].img;
    const imgFrontFace = `<img src=${cardImgSrc} alt="images du jeu" style="display: none"/>`;
    const imgBackFace = `<img src="assets/images/time-bomb.svg" alt="dos des images"/>`
    $(colIdSelector).append(imgBackFace);
    $(colIdSelector).append(imgFrontFace);
    addEventOnImageClick(colIdSelector);
}

/**
 * Mélange les cartes en utilisant l'algo de Durstenfeld
 * @param cards
 */
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function addEventOnImageClick(colIdSelector) {
    $(colIdSelector).click(() => {
        onImageClick(colIdSelector);
    });
}