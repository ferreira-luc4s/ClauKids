let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let total = carrinho.reduce((acc, item) => acc + item.preco, 0);

// Adiciona produto ao carrinho
function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  salvarCarrinho();
  alert(nome + " foi adicionado ao carrinho!");
}

// Remove produto do carrinho pelo índice
function removerItem(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  salvarCarrinho();
  atualizarCarrinho();
}

// Atualiza lista do carrinho na tela
function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  if (!lista) return; // evita erro quando não está na página do carrinho

  lista.innerHTML = "";
  carrinho.forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = item.nome + " - R$ " + item.preco;

    let btn = document.createElement("button");
    btn.textContent = "Remover";
    btn.style.marginLeft = "10px";
    btn.onclick = () => removerItem(index);

    li.appendChild(btn);
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = total;
}

// Salva carrinho no localStorage
function salvarCarrinho() {
  total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Envia pedido para WhatsApp
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá, gostaria de finalizar minha compra na Clau Kids:\n\n";
  carrinho.forEach(item => {
    mensagem += "- " + item.nome + " (R$ " + item.preco + ")\n";
  });
  mensagem += "\nTotal: R$ " + total;

  // 🔴 Troque pelo seu número com DDD (ex: 5599999999999)
  let numero = "+5519989393673";
  let url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

  window.open(url, "_blank");
}

// Atualiza carrinho automaticamente ao abrir a página de carrinho
atualizarCarrinho();
