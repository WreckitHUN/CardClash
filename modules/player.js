function createPlayer(name, deck) {
  const _name = name;
  const hand = [];
  const scorePile = [];

  const getName = () => _name;

  const drawCard = () => {
    const drawnCard = deck.drawCard();
    // If there are no cards in the deck or hand is full then return
    if (drawnCard === "No card left" || hand.length >= 5) return;
    // Put card in hand
    hand.push(drawnCard);
    console.log(hand);
  };

  const playCard = (index) => {
    if (index < 0 || index >= hand.length) return;

    return hand.splice(index, 1)[0];
  };

  const updateScorePile = (cards) => {
    scorePile.push(...cards);
  };

  return {
    getName,
    drawCard,
    playCard,
    updateScorePile,
  };
}

export default createPlayer;
