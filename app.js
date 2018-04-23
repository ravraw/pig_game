/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// return a random number between 1 - 6

///// player construction
function Player(playerName, currentScore, totalScore, active) {
  this.playerName = playerName;
  this.currentScore = currentScore;
  this.totalScore = totalScore;
  this.active = active;
  this.winner = function() {
    if (this.totalscore >= 100) {
      return true;
    } else {
      return false;
    }
  };
}

const player1 = new Player("player1", 0, 0, true);
const player2 = new Player("player2", 0, 0, false);

// variable declarations

const dice = document.querySelector(".dice");
const btnRollDice = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const btnNew = document.querySelector(".btn-new");

const currentScore_player1 = document.querySelector("#current-0");
const currentScore_player2 = document.querySelector("#current-1");
const totalScore_player1 = document.querySelector("#score-0");
const totalScore_player2 = document.querySelector("#score-1");
const winner_player1 = document.querySelector("#name-0");
const winner_player2 = document.querySelector("#name-1");

// function decalarations

function rollDice() {
  let number = Math.ceil(Math.random() * 6);
  let image = `dice-${number}.png`;
  dice.src = image;
  console.log(number);
  return number;
}

function checkWinner() {
  if (player1.totalScore >= 100) {
    winner_player1.innerHTML = "Winner";
  }
  if (player2.totalScore >= 100) {
    winner_player2.innerHTML = "Winner";
  }
}

// Event listeners

btnRollDice.addEventListener("click", () => {
  let numberRolled = rollDice();
  console.log(numberRolled);

  if (numberRolled !== 1) {
    if (player1.active === true) {
      player1.currentScore += numberRolled;
      currentScore_player1.innerHTML = player1.currentScore;
    } else {
      player2.currentScore += numberRolled;
      currentScore_player2.innerHTML = player2.currentScore;
    }
  } else {
    if (player1.active === true) {
      player1.currentScore = 0;
      currentScore_player1.innerHTML = player1.currentScore;
      player1.active = false;
      player2.active = true;
    } else {
      player2.currentScore = 0;
      currentScore_player2.innerHTML = player2.currentScore;
      player1.active = true;
      player2.active = false;
    }
  }
});

btnHold.addEventListener("click", () => {
  if (player1.active === true) {
    player1.totalScore += player1.currentScore;
    totalScore_player1.innerHTML = player1.totalScore;
    checkWinner();
    player1.currentScore = 0;
    currentScore_player1.innerHTML = player1.currentScore;
    player1.active = false;
    player2.active = true;
  } else {
    player2.totalScore += player2.currentScore;
    totalScore_player2.innerHTML = player2.totalScore;
    checkWinner();
    player2.currentScore = 0;
    currentScore_player2.innerHTML = player2.currentScore;
    player2.active = false;
    player1.active = true;
  }
});

btnNew.addEventListener("click", () => {
  player1.active = true;
  player2.active = false;
  player1.totalScore = 0;
  player1.currentScore = 0;
  player2.totalScore = 0;
  player2.currentScore = 0;
  currentScore_player1.innerHTML = player1.currentScore;
  currentScore_player2.innerHTML = player2.currentScore;
  totalScore_player1.innerHTML = player1.totalScore;
  totalScore_player2.innerHTML = player2.totalScore;
});
