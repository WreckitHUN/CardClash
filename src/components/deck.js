function createDeck() {
  const DECK_SIZE = 6;
  let suits = ["rock", "paper", "scissors"];
  const deck = [];

  if (DECK_SIZE % 3 !== 0) {
    console.log("Deck size is not divisible by 3");
    return;
  }

  const numberOfSuit = DECK_SIZE / 3;

  // Create a deck containing numberOfSuit Rocks, Papers, Scissors cards
  [...Array(numberOfSuit)].forEach(() => {
    suits.forEach((suit) => deck.push(suit));
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

  const createNewDeck = (wonCards) => {
    if (deck.length !== 0) return;
    wonCards.forEach((card) => deck.push(card));
  };

  const clearDeck = () => {
    deck.length = 0;
  };

  const getDeck = () => deck;

  return {
    deck,
    getDeck,
    drawCards,
    createNewDeck,
    clearDeck,
  };
}

export default createDeck;
