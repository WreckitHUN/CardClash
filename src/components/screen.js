import gameController from "./game";

function screenHandler() {
  const game = gameController();
  const player1 = game.player1;
  const player2 = game.player2;

  const hand1 = document.querySelector(".hand1");
  const hand2 = document.querySelector(".hand2");
  // Draw the cards
  drawCards(player1);

  // Add event listener to the hand1
  hand1.addEventListener("click", (e) => {
    card = e.target;
    // If not clicked on a card return
    if (!card.dataset.index) return;
    const cardClass = card.getAttribute("class");
    const classesArray = cardClass.split(" ");
    const suit = classesArray.find((item) => item !== "card");
    const index = card.dataset.index;
    game.playCard(index);

    console.log(`Player1 chose: ${game.getPlayerCard()}`);
    console.log(`Player2 chose: ${game.getComputerCard()}`);

    console.log(`Player1 score: ${player1.getWonCards()}`);
    console.log(`Player2 score: ${player2.getWonCards()}`);
    // Get the position of the clicked card
    const cardX = card.getBoundingClientRect().x;
    const cardY = card.getBoundingClientRect().y;
    // Make card invisible
    card.style.display = "none";
    // Create a card on top of clicked card
    const cardTemp = createCard(-1, suit, "absolute");
    cardTemp.style.left = `${cardX}px`;
    cardTemp.style.top = `${cardY}px`;
    document.body.appendChild(cardTemp);
    // Move the cardTemp to the table
    setTimeout(() => (cardTemp.style.transform = "translate(0px, -200px)"), 0);
    // Draw the cards
    setTimeout(() => drawCards(player1), 500);
  });

  function drawCards(player) {
    // Clear hands
    (player === player1 ? hand1 : hand2).textContent = "";
    const cardsForHand = player.getHand();
    cardsForHand.forEach((suit, index) => {
      const card = createCard(index, suit);
      (player === player1 ? hand1 : hand2).appendChild(card);
    });
  }

  function createCard(index, ...suit) {
    const card = document.createElement("button");
    card.dataset.index = index;
    card.classList.add("card", ...suit);
    return card;
  }

  /*let gameOver = false;

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
  }*/
}

export default screenHandler;
