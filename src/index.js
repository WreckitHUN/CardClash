import gameController from "./components/game";

const game = gameController();
const player1 = game.player1;
const player2 = game.player2;

for (let i = 0; i < 18; i++) {
  let hand = player1.getHand();
  let hand1 = player2.getHand();

  console.log(hand);
  console.log(hand1);

  console.log(game.playCard(0));

  console.log(game.getPlayerCard());
  console.log(game.getComputerCard());

  console.log(player1.getWonCards());
  console.log(player2.getWonCards());
}
