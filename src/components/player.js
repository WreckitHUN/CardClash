import createDeck from "./deck";

function createPlayer(name) {
  const deck = createDeck();
  const HAND_SIZE = 5;
  let hand = [];
  let wonCardCount = 0;
  // Initialize player's hand
  drawCards();

  // This drawCards function will always try to make the hand contain 5 cards
  function drawCards() {
    // Calculate how many cards to draw
    const number = HAND_SIZE - hand.length;
    // Check if hand is full
    if (number === 0) {
      return "Full";
    }
    // Draw the calculated cards
    const drawnCards = deck.drawCards(number);
    // Check if deck is empty
    if (drawnCards.length === 0) {
      return "Empty";
    }
    // Add the drawn cards to the hand
    drawnCards.forEach((card) => {
      hand.push(card);
    });
    return "Drawn";
  }

  function playCard(index) {
    if (hand.length === 0) throw "hand is empty";
    // Validate index
    if (index >= hand.length || index < 0) throw "index is out of bound";
    const playedCard = hand.splice(index, 1);
    return playedCard;
  }

  const addWonCardCount = (addValue) => (wonCardCount += addValue);
  const getWonCardCount = () => wonCardCount;
  const getHand = () => hand;

  return {
    name,
    playCard,
    drawCards,
    getHand,
    addWonCardCount,
    getWonCardCount,
  };
}

export default createPlayer;
