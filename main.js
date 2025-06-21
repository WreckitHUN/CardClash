import createDeck from "./modules/deck.js";
import createPlayer from "./modules/player.js";

const game = createGame();

function createGame() {
  const deck = createDeck();
  console.log(deck.getDeck());
  const player1 = createPlayer("Human", deck);
  const player2 = createPlayer("Robot", deck);
  // Init
  // Each player draws 5 cards
  for (let i = 0; i < 5; i++) {
    player1.drawCard();
    player2.drawCard();
  }
  // For testing
  console.log(player1.getHand());
  console.log(player2.getHand());
  console.log(deck.getDeck());
}
