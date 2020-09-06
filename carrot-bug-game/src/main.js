"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";

const startBtn = document.querySelector(".game__button");
const gameScore = document.querySelector(".game__score");
const gameTimer = document.querySelector(".game__timer");
const CARROT_COUNT = 10;
const BUG_COUNT = 10;

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

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    } else if (item === "bug") {
      finishGame(false);
    }
  }
}

function startGame() {
  started = true;
  score = 0;
  gameField.init();
  gameScore.innerText = CARROT_COUNT;

  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
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

  // field.addEventListener("click", onFieldClick);
}

init();
