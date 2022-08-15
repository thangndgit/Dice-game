'use strict';

// 1. State variable
let playerTurn = 0;
let playersVal = [
  { score: 0, current: 0 },
  { score: 0, current: 0 },
];
let gameFinished = false;
const winScore = 100;

// 2. Get elements from document
const playersEle = [
  {
    player: document.querySelector('.player--0'),
    score: document.querySelector('#score--0'),
    current: document.querySelector('#current--0'),
  },
  {
    player: document.querySelector('.player--1'),
    score: document.querySelector('#score--1'),
    current: document.querySelector('#current--1'),
  },
];
const imgDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// 3. Small function

// 3.1. Switch player
const switchPlayer = () => {
  // Reset current score
  playersVal[playerTurn].current = 0;
  playersEle[playerTurn].current.textContent = 0;
  // Switch active class
  playersEle[playerTurn].player.classList.remove('player--active');
  playersEle[1 - playerTurn].player.classList.add('player--active');
  // Switch player turn
  playerTurn = 1 - playerTurn;
};

// 3.2. Show winner
const showWinner = () => {
  // Set game finished
  gameFinished = true;
  // Change background for winner
  playersEle[playerTurn].player.classList.remove('player--active');
  playersEle[playerTurn].player.classList.add('player--winner');
};

// 4. Handle event function

// 4.1. Play new game
const newGame = () => {
  // Hide the dice
  imgDice.classList.add('hidden');
  // Set game start
  gameFinished = false;
  playersEle[0].player.classList.remove('player--winner');
  playersEle[1].player.classList.remove('player--winner');
  // Set player 1 go first
  playerTurn = 0;
  playersEle[0].player.classList.add('player--active');
  playersEle[1].player.classList.remove('player--active');
  // Reset player 1 score
  playersVal[0].score = 0;
  playersVal[0].current = 0;
  playersEle[0].score.textContent = playersVal[0].score;
  playersEle[0].current.textContent = playersVal[0].current;
  // Reset player 2 score
  playersVal[1].score = 0;
  playersVal[1].current = 0;
  playersEle[1].score.textContent = playersVal[1].score;
  playersEle[1].current.textContent = playersVal[1].current;
};

// 4.2. Role the dice
const rollDice = () => {
  // Generate random dice roll
  const randomDice = Math.ceil(6 * Math.random());
  // Display dice roll
  imgDice.classList.remove('hidden');
  imgDice.src = `dice-${randomDice}.png`;
  // If dice roll is 1
  if (randomDice === 1) switchPlayer();
  // Else update current score
  else {
    playersVal[playerTurn].current += randomDice;
    playersEle[playerTurn].current.textContent = playersVal[playerTurn].current;
  }
};

// 4.3. Hold the score
const holdScore = () => {
  // Update score
  playersVal[playerTurn].score += playersVal[playerTurn].current;
  playersEle[playerTurn].score.textContent = playersVal[playerTurn].score;
  // If score >= win score, current player win
  if (playersVal[playerTurn].score >= winScore) showWinner();
  // Else switch player
  else switchPlayer();
};

// 5. Add event listener

// 5.1. Handle event click on 'New game' button
btnNew.addEventListener('click', newGame);

// 5.2. Handle event click on 'Roll dice' button
btnRoll.addEventListener('click', () => {
  if (!gameFinished) rollDice();
});

// 5.3. Handle event click on 'Hold' button
btnHold.addEventListener('click', () => {
  if (!gameFinished) holdScore();
});

// 6. Start new game
newGame();
