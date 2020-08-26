const target = document.querySelector(".target");
const vertical = document.querySelector(".vertical");
const horizontal = document.querySelector(".horizontal");
const tag = document.querySelector(".tag");

function init() {
  document.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;

    vertical.style.left = `${x}px`;
    horizontal.style.top = `${y}px`;
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    tag.style.left = `${x}px`;
    tag.style.top = `${y}px`;

    tag.innerHTML = `${x}px,${y}px`;
  });
}

init();
