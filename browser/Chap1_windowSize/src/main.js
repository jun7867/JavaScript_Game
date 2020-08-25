const wrapper = document.querySelector(".wrapper");

function update() {
  wrapper.innerHTML = `
    <li class='list'> window.screen: ${screen.width}, ${screen.height}</li>
    <li class='list'> window.outer: ${outerWidth}, ${outerHeight}</li>
    <li class='list'> window.inner: ${innerWidth}, ${innerHeight}</li>
    <li class='list'> documentElement.clientWidth: ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}</li>
    `;
}

function init() {
  window.addEventListener("resize", () => {
    update();
  });
  update();
}

init();
