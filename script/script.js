async function getUser(URL) {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    return Object.entries(result).map(([key, value]) => `${key}: ${value}`);
  } catch (error) {
    console.error(error);
    return [];
  }
}

const container = document.querySelector(".container");
const blockClass = "block";
const result = [];

function addBlock(data) {
  const block = document.createElement("div");
  block.classList.add(blockClass);
  block.innerHTML = data.join("<br>");
  container.appendChild(block);
  result.push(block);
}

function counter() {
  let count = 0;
  return () => {
    return ++count;
  };
}
const total = new counter();

async function handleClick() {
  const count = counter();
  const data = await getUser(
    `https://jsonplaceholder.typicode.com/todos/${total()}`
  );
  addBlock(data);
}

const button = document.querySelector(".button");
button.addEventListener("click", handleClick);

function handleInput(event) {
  return event.target.value;
}

const input = document.querySelector(".input");
input.addEventListener("change", handleInput);

function handleRemove() {
  const index = input.value - 1;
  if (index >= result.length) {
    alert("Hey there is no such element🙃");
  } else {
    result[index].remove();
    result.splice(index, 1);
  }
}

const remove = document.querySelector(".delete");
remove.addEventListener("click", handleRemove);
