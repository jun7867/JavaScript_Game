//Fetch the items from the JSON file

function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

//받아온 items를 display 화면에 보여주기
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join(""); // join을 해서 붙여줘야함
}

//items object를 HTML li형태로 리턴
function createHTMLString(item) {
  return `
  <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
  </li>`;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  displayItems(filtered);
}

//버튼을 클릭했을때 filter
function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".btn__container");
  logo.addEventListener("click", () => {
    displayItems(items);
  });
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

//main
//아이템 동적으로 받아오기
loadItems().then((items) => {
  console.log(items);
  displayItems(items); // 화면에 출력.
  setEventListeners(items);
});
