//Fetch the items from the JSON file

function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

loadItems().then((items) => {
  console.log(items);
});
