/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

/* 
NUMBER GUESSING GAME
Implement the missing code based on the comments
*/

// Generate random number between 1-100 (inclusive)
function generateWinningNumber() {
  // Return random integer
  return Math.floor(Math.random() * 100) + 1;
} 

// Shuffle array using Fisher-Yates algorithm
function shuffle(array) {
  // Modify array in place and return it
  let currentArr = array.length;
  let randomArr;
  
  while (currentArr !=0){

    randomArr = Math.floor(Math.random() * currentArr);
    currentArr--;

    [array[currentArr], array[randomArr]] = [
      array[randomArr], array[currentArr]];

  }
  return array;
}

class Game {
  constructor() {
    // Initialize properties:
    // - playersGuess (current guess)
    // - pastGuesses (array of previous guesses)
    // - winningNumber (generated number)
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    Game.prototype.difference = function() {
      return Math.abs(this.playersGuess - this.winningNumber);} 
  }

  // Return absolute difference between guess and winning number
  difference() {
    // Calculate and return difference
    const difference = this.playersGuess - this.winningNumber
    return difference
  }

  // Return true if guess is lower than winning number
  isLower() {
    // Return boolean comparison
    if (this.playersGuess <this.winningNumber){
      return true;
     }else{
      return false;
     }
  }

  // Validate and process guess
  playersGuessSubmission(num) {
    // Throw error if invalid number
    // Set playersGuess
    // Return checkGuess result
    if (typeof num !== 'number' || num < 1 || num > 100) {
      throw "That is an invalid guess.";
  }
  this.playersGuess = num;
  return this.checkGuess();
  }

  // Evaluate guess and return feedback message
  checkGuess() {
    // Handle win condition
    // Handle duplicate guess
    // Add to pastGuesses
    // Handle max guesses
    // Return temperature feedback
    if (this.playersGuess === this.winningNumber) {
      return "You Win!";
  }

  if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
  }

  this.pastGuesses.push(this.playersGuess);

  if (this.pastGuesses.length >= 5) {
      return "You Lose.";
  }

  const diff = this.difference();
  if (diff < 10) {
      return "You're burning up!";
  } else if (diff < 25) {
      return "You're lukewarm.";
  } else if (diff < 50) {
      return "You're a bit chilly.";
  } else {
      return "You're ice cold!";
  }
  }

  // Generate array with 3 numbers (winning + 2 random)
  provideHint() {
    // Create array and shuffle
    
    
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize game state
  let game = newGame(); // Creates a new Game instance

  // Get DOM elements
  const guessInput = document.getElementById("player-input");
  const submitButton = document.getElementById("submit");
  const resetButton = document.getElementById("reset");
  const hintButton = document.getElementById("hint");
  const feedback = document.getElementById("feedback");
  const pastGuessesDisplay = document.getElementById("past-guesses");

  // Helper: Update past guesses display
  function updatePastGuesses() {
      pastGuessesDisplay.textContent = "Past guesses: " + game.pastGuesses.join(", ");
  }

  // Helper: Reset the game state
  function resetGame() {
      game = newGame();
      guessInput.value = "";
      feedback.textContent = "New game started! Enter your guess.";
      pastGuessesDisplay.textContent = "";
      submitButton.disabled = false;
      hintButton.disabled = false;
  }

  // Submit guess event
  submitButton.addEventListener("click", () => {
      const guess = parseInt(guessInput.value, 10);
      if (isNaN(guess) || guess < 1 || guess > 100) {
          feedback.textContent = "Please enter a valid number between 1 and 100.";
          return;
      }

      try {
          const result = game.playersGuessSubmission(guess);
          feedback.textContent = result;
          updatePastGuesses();

          if (result.includes("Win") || result.includes("Lose")) {
              submitButton.disabled = true;
              hintButton.disabled = true;
          }
      } catch (err) {
          feedback.textContent = err;
      }
  });

  // Reset game event
  resetButton.addEventListener("click", resetGame);

  // Show hint event
  hintButton.addEventListener("click", () => {
      const hints = game.provideHint();
      feedback.textContent = "Hint: One of these numbers is correct — " + hints.join(", ");
  });
});