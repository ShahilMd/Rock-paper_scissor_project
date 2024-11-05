const MOVES = {
  rock: '✊',
  paper: '✋',
  scissor: '✌️'
};

let playerMove = '';
let computerMove = '';
const result = document.querySelector('#result');
const showPlayerMove = document.querySelector('.player-choice');
const showComputerMove = document.querySelector('.computer-choice');
const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');
const tieScore = document.querySelector('#tie-score');
const choices = document.querySelectorAll('.choice');
const resetBtn = document.querySelector('#reset-btn');

// Add event listeners for choices
choices.forEach(choice => {
  choice.addEventListener('click', () => {
    randomChoice(choice.dataset.choice);
  });
});

// Add event listener for reset button
resetBtn.addEventListener('click', resetGame);

function loadScores() {
  const savedPlayerScore = localStorage.getItem('playerScore') || '0';
  const savedComputerScore = localStorage.getItem('computerScore') || '0';
  const savedTieScore = localStorage.getItem('tieScore') || '0';
  
  playerScore.textContent = savedPlayerScore;
  tieScore.textContent = savedTieScore;
  computerScore.textContent = savedComputerScore;
}

function getComputerMove() {
  const moves = ['rock', 'paper', 'scissor'];
  const randomIndex = Math.floor(Math.random() * 3);
  return moves[randomIndex];
}

function determineWinner(player, computer) {
  if (player === computer) return 'Tie';
  
  const winningCombos = {
    rock: 'scissor',
    paper: 'rock',
    scissor: 'paper'
  };
  
  return winningCombos[player] === computer ? 'You Win' : 'You Lose';
}

function updateScore(gameResult) {
  if (gameResult === 'You Win') {
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  } else if (gameResult === 'You Lose') {
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
  } else {
    tieScore.textContent = parseInt(tieScore.textContent) + 1;
  }
  saveScores(); 
}

function saveScores() {
  localStorage.setItem('playerScore', playerScore.textContent);
  localStorage.setItem('computerScore', computerScore.textContent);
  localStorage.setItem('tieScore', tieScore.textContent);
}

function showMoves(playerMove, computerMove) {
  showPlayerMove.textContent = MOVES[playerMove];
  showComputerMove.textContent = MOVES[computerMove];
}

function randomChoice(yourMove) {
  playerMove = yourMove;
  computerMove = getComputerMove();
  
  const gameResult = determineWinner(playerMove, computerMove);
  result.textContent = gameResult;
  if(gameResult === "You Win") {
    result.style.color = "greenyellow";
  } else if(gameResult === "You Lose") {
    result.style.color = "red";
  } else {
    result.style.color = "yellow";
  }
  
  updateScore(gameResult);
  showMoves(playerMove, computerMove);
}

function resetGame() {
  playerScore.textContent = '0';
  computerScore.textContent = '0';
  tieScore.textContent = '0';
  showPlayerMove.textContent = '';
  showComputerMove.textContent = '';
  result.textContent = 'Choose your move!';
  result.style.color = 'white';
  localStorage.removeItem('playerScore');
  localStorage.removeItem('computerScore');
  localStorage.removeItem('tieScore');
}

// Initialize when the page loads
window.addEventListener('load', loadScores);