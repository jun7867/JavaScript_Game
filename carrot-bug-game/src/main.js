"use strict";
import PopUp from "./popup.js";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 8;
const field = document.querySelector(".game__field");
const field_Rect = field.getBoundingClientRect();
const startBtn = document.querySelector(".game__button");
const gameScore = document.querySelector(".game__score");
const gameTimer = document.querySelector(".game__timer");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;
const GAME_DURATION = 5;

const gameFinishBanner = new PopUp();

gameFinishBanner.setClickListener(() => {
  startGame();
  gameFinishBanner.hide();
  startBtn.style.visibility = "visible";
});

function startGame() {
  started = true;
  score = 0;
  field.innerHTML = "";
  gameScore.innerText = CARROT_COUNT;

  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

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

function showStopButton() {
  const icon = startBtn.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  startBtn.style.visibility = "visible";
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
      finishGame(CARROT_COUNT === score);
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
  started = false;
  clearInterval(timer);
  startBtn.style.visibility = "hidden";
  gameFinishBanner.showWithText("Replay ?");
  playSound(alertSound);
  stopSound(bgSound);
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function finishGame(win) {
  started = false;
  startBtn.style.visibility = "hidden";
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  clearInterval(timer);
  stopSound(bgSound);
  gameFinishBanner.showWithText(win ? "YOU WON! " : "YOU LOST !");
}

function init() {
  startBtn.addEventListener("click", () => {
    if (started) {
      stopGame();
    } else {
      startGame();
    }
  });

  field.addEventListener("click", onFieldClick);
}

init();
