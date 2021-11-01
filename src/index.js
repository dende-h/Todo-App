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

// document.addEventListener("dragstart", (event) => onDragStart(event));

// const onDragStart = (event) => {};

// document.addEventListener("dragover", (event) => onDragOver(event));
// // document.addEventListener("dragover", () => onDragOver());

// const onDragOver = (event) => {
//   event.preventDefault();
// };

// document.addEventListener("drop", (event) => onDrop(event));

// const onDrop = (event) => {
//   event.preventDefault();
//   console.log("drop");
//   deletElement();
// };

// const deletElement = () => {
//   const div = document.getElementById("drag-target");
//   div.parentNode.removeChild(div);
// };
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
let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", (event) => {}, false);

document.addEventListener(
  "dragstart",
  (event) => {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    console.log(dragged);
    event.target.style.opacity = 0.5;
    event.target.style.cursor = "grabbing";
  },
  false
);

document.addEventListener(
  "dragend",
  (event) => {
    // reset the transparency
    event.target.style.opacity = "";
    event.target.style.cursor = "";
  },
  false
);

/* events fired on the drop targets */
document.addEventListener(
  "dragover",
  (event) => {
    // prevent default to allow drop
    event.preventDefault();
    event.target.style.cursor = "";
  },
  false
);

document.addEventListener(
  "dragenter",
  (event) => {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className === "dropzone") {
      event.target.style.background = "purple";
    }
  },
  false
);

document.addEventListener(
  "dragleave",
  (event) => {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className === "doing-area dropzone") {
      event.target.style.cursor = "";
    }
  },
  false
);

document.addEventListener(
  "drop",
  (event) => {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    switch (event.target.className) {
      case "todo-area dropzone":
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        const dropZone0 = event.target.children[1];
        console.log(dropZone0);
        dropZone0.appendChild(dragged);
        break;
      case "doing-area dropzone":
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        const dropZone1 = event.target.children[1];
        console.log(dropZone1);
        dropZone1.appendChild(dragged);
        break;
      case "done-area dropzone":
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        const dropZone2 = event.target.children[1];
        console.log(dropZone2);
        dropZone2.appendChild(dragged);
        break;
      case "title dropzone-d":
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        break;
      default:
        break;
    }
  },
  false
);
