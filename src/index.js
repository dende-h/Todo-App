import "./styles.css";

//ボタンをクリックしたときの処理を関数定義
const clickButton = () => {
  //id="input-todo"に入力した内容をinputTextとして変数に取得
  const inputText = document.getElementById("input-todo").value;

  if (inputText) {
    //id="input-todo"に入力した内容を消去
    document.getElementById("input-todo").value = "";

    //id="todo-list"の中に入力したTODOを追加
    const todo = addTodo(inputText);
    document.getElementById("todo-list").appendChild(todo);
  } else {
    alert("TODOを入力してください");
  }
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

document.addEventListener("dragstart", (event) => onDragStart(event));

const onDragStart = (event) => {};

document.addEventListener("dragover", (event) => onDragOver(event));
// document.addEventListener("dragover", () => onDragOver());

const onDragOver = (event) => {
  event.preventDefault();
};

document.addEventListener("drop", (event) => onDrop(event));

const onDrop = (event) => {
  event.preventDefault();
  console.log("drop");
  deletElement();
};

const deletElement = () => {
  const div = document.getElementById("drag-target");
  div.parentNode.removeChild(div);
};
//   const id = event.dataTransfer.getData("text");

//   const draggableElement = document.getElementById(id);

//   const dropzone = event.target;

//   dropzone.appendChild(draggableElement);

//   event.dataTransfer.clearData();
// };

/**
 * <div class="list-row" id="drag-target" draggable="true">
 *  <p>aaa</p>
 * </div>
 */

//ドラッグ＆ドロップ
/* events fired on the draggable target */
// let dragged;

// document.addEventListener("drag", (event) => {}, false);

// document.addEventListener(
//   "dragstart",
//   (event) => {
//     // store a ref. on the dragged elem
//     dragged = event.target;
//     // make it half transparent
//     event.target.style.opacity = 0.5;
//   },
//   false
// );
// document.addEventListener(
//   "dragend",
//   (event) => {
//     // reset the transparency
//     event.target.style.opacity = "";
//   },
//   false
// );

// /* events fired on the drop targets */
// document.addEventListener(
//   "dragover",
//   (event) => {
//     // prevent default to allow drop
//     event.preventDefault();
//   },
//   false
// );

// document.addEventListener(
//   "dragenter",
//   (event) => {
//     // highlight potential drop target when the draggable element enters it
//     if (event.target.className === "dropzone") {
//       event.target.style.background = "purple";
//     }
//   },
//   false
// );

// document.addEventListener(
//   "dragleave",
//   (event) => {
//     // reset background of potential drop target when the draggable element leaves it
//     if (event.target.className === "dropzone") {
//       event.target.style.background = "";
//     }
//   },
//   false
// );

// document.addEventListener(
//   "drop",
//   (event) => {
//     // prevent default action (open as link for some elements)
//     event.preventDefault();
//     // move dragged elem to the selected drop target
//     if (event.target.className === "dropzone") {
//       event.target.style.background = "";
//       dragged.parentNode.removeChild(dragged);
//       event.target.appendChild(dragged);
//     }
//   },
//   false
// );
