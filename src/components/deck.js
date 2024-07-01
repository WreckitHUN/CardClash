function createDeck() {
  const DECK_SIZE = 30;
  let suits = ["rock", "paper", "scissors"];
  const deck = [];

  if (DECK_SIZE % 3 !== 0) {
    console.log("Deck size is not divisible by 3");
    return;
  }

  const numberOfType = DECK_SIZE / 3;

  // Create a deck containing numberOfType Rocks, Papers, Scissors cards
  [...Array(numberOfType)].forEach(() => {
    suits.forEach((type) => deck.push(type));
  });

  // Shuffle the deck
  shuffleDeck();
  function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * deck.length);
      [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }
  }

  // Function for drawing cards, after each draw the cards are deleted from the deck
  // If the draw number is more than the remaining cards than the remaining cards will be drawn
  const drawCards = (number) => {
    if (number > deck.length) number = deck.length;
    return deck.splice(0, number);
  };

  return {
    deck,
    drawCards,
  };
}

export default createDeck;
