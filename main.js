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
    console.log(`${player1.getName()} played ${outcome.cards[0]}`);
    console.log(`${player2.getName()} played ${outcome.cards[1]}`);

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

function suddenDeath(player1, player2) {
  console.log("Sudden Death begins...");

  while (true) {
    const p1Choice = Math.floor(Math.random() * 3); // 0–2
    const p2Choice = Math.floor(Math.random() * 3);

    // Create fake hands for sudden death? No — use classic RPS:
    const cardMap = ["Rock", "Paper", "Scissors"];

    const card1 = cardMap[p1Choice];
    const card2 = cardMap[p2Choice];

    const result = determineWinner(card1, card2);

    if (result === "player1") return player1;
    if (result === "player2") return player2;

    console.log("Sudden death tie — retry");
  }
}
