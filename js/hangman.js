var phil_concepts = [
	"absolute",
	"aesthetics",
	"being",
	"culture",
	"definition",
	"eternity",
	"fidelity",
	"ideology",
	"justice",
	"logics",
	"communal",
	"object",
	"symbol",
	"truth"
]

let answer = '';
let maximumWrongOption = 6;
let mistakes = 0;
let guessed = [];
// wordStatus start from unknown, then match the pressed option for updating the word completion 
let wordStatus = null;

// Pick a random word from the array
// Math.floor returns a whole number, while Math.random() will return a float between 0 and 1.
// This function access a random item in an array by generating a random float from zero to the array's length, 
// and rounding it to its nearest whole number with Math.floor
function randomWord() {
  answer = phil_concepts[Math.floor(Math.random() * phil_concepts.length)];
  // Test 1: whether this function can create random word from phil_concepts array
  console.log("Test 1 passed with word: " + answer)
}

// Generate keyboard button from A-Z
function keyboard() {
// The split('') method turns A-Z into substrings using the separator and return them as an array. Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// The map() method creates a new array populated with the results that calls each button of the alphebet keyboard. Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// map(x => y) passes the function of o map
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
   // Bottons reference: https://www.w3schools.com/bootstrap/bootstrap_buttons.asp
   // primary m-3 for buttons layout 
    ` <button
        class="btn btn-lg btn-primary m-3"
        id='` + letter + `'
        // click the button and process guess function
        // letter by letter after guess function is executed, see more below 
        // insert letter value from button to ('` + letter + `') for guess function to process
        onClick="guess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');
//  join() adds the letters from substring together
/* E.g <button class="btn btn-lg btn-primary m-2"id='a'onClick="guess('a')">'a'</button>*/

// In HTML it will be grasped as 'keyboard' to perform the function
  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// After a letter is pressed on the keyboard, it will be disabled 
function guess(letterChosen) {
  // if guessed letter is out of the array [-1], then it will disable the chosen button without update on the wordStatus
  guessed.indexOf(letterChosen) === -1 ? guessed.push(letterChosen) : null;
  document.getElementById(letterChosen).setAttribute('disabled', true);

  // What it does here is to linking objects for either the letter matched or not
  if (answer.indexOf(letterChosen) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(letterChosen) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

// update mistakes from guess function 
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

// Using the same method of keyboard function to return the value of letters back to wordStatus (so it's not null if a chosen letter is matched)
function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  
    document.getElementById('wordStatus').innerHTML = wordStatus;
  }

// Update image of hangman if updateMistakes() passed 
function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

// if the player won
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You survived!';
  }
}

// if the player lost
function checkIfGameLost() {
  if (mistakes === maximumWrongOption) {
    document.getElementById('wordStatus').innerHTML = answer;
    document.getElementById('keyboard').innerHTML = ' ';
  }
}

function restart() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  keyboard();
}

document.getElementById('maximumWrongOption').innerHTML = maximumWrongOption;

randomWord();
keyboard();
guessedWord();
