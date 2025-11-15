// Adicionar card
function addCard(column){
  const cards = JSON.parse(localStorage.getItem("cards")||"[]");
  const newCard = {id:Date.now(), text:"", column:column};
  cards.push(newCard);
  localStorage.setItem("cards", JSON.stringify(cards));
  renderCards();
}

// Renderizar cards
function renderCards(){
  const columns = ["novo","negociacao","andamento","fechado"];
  columns.forEach(c => document.getElementById(c).innerHTML = "");
  const cards = JSON.parse(localStorage.getItem("cards")||"[]");
  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.draggable = true;
    div.dataset.id = card.id;
    div.ondragstart = drag;
    div.innerHTML = `
      <textarea onkeyup="updateCard(${card.id}, this.value)" placeholder="Digite aqui...">${card.text}</textarea>
      <button class="delete-btn" onclick="deleteCard(${card.id})">X</button>
    `;
    document.getElementById(card.column).appendChild(div);
  });
}

// Atualizar card
function updateCard(id, value){
  const cards = JSON.parse(localStorage.getItem("cards")||"[]");
  const index = cards.findIndex(c=>c.id===id);
  cards[index].text = value;
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Excluir card
function deleteCard(id){
  let cards = JSON.parse(localStorage.getItem("cards")||"[]");
  cards = cards.filter(c=>c.id!==id);
  localStorage.setItem("cards", JSON.stringify(cards));
  renderCards();
}

// Drag & Drop
function allowDrop(ev){ ev.preventDefault(); }
function drag(ev){ ev.dataTransfer.setData("id", ev.target.dataset.id); }
function drop(ev){
  ev.preventDefault();
  const id = ev.dataTransfer.getData("id");
  const cards = JSON.parse(localStorage.getItem("cards")||"[]");
  const card = cards.find(c=>c.id==id);
  const columnDiv = ev.currentTarget.querySelector(".card-list");
  if(columnDiv){
    card.column = columnDiv.id;
    localStorage.setItem("cards", JSON.stringify(cards));
    renderCards();
  }
}

window.onload = function(){
  document.querySelectorAll(".column").forEach(col=>{
    col.ondragover = allowDrop;
    col.ondrop = drop;
  });
  renderCards();
};
