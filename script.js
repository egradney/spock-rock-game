import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');
const resultText = document.getElementById('resultText');

const possiblePlays = {
  Rock: { name: 'Rock', defeats: ['Scissors', 'Lizard'] },
  Paper: { name: 'Paper', defeats: ['Rock', 'Spock'] },
  Scissors: { name: 'Scissors', defeats: ['Paper', 'Lizard'] },
  Lizard: { name: 'Lizard', defeats: ['Paper', 'Spock'] },
  Spock: { name: 'Spock', defeats: ['Scissors', 'Rock'] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';

// Reset all 'selected' icons, remove confetti
function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
}

// Reset score & playerChoice/computerChoice
function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resetSelected();
}
window.resetAll = resetAll;

// Random computer choice
const computerChoices = [{'Rock': computerRock}, {'Paper': computerPaper}, {'Scissors':computerScissors}, {'Lizard':computerLizard}, {'Spock':computerSpock}];
let computerChoiceElText = '';
let computerChoiceJS = '';
function computerRandomChoice() {
  const computerChoiceNumber = Math.floor(Math.random() * computerChoices.length);
  computerChoice = computerChoices[computerChoiceNumber];
  computerChoiceElText = String(Object.keys(computerChoice));
  computerChoiceJS = Object.values(computerChoice)[0];
}

// Add 'selected' styling & computerChoice
function displayComputerChoice() {
      computerChoiceJS.classList.add('selected');
      computerChoiceEl.textContent = `--- ${computerChoiceElText}`;
}

// Check result, increase scores, update resultText
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    const results = possiblePlays[playerChoice];
    if (results.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.textContent = 'You Won!';
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = 'You Lost!';
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

// Call functions to process turn
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// Passing player selection value and styling icons
const playerChoices = [{'Rock': playerRock}, {'Paper': playerPaper}, {'Scissors': playerScissors}, {'Lizard':playerLizard}, {'Spock':playerSpock}];
let playerChoiceJS = '';
function select(playerChoice) {
  playerChoiceJS = Object.values(playerChoices.filter(obj => String(Object.keys(obj)) === playerChoice)[0])[0];
  checkResult(playerChoice);
  playerChoiceJS.classList.add('selected');
  playerChoiceEl.textContent = ` --- ${playerChoice}`;
}
window.select = select;

// On startup, set initial values
resetAll();
