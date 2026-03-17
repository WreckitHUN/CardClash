function playRound(player1, index1, player2, index2) {
  // Both players play a card in their hand - Not checking if the index is correct
  const card1 = player1.playCard(index1);
  const card2 = player2.playCard(index2);

  // Determine winner
  const result = determineWinner(card1, card2);

  // TIE
  if (result === "tie") {
    //EXIT 1
    return {
      isTie: true,
      winner: undefined,
      cards: [card1, card2],
    };
  }

  // SOMEONE WINS
  const winner = result === "player1" ? player1 : player2;
  //EXIT 2
  return {
    isTie: false,
    winner,
    cards: [card1, card2],
  };
}

// Determine winner based on Rock Paper Scissors rules
function determineWinner(card1, card2) {
  if (card1 === card2) return "tie";

  if (
    (card1 === "Rock" && card2 === "Scissors") ||
    (card1 === "Paper" && card2 === "Rock") ||
    (card1 === "Scissors" && card2 === "Paper")
  ) {
    return "player1";
  } else {
    return "player2";
  }
}

export default playRound;
