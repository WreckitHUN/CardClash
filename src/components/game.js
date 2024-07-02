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

  // State variables
  let lastRound = false;
  let gameOver = false;
  let lastManStanding = false;

  let table = [];
  let currentPlayer = player1;

  const rules = {
    rock: { beats: "scissors", losesTo: "paper" },
    paper: { beats: "rock", losesTo: "scissors" },
    scissors: { beats: "paper", losesTo: "rock" },
  };

  function playCard(index) {
    if (gameOver) return;
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
    // if Game over clear the hands and deck
    if (gameOver) {
      console.log("Game over");
      player1.clearDeck();
      player1.clearHand();
      player2.clearDeck();
      player2.clearHand();
    }
    if (lastManStanding) {
      console.log("Last man standing TO DO...");
    }
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
      table[last].player.addWonCards(table.map((card) => card.card));
      // If it is the last round than give the remaining deck to the wonCards
      if (lastRound) {
        console.log("Player2 won the last round");
        player1.addWonCards(player1.getDeck());
        player1.addWonCards(player1.getHand());
        player2.addWonCards(player2.getDeck());
        player2.addWonCards(player2.getHand());
        gameOver = true;
      }
      // Return the winning card object
      return table[last];
    }
    if (rules[table[beforeLast].card].beats === table[last].card) {
      // BeforeLast card is the winning card so give the cards to the winner
      table[beforeLast].player.addWonCards(table.map((card) => card.card));
      // If it is the last round than give the remaining deck to the wonCards
      if (lastRound) {
        console.log("Player1 won the last round");
        player1.addWonCards(player1.getDeck());
        player1.addWonCards(player1.getHand());
        player2.addWonCards(player2.getDeck());
        player2.addWonCards(player2.getHand());
        gameOver = true;
      }
      // Return the winning card object
      return table[beforeLast];
    }
    // If it gets here the round is TIE
    return { card: "Tie", player: { name: "No winners" } };
  }

  function endTurn(roundWinner) {
    // Draw cards for players
    player1.drawCards();
    player2.drawCards();
    // Check if the last round is tie and check if someone has empty hand then he loses
    if (roundWinner.card === "Tie" && lastRound) {
      // If both hands are empty than it is a last man standing
      if (areHandsEmpty()) {
        lastManStanding = true;
        gameOver = true;
      }
      if (player1.getHand().length === 0) {
        player2.addWonCards(table.map((card) => card.card));
        gameOver = true;
        return;
      } else if (player2.getHand().length === 0) {
        player1.addWonCards(table.map((card) => card.card));
        gameOver = true;
        return;
      }
    }
    // Check if there are no more cards in the hands so game over
    if (areHandsEmpty()) {
      // Check if there are no more cards neither in score card's pile
      if (areWonCardsEmpty()) {
        console.log("Last man standing");
        // Initialize last man standing
        lastManStanding = true;
        gameOver = true;
      }
      // If the last round is tie
      if (roundWinner.card === "Tie") {
        console.log("last round is a tie");
        // If someone doesn't have scoreCards than he loses the round
        if (player1.getWonCards().length === 0) {
          player2.addWonCards(table.map((card) => card.card));
          gameOver = true;
          return;
        } else if (player2.getWonCards().length === 0) {
          player1.addWonCards(table.map((card) => card.card));
          gameOver = true;
          return;
        }
        lastRound = true;
        // Players will continue to play with their scored cards
        // They will get their scored cards as their new deck
        player1.createNewDeck();
        player2.createNewDeck();
        // Draw cards for players
        player1.drawCards();
        player2.drawCards();
        return;
      }
      // If someone won the last round so its not a tie

      gameOver = true;
    }

    // If the round is tie than don't clear the table
    if (roundWinner.card === "Tie") return;
    // Clear table
    table.length = 0;
  }

  function areHandsEmpty() {
    return player1.getHand().length === 0 && player2.getHand().length === 0;
  }

  function areWonCardsEmpty() {
    return player1.getWonCards().length === 0 && player2.getWonCards().length === 0;
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
  const isGameOver = () => gameOver;
  const isLastManStanding = () => lastManStanding;

  return {
    player1,
    player2,
    playCard,
    gameWinner,
    getComputerCard,
    getPlayerCard,
    isGameOver,
    isLastManStanding,
  };
}

export default gameController;
