import "./styles.css";

//id="add-button"のクリック時にclickButton関数を動かす
document
  .getElementById("add-button")
  .addEventListener("click", () => clickButton());

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
    //ダブルクリックで編集できるイベントを付与
    todo.children[0].addEventListener("dblclick", (event) => onDblClick(event));
  } else {
    alert("TODOを入力してください");
  }
};

//<div>タグの生成<p>の生成　=>　入力した内容を<p>タグに入れ<div>タグの子要素にして返却
const addTodo = (text) => {
  const div = document.createElement("div");
  div.className = "list-row";
  div.id = "drag-target";
  div.draggable = "true";
  const p = document.createElement("p");
  p.id = "todoText";
  p.innerText = text;
  div.appendChild(p);
  return div;
};

//ダブルクリックイベントの関数定義
const onDblClick = (event) => {
  //<p>タグ要素を消去して<textarea>タグ要素を追加
  const div = event.target.parentNode;
  const todoText = event.target.innerText;
  const editForm = document.createElement("textarea");
  editForm.value = todoText;
  editForm.id = "edit-zone";
  div.parentNode.appendChild(editForm);
  div.parentNode.removeChild(div);
  //編集して要素外をクリックすると編集が確定
  document
    .getElementById("edit-zone")
    .addEventListener("change", (event) => onEdit(event));
  //チェンジイベントの関数定義
  const onEdit = (event) => {
    const editText = event.target;
    const newDiv = addTodo(editText.value);
    editText.parentNode.appendChild(newDiv);
    editText.parentNode.removeChild(editText);
    //ダブルクリックイベント付与
    newDiv.children[0].addEventListener("dblclick", (event) =>
      onDblClick(event)
    );
  };
};

//ドラッグ＆ドロップ
//ドラッグターゲット用変数
let dragged;

//ドロップエリアの定義オブジェクト（分岐用）
const dropErea = {
  todoE: "todo-area dropzone",
  doingE: "doing-area dropzone",
  doneE: "done-area dropzone",
  delE: "title dropzone-d"
};
const { todoE, doingE, doneE, delE } = dropErea;

//ドラッグスタートしたときに発火
document.addEventListener(
  "dragstart",
  (event) => {
    // 移動する要素を変数に設定
    dragged = event.target;
    //ドラッグされる要素を半透明にする
    event.target.style.opacity = 0.5;
  },
  false
);

//ドラッグがドロップ可能なエリアに入ったときに発火
//ドロップエリアの背景カラーを変更
document.addEventListener(
  "dragenter",
  (event) => {
    //各エリアのルート分岐
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
//ドラッグ操作が終了した際に発火
document.addEventListener(
  "dragend",
  (event) => {
    //ドラッグした要素の半透明を初期化
    event.target.style.opacity = "";
  },
  false
);

//有効なドロップ先の上でドラッグしている状態で発火
document.addEventListener(
  "dragover",
  (event) => {
    //ブラウザのデフォルトの設定を無効化
    event.preventDefault();
  },
  false
);

//ドラッグ要素が有効なドロップ先から出た時に発火
document.addEventListener(
  "dragleave",
  (event) => {
    //背景カラーの初期化
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

//有効なドロップ先にドロップされた時に発火
document.addEventListener(
  "drop",
  (event) => {
    //デフォルトの設定を無効化
    event.preventDefault();
    //ドロップ先へ要素を移動させる処理
    let dropZone;
    const onDrop = () => {
      //背景カラーの初期化
      event.target.style.background = "";
      //ドラッグした要素をもとの場所から削除
      dragged.parentNode.removeChild(dragged);
      //ドロップで追加する場所を定義
      dropZone = event.target.children[1];
      //ドロップ先に追加
      dropZone.appendChild(dragged);
    };
    //ドロップ先のルート分岐処理
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
        //deleteエリアにドロップした際は要素を削除
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

//セーブ機能の実装途中
const seveData = () => {
  const lists = document.querySelectorAll("p");
  let todos = [];
  lists.forEach((p) => {
    todos.push({
      text: p.innerText
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};
