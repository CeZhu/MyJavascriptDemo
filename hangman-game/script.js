const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);
const figureParts = document.querySelectorAll(".figure-part");

let answer = null;
let remain = null;
let guess = null;
const correctLetters = [];
const wrongLetters = [];

displayWord();

//init
async function displayWord() {
  init();
  const response = await fetch("https://random-words-api.vercel.app/word");
  const data = await response.json();
  const word = data[0].word;
  answer = word.toLowerCase();
  remain = answer.length;
  

  for (let i = 0, len = answer.length; i < len; i++) {
    const element = document.createElement("span");
    element.classList.add("letter");
    wordEl.appendChild(element);
  }
}

function displayLetter(e) {
  const letter = e.key;
  if (letter < "a" || letter > "z") return;
  if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
    notification.classList.add("show");
    setTimeout(()=>{
      notification.classList.remove("show");
    },2000)
    return;
  }

  //right guess
  if (answer.includes(letter)) {
    const indexList = [];
    const ansArr = answer.split("");
    ansArr.forEach((value, index) => {
      if (value === letter) {
        indexList.push(index + 1);
      }
    });
    indexList.forEach((value) => {
      const element = document.querySelector(
        ".letter:nth-child(" + value + ")"
      );
      element.innerText = letter;
    });
    correctLetters.push(letter);
    remain -= indexList.length;
    if (remain === 0) {
      //showbtn
      showPlayAgainBtn(true);
    }
  } else {
    //wrong guess
    const element = figureParts[guess++];
    element.classList.add("show");
    wrongLetters.push(letter);
    updateWrongLetterEl();
    if (guess === 6) {
      //showbtn
      showPlayAgainBtn(false);
    }
  }
}

function updateWrongLetterEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
}

function showPlayAgainBtn(isWin) {
  //console.log("shoBtn执行了");
  if (isWin) {
    finalMessage.innerText = "Congratulations! You won! 😃";
  } else {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${answer}`;
  }
  popup.classList.add("show");
}

function init() {
  popup.classList.remove("show");
  figureParts.forEach((obj) => obj.classList.remove("show"));
  wordEl.innerHTML = "";
  wrongLettersEl.innerHTML = "";
  finalMessageRevealWord.innerText ="";
  wrongLetters.splice(0);
  correctLetters.splice(0);
  guess = 0;
}

window.addEventListener("keydown", displayLetter);
playAgainBtn.addEventListener("click", displayWord);
