"use strict";
const CARROT_SIZE = 80;
const CARRPT_COUNT = 5;
const BUG_COUNT = 5;
const field = document.querySelector(".game__field");
const field_Rect = field.getBoundingClientRect();
const startBtn = document.querySelector(".game__button");
const gameScore = document.querySelector(".game__score");
const gameTimer = document.querySelector(".game__timer");

const popUp = document.querySelector(".pop-up--hide");
const popUpText = document.querySelector(".pop-up__message");
const popUpReplay = document.querySelector(".pop-up__replay");

let started = false;
let score = 0;
let timer = undefined;
const GAME_DURATION = 10;
// const time_interval;

function stayCarrot() {}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = field_Rect.width - CARROT_SIZE;
  const y2 = field_Rect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}
function startGame() {
  field.innerHTML = "";
  gameScore.innerText = CARRPT_COUNT;
  addItem("carrot", CARRPT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}
function showStopButton() {
  const icon = startBtn.querySelector(".fa-play");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}
function showTimerAndScore() {
  gameScore.style.visibility = "visible";
  gameTimer.style.visibility = "visible";
}
function startGameTimer() {
  let remainingTimeSec = GAME_DURATION;
  updateTimeText(remainingTimeSec);
  timer = setInterval(function () {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimeText(--remainingTimeSec);
  }, 1000);
}
function updateTimeText(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  gameTimer.textContent = `${minutes}:${seconds}`;
}
function stopGame() {
  clearInterval(timer);
  startBtn.style.visibility = "hidden";
  showPopUpWithText("Replay ??");
}
function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.replace("pop-up--hide", "pop-up");
  // popUp.classList.add("pop-up");
}
function init() {
  startBtn.addEventListener("click", () => {
    if (started) {
      stopGame();
    } else {
      startGame();
    }
    started = !started;

    stayCarrot();
  });
}

init();
