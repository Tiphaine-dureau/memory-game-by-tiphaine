function getCardId(i, j) {
    return (i * getBoardSize()) + j;
}

function getCardIdFromSelector(selector) {
    const fragments = selector.split('-'); // transforme "#col-0-1" ==> ["#col", "0", "1"]
    return getCardId(+fragments[1], +fragments[2]);
}

function getBoardSize() {
    return Math.sqrt(loadedCards.length);
}

function getBackFaceSelector(colIdSelector) {
    return `${colIdSelector} img:first-child`;
}

function getFrontFaceSelector(colIdSelector) {
    return `${colIdSelector} img:nth-child(2)`;
}