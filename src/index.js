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
  div.id = "drag-target";
  div.draggable = "true";
  div.ondragstart = "event.dataTransfer.setData('text/plain',null)";
  console.log(div);
  const p = document.createElement("p");
  p.innerText = text;
  div.appendChild(p);
  return div;
};
/**
 * <div class="list-row" id="drag-target" draggable="true">
 *  <p>aaa</p>
 * </div>
 */

//ドラッグ＆ドロップ
/* events fired on the draggable target */
var dragged;

document.addEventListener("drag", (e) => {}, false);

document.addEventListener(
  "dragstart",
  (e) => {
    // store a ref. on the dragged elem
    dragged = e.target;
    // make it half transparent
    e.target.style.opacity = 0.5;
  },
  false
);
document.addEventListener(
  "dragend",
  (e) => {
    // reset the transparency
    e.target.style.opacity = "";
  },
  false
);

/* events fired on the drop targets */
document.addEventListener(
  "dragover",
  (e) => {
    // prevent default to allow drop
    e.preventDefault();
  },
  false
);

document.addEventListener(
  "dragenter",
  (e) => {
    // highlight potential drop target when the draggable element enters it
    if (e.target.className === "dropzone") {
      e.target.style.background = "purple";
    }
  },
  false
);

document.addEventListener(
  "dragleave",
  (e) => {
    // reset background of potential drop target when the draggable element leaves it
    if (e.target.className === "dropzone") {
      e.target.style.background = "";
    }
  },
  false
);

document.addEventListener(
  "drop",
  (e) => {
    // prevent default action (open as link for some elements)
    e.preventDefault();
    // move dragged elem to the selected drop target
    if (e.target.className === "dropzone") {
      e.target.style.background = "";
      dragged.parentNode.removeChild(dragged);
      e.target.appendChild(dragged);
    }
  },
  false
);
