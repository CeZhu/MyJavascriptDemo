const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

let randomWord;

let score = 0;
let time = 10;

let difficulty =
  localStorage.getItem("difficulty") != null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value = difficulty;

text.focus();
addWordToDOM();

const timeInterval = setInterval(() => {
  time--;
  updateTime();
  if(time===0){
    gameOver();
  }
}, 1000);

function updateTime(){
  timeEl.innerText = time+"s";
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM(){
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore(){
  score++;
  scoreEl.innerText = score;
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

text.addEventListener("input",()=>{
  if(text.value===randomWord){
    addWordToDOM();
    updateScore();
    text.value="";
    switch(difficulty.toLowerCase()){
      case "easy":
        time+=5;
        break;
      case "medium":
        time+=3;
        break;
      default:
        time+=2;
        break;
    }
    updateTime();
  }
})