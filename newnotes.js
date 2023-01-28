const createButton = (name, icon) => {
  let btn = document.createElement("button");
  btn.innerHTML = `<i class="${icon}"></i> ${name}`;
  btn.style.position = "absolute";
  btn.style.top = "0px";
  btn.style.left = "0px";
  btn.style.background = "red";
  btn.style.zIndex = 10000;
  btn.style.margin = "0.5rem";
  btn.style.display = "none";
  btn.setAttribute("id", "name");
  return btn;
};

const showButton = (button, event) => {
  button.style.display = "block";
  button.style.left = `${event.pageX}px`;
  button.style.top = `${event.pageY}px`;
};

const addToDb = (note) => {
  db.transaction(
    (tx) => {
      tx.executeSql("create table if not exists notes(note text)");
      tx.executeSql("insert into notes values(?)", [note]);
    },
    (e) => {
      console.log(e);
    }
  );
};

const deleteFromDb = (note) => {
  db.transaction(
    (tx) => {
      tx.executeSql("delete from notes where note=?", [note]);
    },
    (e) => {
      console.log(e);
    }
  );
};

var currentMark = null;

let link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute(
  "href",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
);
document.head.appendChild(link);

let btn = createButton("add note", "fa fa-plus");
let btnDel = createButton("delete note", "fa fa-trash");
var db = openDatabase("notesDB", "1.0", "simple notes", 2 * 1024 * 1024);

document.body.appendChild(btn);
document.body.appendChild(btnDel);

addEventListener("mouseup", (event) => {
  setTimeout(() => {
    let txt = document.getSelection().toString();
    if (txt) {
      showButton(btn, event);
      btnDel.style.display = "none";
    } else if (event.target.className == "note") {
      currentMark = event.target;
      showButton(btnDel, event);
      btn.style.display = "none";
    } else {
      btn.style.display = "none";
      btnDel.style.display = "none";
    }
  }, 0);
});

btn.addEventListener("click", (e) => {
  btn.style.display = "none";
  let txt = document.getSelection().toString();
  let elem = document.getSelection().focusNode.parentElement;

  // let range = document.getSelection().getRangeAt(0);

  let elemTxt = elem.innerHTML;

  // let txtBefore = elemTxt.slice(0, range.startOffset);
  // let mc = txt.matchAll("<mark>");
  // console.log(mc);

  // txt = elemTxt.slice(range.startOffset, range.endOffset);

  // elemTxt =
  //     elemTxt.slice(0, range.startOffset) +
  //     "<mark>" +
  //     elemTxt.slice(range.startOffset, range.endOffset) +
  //     "</mark>" +
  //     elemTxt.slice(range.endOffset, elemTxt.length);
  // elem.innerHTML = elemTxt;

  elemTxt = elemTxt.replace(/(\r\n|\n|\r)/gm, "");
  elemTxt = elemTxt.replace(/\s{2,}/g, " ");
  // elemTxt = elemTxt.trim();
  // elem.innerHTML = elemTxt.replace(txt, `<mark class="note">${txt}</mark>`);

  let mark = document.createElement("mark");
  mark.setAttribute("class", "note");
  mark.innerHTML = txt;
  elem.innerHTML = elemTxt.replace(txt, mark.outerHTML);

  addToDb(txt);

  document.getSelection().empty();
});

btnDel.addEventListener("click", (delEvent) => {
  let note = currentMark;
  let parent = note.parentElement;
  deleteFromDb(note.innerHTML);
  parent.innerHTML = parent.innerHTML.replace(note.outerHTML, note.innerHTML);
  btnDel.style.display = "none";
});
