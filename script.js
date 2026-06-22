const buttons = document.querySelector("#buttons");
const cards = document.querySelector("#cards");
const count = document.querySelector("#count");

let data = [];
let currentCategory = "すべて";

async function loadData() {
  const response = await fetch("./data.json");
  data = await response.json();
  showButtons();
  showCards();
}

function getCategories() {
  const categories = data.map(item => item.category);
  return ["すべて", ...new Set(categories)];
}

function showButtons() {
  buttons.innerHTML = "";
  for (const category of getCategories()) {
    const button = document.createElement("button");
    button.textContent = category;
    if (category === currentCategory) {
      button.classList.add("active");
    }
    button.onclick = () => {
      currentCategory = category;
      showButtons();
      showCards();
    };
    buttons.appendChild(button);
  }
}

function showCards() {
  cards.innerHTML = "";
  const items = data.filter(item => {
    return currentCategory === "すべて"
      || item.category === currentCategory;
  });
  count.textContent = `${items.length}件を表示中`;
  for (const item of items) {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      ${item.image_url ? `<img src="${item.image_url}" alt="">` : ""}
      <div class="card-body">
        <p class="category">${item.category} / ${item.subcategory}</p>
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        ${item.address ? `<p>住所：${item.address}</p>` : ""}
        ${item.tel ? `<p>電話：${item.tel}</p>` : ""}
        <a href="${item.page_url}" target="_blank">神山マップ</a>
      </div>
    `;
    cards.appendChild(card);
  }
}

loadData();
