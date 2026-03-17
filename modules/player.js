function createPlayer(name, deck) {
  const _name = name;
  const hand = [];
  const scorePile = [];

  const getName = () => _name;
  const getHand = () => hand;
  const isHandEmpty = () => !hand.length;
  const getScore = () => scorePile.length;

  const drawCard = () => {
    const drawnCard = deck.drawCard();
    // If there are no cards in the deck or hand is full then return
    if (drawnCard === "No card left" || hand.length >= 5) return;
    // Put card in hand
    hand.push(drawnCard);
  };

  const playCard = (index) => {
    if (index < 0 || index >= hand.length) return;
    // Returns the chosen card from hand and shifts hand array
    return hand.splice(index, 1)[0];
  };

  const updateScorePile = (cards) => {
    scorePile.push(...cards);
  };

  return {
    getName,
    getHand,
    getScore,
    isHandEmpty,
    drawCard,
    playCard,
    updateScorePile,
  };
}

export default createPlayer;
