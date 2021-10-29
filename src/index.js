import "./styles.css";

//ボタンをクリックしたときの処理を関数定義
const clickButton = () => {
  //id="input-todo"に入力した内容をinputTextとして変数に取得
  const inputText = document.getElementById("input-todo").value;

  //id="input-todo"に入力した内容を消去
  document.getElementById("input-todo").value = "";

  //id="todo-list"の中に入力したTODOを追加
  const todo = addTodo(inputText);
  document.getElementById("todo-list").appendChild(todo);
};

//id="add-button"のクリック時にclickButton関数を動かす
document
  .getElementById("add-button")
  .addEventListener("click", () => clickButton());

//<div>タグの生成<p>の生成　=>　入力した内容を<p>タグに入れ<div>タグの子要素にして返却
const addTodo = (text) => {
  const div = document.createElement("div");
  div.className = "list-row";
  const p = document.createElement("p");
  p.innerText = text;
  div.appendChild(p);
  return div;
};
