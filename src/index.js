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
  document
    .getElementById("todoText")
    .addEventListener("dblclick", (event) => onDblClick(event));
};

//id="add-button"のクリック時にclickButton関数を動かす
document
  .getElementById("add-button")
  .addEventListener("click", () => clickButton());

document
  .getElementById("todoText")
  .addEventListener("dblclick", (event) => onDblClick(event));

//<div>タグの生成<p>の生成　=>　入力した内容を<p>タグに入れ<div>タグの子要素にして返却
const addTodo = (text) => {
  const div = document.createElement("div");
  div.className = "list-row";
  div.id = "drag-target";
  div.draggable = "true";
  div.ondragstart = "event.dataTransfer.setData('text/plain',null)";
  const p = document.createElement("p");
  p.id = "todoText";
  p.innerText = text;
  div.appendChild(p);
  return div;
};

const onDblClick = (event) => {
  const editTarget = event.target;
  const div = editTarget.parentNode;
  const todoText = div.children[0].innerText;
  const edit = document.createElement("textarea");
  edit.value = todoText;
  edit.id = "edit-zone";
  div.parentNode.appendChild(edit);
  div.parentNode.removeChild(div);
  document
    .getElementById("edit-zone")
    .addEventListener("change", (event) => onEdit(event));
  const onEdit = (event) => {
    const editText = event.target;
    const newDiv = addTodo(editText.value);
    console.log(newDiv);
    editText.parentNode.appendChild(newDiv);
    editText.parentNode.removeChild(editText);
    document
      .getElementById("todoText")
      .addEventListener("dblclick", (event) => onDblClick(event));
  };
};

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
    event.target.style.opacity = 0.5;
  },
  false
);

document.addEventListener(
  "dragend",
  (event) => {
    // reset the transparency
    event.target.style.opacity = "";
  },
  false
);

/* events fired on the drop targets */
document.addEventListener(
  "dragover",
  (event) => {
    // prevent default to allow drop
    event.preventDefault();
  },
  false
);

document.addEventListener(
  "dragenter",
  (event) => {
    // highlight potential drop target when the draggable element enters it
    switch (event.target.className) {
      case todoE:
        event.target.style.background = "rgb(54, 255, 255)";
        break;
      case doingE:
        event.target.style.background = "rgb(252, 255, 85)";
        break;
      case doneE:
        event.target.style.background = "rgb(255, 111, 255";
        break;
      case delE:
        event.target.parentNode.style.background = "rgb(210, 154, 255)";
        event.target.style.background = "rgb(210, 154, 255)";
        break;
      default:
        break;
    }
  },
  false
);

document.addEventListener(
  "dragleave",
  (event) => {
    // reset background of potential drop target when the draggable element leaves it
    switch (event.target.className) {
      case todoE:
        event.target.style.background = "";
        break;
      case doingE:
        event.target.style.background = "";
        break;
      case doneE:
        event.target.style.background = "";
        break;
      case delE:
        event.target.parentNode.style.background = "";
        event.target.style.background = "";
        break;
      default:
        break;
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
    let dropZone;
    const onDrop = () => {
      event.target.style.background = "";
      dragged.parentNode.removeChild(dragged);
      dropZone = event.target.children[1];
      dropZone.appendChild(dragged);
    };
    switch (event.target.className) {
      case todoE:
        onDrop();
        break;
      case doingE:
        onDrop();
        break;
      case doneE:
        onDrop();
        break;
      case delE:
        event.target.style.background = "";
        event.target.parentNode.style.background = "";
        dragged.parentNode.removeChild(dragged);
        break;
      default:
        break;
    }
  },
  false
);
const dropErea = {
  todoE: "todo-area dropzone",
  doingE: "doing-area dropzone",
  doneE: "done-area dropzone",
  delE: "title dropzone-d"
};
const { todoE, doingE, doneE, delE } = dropErea;
