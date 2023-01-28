// cookies to retrieve the data that was stored
window.onload = function () {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    let keyValue = c.split("=");
    if (keyValue[0] === "note") {
      let note = JSON.parse(keyValue[1]);
      let txt = note.text;
      document.body.innerHTML = document.body.innerHTML.replace(
        txt,
        `<mark class="note">${txt}</mark>`
      );
    }
  }
};

// button part

const highlightButton = () => {
  // Create the button element
  var btn = document.createElement("button");
  btn.innerHTML = "Highlight";

  // Add styling to the button
  btn.style.backgroundColor = "green";
  btn.style.borderRadius = "20px";
  btn.style.padding = "10px 20px";
  btn.style.color = "white";
  btn.style.cursor = "pointer";
  btn.style.display = "none";
  btn.style.top = "0px";
  btn.style.left = "0px";

  // Add hover effect to the button
  btn.onmouseover = function () {
    btn.style.backgroundColor = "lightgreen";
  };
  btn.onmouseout = function () {
    btn.style.backgroundColor = "green";
  };
  return btn;
};

const downloadButton = () => {
  // Create the button element
  var btn = document.createElement("button");
  btn.innerHTML = "Download";

  // Add styling to the button
  btn.style.backgroundColor = "blue";
  btn.style.borderRadius = "20px";
  btn.style.padding = "10px 20px";
  btn.style.color = "white";
  btn.style.cursor = "pointer";
  btn.style.display = "none";
  btn.style.top = "0px";
  btn.style.left = "0px";

  // Add hover effect to the button
  btn.onmouseover = function () {
    btn.style.backgroundColor = "lightblue";
  };
  btn.onmouseout = function () {
    btn.style.backgroundColor = "blue";
  };
  return btn;
};
let highlightbutton = highlightButton();
let downloadbutton = downloadButton();

document.body.appendChild(highlightbutton);
document.body.appendChild(downloadbutton);

const displayButton = (button, e) => {
  button.style.display = "block";
  button.style.left = e.clientX + "px";
  button.style.top = e.clientY + "px";
};

// events to handle the change in data

addEventListener("mouseup", handleMouseUp);

function handleMouseUp(event) {
  // Get the current text selection

  let data = document.getSelection().toString();

  if (data) {
    displayButton(highlightbutton, event);
    displayButton(downloadbutton, event);
  } else {
    highlightbutton.style.display = "none";
    downloadbutton.style.display = "none";
  }
}

highlightbutton.addEventListener("click", highlight);
downloadbutton.addEventListener("click", download);
//function to highlight the text

const highlight = () => {
  let data = document.getSelection().toString();
  let note = {
    text: data,
    timestamp: new Date().toString(),
  };
  document.cookie = "note=" + JSON.stringify(note);
  document.body.innerHTML = document.body.innerHTML.replace(
    data,
    `<mark class="note">${data}</mark>`
  );
  highlightbutton.style.display = "none";
};

const download = () => {
  let data = document.getSelection().toString();
  let a = document.createElement("a");
  a.href = "data:text/plain," + encodeURIComponent(data);
  a.download = "notes.txt";
  a.click();
};
