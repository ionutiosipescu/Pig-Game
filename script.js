'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePLayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePLayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePLayer}`).textContent = 0;
  currentScore = 0;
  activePLayer = activePLayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1 : if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePLayer}`).textContent =
        currentScore;
    } else {
      //  switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePLayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePLayer}`).textContent =
      scores[activePLayer];
    // 2. Check if player's score is >= 100
    // Finish the game
    if (scores[activePLayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
