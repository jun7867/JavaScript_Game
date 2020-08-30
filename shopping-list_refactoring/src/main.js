const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__add");
const items = document.querySelector(".items");

let id = 0; //UUID
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute("data-id", id);

  itemRow.innerHTML = `
      <div class='items__li'>
        <span class="item__name">${text}</span>
        <button class="item__delete" >
          <i class="fas fa-trash-alt" data-id=${id}></i>
        </button>
      </div>
      <div class="item__divider"></div>     
  `;
  id++;
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

  items.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    if (id) {
      const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
      toBeDeleted.remove();
    }
  });
}

init();
