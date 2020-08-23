//Fetch the items from the JSON file

function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

//받아온 items를 display 화면에 보여주기
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  return `
  <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
  </li>`;
}

//main
//아이템 동적으로 받아오기
loadItems().then((items) => {
  console.log(items);
  displayItems(items); // 화면에 출력.
});
