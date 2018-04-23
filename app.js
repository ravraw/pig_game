/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// return a random number between 1 - 6

/////////////// PLAYER CONSTRUCTION  //////////////////////

function Player(playerName, currentScore, totalScore, active) {
  this.playerName = playerName;
  this.currentScore = currentScore;
  this.totalScore = totalScore;
  this.active = active;
  this.winner = function() {
    if (this.totalScore >= 100) {
      return true;
    } else {
      return false;
    }
  };
}

const player1 = new Player("player1", 0, 0, true);
const player2 = new Player("player2", 0, 0, false);

/////////////// VARIABLE DECLARATIONS  ////////////////////

const btnNew = document.querySelector(".btn-new");
const btnRollDice = btnNew.nextElementSibling;
const btnHold = btnRollDice.nextElementSibling;
const dice = btnHold.nextElementSibling;

const currentScore_player1 = document.querySelector("#current-0");
const currentScore_player2 = document.querySelector("#current-1");
const totalScore_player1 = document.querySelector("#score-0");
const totalScore_player2 = document.querySelector("#score-1");
const panel_player1 = document.querySelector(".player-0-panel");
const panel_player2 = document.querySelector(".player-1-panel");

const name_player1 = document.querySelector("#name-0");
const name_player2 = document.querySelector("#name-1");

/////////////////  FUNCTIONS DECLARATIONS ////////////////////////

///// Function genertes a random number and displays the image accordingly.

function rollDice() {
  let number = Math.ceil(Math.random() * 6);
  let image = `dice-${number}.png`;
  dice.src = image; // image is replaced .
  console.log(number);
  return number;
}

/////// Change turn

function changeTurn() {
  panel_player1.classList.toggle("active");
  panel_player2.classList.toggle("active");
}

/////// Function updates current scores after each dice roll.

function updateCurrentScores() {
  let numberRolled = rollDice(); // randomnumber and image generated
  if (numberRolled !== 1) {
    if (panel_player1.classList.contains("active")) {
      player1.currentScore += numberRolled;
      currentScore_player1.innerHTML = player1.currentScore;
    } else {
      player2.currentScore += numberRolled;
      currentScore_player2.innerHTML = player2.currentScore;
    }
  } else {
    if (panel_player1.classList.contains("active")) {
      player1.currentScore = 0;
      currentScore_player1.innerHTML = player1.currentScore;
      changeTurn();
    } else {
      player2.currentScore = 0;
      currentScore_player2.innerHTML = player2.currentScore;
      changeTurn();
    }
  }
}

///////// Function updates Total score after each hold

function updateTotalScores() {
  if (panel_player1.classList.contains("active")) {
    player1.totalScore += player1.currentScore;
    totalScore_player1.innerHTML = player1.totalScore;
    player1.currentScore = 0;
    currentScore_player1.innerHTML = player1.currentScore;

    changeTurn();
  } else {
    player2.totalScore += player2.currentScore;
    totalScore_player2.innerHTML = player2.totalScore;
    player2.currentScore = 0;
    currentScore_player2.innerHTML = player2.currentScore;

    changeTurn();
  }
}

//////// Check for a possible winner after each hold.

function checkWinner() {
  if (player1.winner() === true) {
    name_player1.innerHTML = "Winner";
    name_player1.classList.add("winner");
    panel_player1.classList.add("winner");
  }
  if (player2.winner() === true) {
    name_player2.innerHTML = "Winner";
    name_player2.classList.add("winner");
    panel_player2.classList.add("winner");
  }
}

////////////////////////// EVENT LISTENERS ////////////////////

//////// Dice roll
btnRollDice.addEventListener("click", () => {
  updateCurrentScores();
});

////////  Hold button clicked

btnHold.addEventListener("click", () => {
  updateTotalScores();
  checkWinner();
});

////// Game reset

btnNew.addEventListener("click", () => {
  player1.totalScore = 0;
  player1.currentScore = 0;
  player2.totalScore = 0;
  player2.currentScore = 0;
  currentScore_player1.innerHTML = player1.currentScore;
  currentScore_player2.innerHTML = player2.currentScore;
  totalScore_player1.innerHTML = player1.totalScore;
  totalScore_player2.innerHTML = player2.totalScore;

  name_player1.innerHTML = "PLAYER 1";
  name_player1.classList.remove("winner");
  panel_player1.classList.remove("winner");
  name_player2.innerHTML = "PLAYER 2";
  name_player2.classList.remove("winner");
  panel_player2.classList.remove("winner");
});
