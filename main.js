import createDeck from "./modules/deck.js";
import createPlayer from "./modules/player.js";
import playRound from "./modules/round.js";

createGame();

function createGame() {
  const deck = createDeck();
  const player1 = createPlayer("Player1", deck);
  const player2 = createPlayer("Player2", deck);

  let withheldPile = [];
  let gameOver = false;

  // Init: each player draws 5 cards
  console.log("INIT");

  for (let i = 0; i < 5; i++) {
    player1.drawCard();
    player2.drawCard();
  }

  console.log(player1.getName(), player1.getHand());
  console.log(player2.getName(), player2.getHand());

  const testBtn = document.getElementById("test");
  testBtn.addEventListener("click", (e) => {
    // Play one round
    // This will be triggered when player puts their card on table
    const selectedCard1 = randomSelectCard(player1);
    const selectedCard2 = randomSelectCard(player2);

    let outcome = playRound(player1, selectedCard1, player2, selectedCard2);
    console.log(
      `${player1.getName()} played ${outcome.cards[0]}, ${selectedCard1}`,
    );
    console.log(
      `${player2.getName()} played ${outcome.cards[1]}, ${selectedCard2}`,
    );

    // See the outcome
    //Either someone Wins or it is a Tie
    //TIE
    if (outcome.isTie) {
      console.log("TIE");
      //Played cards are witheld
      withheldPile.push(...outcome.cards);
      console.log(`Witheld Cards: ${withheldPile}`);
    }
    //WIN
    else {
      console.log(`${outcome.winner.getName()} wins the round`);
      //Put cards in the winner's score pile
      outcome.winner.updateScorePile(withheldPile);
      // Empty the witheldPile
      withheldPile = [];
      outcome.winner.updateScorePile(outcome.cards);

      console.log(`Player1's Score is: ${player1.getScore()}`);
      console.log(`Player2's Score is: ${player2.getScore()}`);
    }

    // After playing, both players draw if possible
    player1.drawCard();
    player2.drawCard();

    console.log("After round:");
    console.log(player1.getName(), player1.getHand());
    console.log(player2.getName(), player2.getHand());
    console.log(deck.getDeck());

    // Check hands
    // No Cards left
    if (player1.isHandEmpty() && player2.isHandEmpty()) {
      // If the previous round was TIE -> SUDDEN DEATH
      if (outcome.isTie) {
        console.log("SUDDEN DEATH to settle the round");
      }

      // Get the scores
      let score1 = player1.getScore();
      let score2 = player2.getScore();
      if (score1 > score2) {
        // Player1 WON
        console.log(`${player1.getName()} Won the game`);
        console.log(`${score1}:${score2}`);
      } else if (score2 > score1) {
        // Player2 WON
        console.log(`${player2.getName()} Won the game`);
      } else {
        // TIE
        console.log("SUDDEN DEATH to settle the game");
      }
    }
  });
}

function randomSelectCard(player) {
  return Math.floor(Math.random() * player.getHand().length);
}

function checkHands() {
  const p1Empty = player1.isHandEmpty();
  const p2Empty = player2.isHandEmpty();

  if (p1Empty && p2Empty) return "sudden-death";
  if (p1Empty) return "player2-wins";
  if (p2Empty) return "player1-wins";

  return "continue";
}

function suddenDeath(p1, p2) {
  console.log("Sudden Death begins...");
  // Create fake hands for sudden death?
  p1.suddenDeathHand();
  p2.suddenDeathHand();
}
