"use strict";

import * as sound from "./sound.js";
import Field from "./field.js";

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.startBtn = document.querySelector(".game__button");
    this.gameScore = document.querySelector(".game__score");
    this.gameTimer = document.querySelector(".game__timer");

    this.startBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.score = 0;
    this.gameField.init();
    this.gameScore.innerText = this.carrotCount;

    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();

    this.startBtn.style.visibility = "visible";
  }
  stop() {
    this.started = false;
    clearInterval(this.timer);
    this.startBtn.style.visibility = "hidden";
    // this.gameFinishBanner.showWithText("Replay ?");
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop("cancle");
  }

  finish(win) {
    this.started = false;
    this.startBtn.style.visibility = "hidden";
    if (win) {
      sound.playWin;
    } else {
      sound.playBackground;
    }
    clearInterval(this.timer);
    sound.stopBackground();
    // this.gameFinishBanner.showWithText(win ? "YOU WON! " : "YOU LOST !");

    this.onGameStop && this.onGameStop(win ? "win" : "lose");
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === "bug") {
      this.finish(false);
    }
  };

  showStopButton() {
    const icon = this.startBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.startBtn.style.visibility = "visible";
  }
  showTimerAndScore() {
    this.gameScore.style.visibility = "visible";
    this.gameTimer.style.visibility = "visible";
  }
  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimeText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
        return;
      }
      this.updateTimeText(--remainingTimeSec);
    }, 1000);
  }

  updateTimeText(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    this.gameTimer.textContent = `${minutes}:${seconds}`;
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}
