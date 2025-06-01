import createDeck from "./modules/deck.js";
import createPlayer from "./modules/player.js";
const deck = createDeck();
const player1 = createPlayer("Human", deck);

player1.drawCard();
player1.drawCard();
player1.drawCard();
player1.drawCard();
player1.drawCard();

player1.playCard(0);
player1.drawCard();
console.log();
