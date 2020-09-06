"use strict";
const carrotSound = new Audio("./sound/carrot_pull.mp3");

export default class Field {
  constructor(carrotCount, bugCount) {
    this.CARROT_SIZE = 80;
    this.CARROT_COUNT = carrotCount;
    this.BUG_COUNT = bugCount;
    this.field = document.querySelector(".game__field");
    this.field_Rect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.CARROT_COUNT, "img/carrot.png");
    this._addItem("bug", this.BUG_COUNT, "img/bug.png");
  }

  // _로 시작하면 private 로 한다는 뜻
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.field_Rect.width - this.CARROT_SIZE;
    const y2 = this.field_Rect.height - this.CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }
  onClick(event) {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      playSound(carrotSound);
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick("bug");
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
