const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

updateDOM();

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("请输入信息和金额");
    return;
  }

  let transactions = JSON.parse(localStorage.getItem("transactions"));
  if (transactions == null) transactions = [];
  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
  };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateDOM();
}

function updateDOM() {
  const transactions = JSON.parse(localStorage.getItem("transactions"));
  if (transactions) {
    const balanceValue = getBalance(transactions);
    const incomeValue = getIncome(transactions);
    const expenseValue = getExpense(transactions);
    balance.innerText = `$${Number(balanceValue).toFixed(2)}`;
    money_plus.innerText = `$${Number(incomeValue).toFixed(2)}`;
    //console.log(incomeValue);
    money_minus.innerText = `$${Number(expenseValue).toFixed(2)}`;

    list.innerHTML = transactions
      .map(
        (transaction) => `<li class="${
          Number(transaction.amount) >= 0 ? "plus" : "minus"
        }">
    ${transaction.text} <span>${
          Number(transaction.amount) >= 0 ? "+" : "-"
        }${Math.abs(
          transaction.amount
        )}</span> <button class="delete-btn" onclick="removeTransaction(${
          transaction.id
        })">x</button>
        </li>
    `
      )
      .join("");
  }
}

function removeTransaction(id) {
  let transactions = JSON.parse(localStorage.getItem("transactions"));
  transactions = transactions.filter((o) => o.id != id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateDOM();
}

function getBalance(transactions) {
  return transactions.reduce((pre, value) => (pre += +value.amount), 0);
}

function getIncome(transactions) {
  return transactions
    .filter((o) => o.amount > 0)
    .reduce((pre, o) => (pre += o.amount), 0);
}

function getExpense(transactions) {
  return transactions
    .filter((o) => o.amount < 0)
    .reduce((pre, o) => (pre += o.amount), 0);
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

form.addEventListener("submit", addTransaction);
