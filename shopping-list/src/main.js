const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__add");
const items = document.querySelector(".items");

function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");

  const item = document.createElement("div");
  item.setAttribute("class", "items__li");

  const name = document.createElement("span");
  name.setAttribute("class", "item__name");
  name.innerText = text;

  const button = document.createElement("button");
  button.setAttribute("class", "item__delete");
  button.innerHTML = '<i class="fas fa-trash"></i>';
  button.addEventListener("click", () => {
    items.removeChild(itemRow);
  });

  const itemDivider = document.createElement("div");
  itemDivider.setAttribute("class", "item__divider");

  item.appendChild(name);
  item.appendChild(button);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);

  return itemRow;
}

function onAddList() {
  const text = input.value;

  if (text === "") {
    input.focus();
    return;
  }

  const item = createItem(text);
  items.appendChild(item);
  //새로 추가된 아이템으로 스크롤
  item.scrollIntoView({ block: "center" });
  //인풋 초기화
  input.value = "";
  input.focus();
}

function init() {
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      onAddList();
    }
  });
  addBtn.addEventListener("click", () => {
    onAddList();
  });
}

init();
