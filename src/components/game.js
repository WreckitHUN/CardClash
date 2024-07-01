import createPlayer from "./player";
/* {
    name,
    playCard,
    drawCards,
    getHand,
    addWonCards,
    getWonCardCount,
  }*/

function gameController() {
  const player1 = createPlayer("You");
  const player2 = createPlayer("computer");

  let playerCard = undefined;
  let computerCard = undefined;

  let lastRound = false;

  let table = [];
  let currentPlayer = player1;

  const rules = {
    rock: { beats: "scissors", losesTo: "paper" },
    paper: { beats: "rock", losesTo: "scissors" },
    scissors: { beats: "paper", losesTo: "rock" },
  };

  function playCard(index) {
    const playedCard = currentPlayer.playCard(index);
    playerCard = playedCard;
    // Put the card on the table
    table.push({ card: playedCard, player: currentPlayer });
    // Toggle Player
    togglePlayer();
    // Computer's turn
    computerCard = playComputer();
    // Check who won the round or tie
    const roundWinner = checkRound();
    // End the turn
    endTurn(roundWinner);

    return roundWinner; // { card: playedCard, player: winnerPlayer } card: "rock", "paper", "scissors", "Tie"
  }

  function playComputer() {
    if (currentPlayer.name != "computer") return;
    const index = Math.random() * currentPlayer.getHand().length;
    const playedCard = currentPlayer.playCard(index);
    // Put the card on the table
    table.push({ card: playedCard, player: currentPlayer });
    togglePlayer();
    return playedCard;
  }

  function checkRound() {
    // Check if there are even number of cards on the table
    if (table.length % 2 != 0) return;
    const length = table.length;
    const last = length - 1;
    const beforeLast = last - 1;

    // Compare the last 2 cards on the table and decide who won the round or tie
    if (rules[table[last].card].beats === table[beforeLast].card) {
      // Last card is the winning card so give the cards to the winner
      table[last].player.addWonCards(table);
      // If it is the last round than give the remaining deck to the wonCards
      if (lastRound) {
        player1.addWonCards(player1.getDeck());
        player2.addWonCards(player2.getDeck());
        lastRound = false;
      }
      // Return the winning card object
      return table[last];
    }
    if (rules[table[beforeLast].card].beats === table[last].card) {
      // BeforeLast card is the winning card so give the cards to the winner
      table[beforeLast].player.addWonCards(table);
      // If it is the last round than give the remaining deck to the wonCards
      if (lastRound) {
        player1.addWonCards(player1.getDeck());
        player2.addWonCards(player2.getDeck());
        lastRound = false;
      }
      // Return the winning card object
      return table[beforeLast];
    }
    // If the function gets here than it is a tie
    if (lastRound && areHandsEmpty()) {
      // If it is the last round and the hands are empty then its a TIE GAME OVER
      console.log("TIE");
    }
    return { card: "Tie", player: { name: "No winners" } };
  }

  function endTurn(roundWinner) {
    // Draw cards for players
    player1.drawCards();
    player2.drawCards();
    // Check if there are no more cards in the hands so game over
    if (areHandsEmpty()) {
      // If the last round is tie
      if (roundWinner.card === "Tie") {
        lastRound = true;
        console.log("TODO");
        // Players will continue to play with their scored cards
        // They will get their scored cards as their new deck
        player1.createNewDeck();
        player2.createNewDeck();
        // Draw cards for players
        player1.drawCards();
        player2.drawCards();
        return;
      }
    }

    // If the round is tie than don't clear the table
    if (roundWinner.card === "Tie") return;
    // Clear table
    table.length = 0;
  }

  function areHandsEmpty() {
    if (player1.getHand().length === 0 && player2.getHand().length === 0) {
      return true;
    }
    return false;
  }

  function gameWinner() {
    // Check if the whole game is a tie
    if (player1.getWonCardCount() === player2.getWonCardCount()) return "Tie";
    // Otherwise return the winner
    return player1.getWonCardCount() > player2.getWonCardCount() ? player1.name : player2.name;
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  const getComputerCard = () => computerCard;
  const getPlayerCard = () => playerCard;

  return {
    player1,
    player2,
    playCard,
    gameWinner,
    getComputerCard,
    getPlayerCard,
  };
}

export default gameController;
