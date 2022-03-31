/**
 * Charge les cartes en fonction du choix du jeu de façon aléatoire
 * Vide le plateau du jeu avant d'en créer un nouveau
 */
function createBoardGame() {
    g_loadedCards = g_isEasyMode ? easyBoardCards : hardBoardCards;
    shuffleCards(g_loadedCards);
    $('#game-board').empty();
    createRows();
}

/**
 * Création de lignes tant qu'on ne dépasse pas la racine carré de la taille du board
 */
function createRows() {
    for (let i = 0; i < getBoardSize(); i++) {
        createRow(i);
    }
}

/**
 * Récupération d'un row id et création dans le dom d'un div avec son id
 * Création de colonnes pour chaque ligne
 * @param i
 */
function createRow(i) {
    const rowId = `row-${i}`;
    const rowElement = `<div class="row" id="${rowId}"></div>`;
    $('#game-board').append(rowElement);
    createCols(i, rowId);
}

/**
 * Pour chaque lignée crée : création d'une colonne tant qu'on ne dépasse pas la racine carré de la taille du board
 * @param i
 * @param rowId
 */
function createCols(i, rowId) {
    for (let j = 0; j < getBoardSize(); j++) {
        createCol(j, i, rowId);
    }
}

/**
 * Création d'un colonne boostrap représentant le dos ou la face des cartes
 * @param j
 * @param i
 * @param rowId
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
 * Création d'un sélecteur jquery comportant l'id des cartes
 * Affiche la carte de dos ou de face et en fonction garde son index
 * @param cardIndex
 */
function addFaces(cardIndex) {
    const colIdSelector = `#${cardIndex}`;
    addBackFace(colIdSelector);
    addFrontFace(cardIndex, colIdSelector);
}

/**
 * Change le dos de la carte en fonction du choix du jeu
 * Ajoute au selecteur jquery l'image représentant le dos des cartes
 * @param colIdSelector
 */
function addBackFace(colIdSelector) {
    const backFaceSuffix = g_isEasyMode ? 'easy' : 'hard';
    const imgBackFace = `<img src="assets/images/time-bomb-${backFaceSuffix}.svg" alt="dos des images"/>`
    $(colIdSelector).append(imgBackFace);
}

/**
 * Ajoute au selecteur jquery l'image de face en masquée
 * @param cardIndex
 * @param colIdSelector
 */
function addFrontFace(cardIndex, colIdSelector) {
    const cardImgSrc = `assets/images/${g_loadedCards[cardIndex].name}.svg`;
    const imgFrontFace = `<img src=${cardImgSrc} alt="images du jeu" style="display: none"/>`;
    $(colIdSelector).append(imgFrontFace);
}