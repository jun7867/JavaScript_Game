"use strict";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up--hide");
    this.popUpText = document.querySelector(".pop-up__message");
    this.popUpReplay = document.querySelector(".pop-up__replay");
    this.popUpReplay.addEventListener("click", () => {
      this.onClick && this.onClick(); //onClick이 있을 때만 실행.
      hide();
    });
  }
  // 이 class를 할당한 객체에서 onClick이 들어오면 this.onClick에 저장.
  // 이 게임에서는 main.js에서 startGame()이 들어옴.
  setClickListener(onClick) {
    this.onClick = onClick;
  }
  showWithText(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.replace("pop-up--hide", "pop-up");
  }

  hide() {
    this.popUp.classList.replace("pop-up", "pop-up--hide");
  }
}
