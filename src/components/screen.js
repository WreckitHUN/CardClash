import gameController from "./game";

function screenHandler() {
  const game = gameController();
  const player1 = game.player1;
  const player2 = game.player2;

  // Draw the cards
  //let hand1 = player1.getHand();
  //let hand2 = player1.getHand();

  let gameOver = false;

  while (!gameOver) {
    let hand = player1.getHand();
    let hand1 = player2.getHand();

    console.log(`Player1's hand: ${hand}`);
    console.log(`Player2's hand: ${hand1}`);

    console.log(game.playCard(0));

    console.log(`Player1 chose: ${game.getPlayerCard()}`);
    console.log(`Player2 chose: ${game.getComputerCard()}`);

    console.log(`Player1 score: ${player1.getWonCards()}`);
    console.log(`Player2 score: ${player2.getWonCards()}`);

    gameOver = game.isGameOver();
  }
}

export default screenHandler;
