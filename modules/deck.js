function createDeck() {
  const numberOfCards = 54;
  // Init deck of Rock Paper Scissors cards
  const deck = Array(numberOfCards / 3)
    .fill(["Rock", "Paper", "Scissors"])
    .flat();

  // shuffle the deck
  const shuffle = () => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  };

  const drawCard = () => {
    const drawnCard = deck.length ? deck.pop() : "No card left";
    return drawnCard;
  };

  shuffle();
  return {
    shuffle,
    drawCard,
  };
}

export default createDeck;
