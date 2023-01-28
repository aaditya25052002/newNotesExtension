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
  button.style.left = `${e.pageX}px`;
  button.style.top = `${e.pageY}px`;
};

// events to handle the change in data

addEventListener("mouseup", (event) => {
  setTimeout(() => {
    let data = window.getSelection().toString();

    if (data) {
      displayButton(highlightbutton, event);
      displayButton(downloadbutton, event);
    } else {
      highlightbutton.style.display = "none";
      downloadbutton.style.display = "none";
    }
  }, 0);
});

// highlightbutton.addEventListener("click", () => {
//   // highlightbutton.style.display = "none";
//   let data = document.getSelection().toString();
//   console.log(data);
//   // let note = {
//   //   text: data,
//   //   timestamp: new Date().toString(),
//   // };
//   // document.cookie = "note=" + JSON.stringify(note);
//   document.body.innerHTML = document.body.innerHTML.replace(
//     data,
//     `<mark class="note">${data}</mark>`
//   );
//   console.log(data);
//   document.getSelection().empty();
//   // highlightbutton.style.display = "none";
// });

highlightbutton.addEventListener("click", () => {
  var sel = window.getSelection();
  var range = sel.getRangeAt(0);
  var selectedText = range.toString();
  var parentElement = range.startContainer.parentNode;

  let note = {
    text: sel,
    timestamp: new Date().toString(),
  };
  document.cookie = "note=" + JSON.stringify(note);

  var newHTML = parentElement.innerHTML.replace(
    selectedText,
    "<mark>" + selectedText + "</mark>"
  );
  console.log(parentElement);
  parentElement.innerHTML = newHTML;
});

downloadbutton.addEventListener("click", () => {
  let data = window.getSelection().toString();
  const stateString = data;
  // Create a new Blob with the state string
  const stateBlob = new Blob([stateString], { type: "text/plain" });
  // Create a download link and trigger the download
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(stateBlob);
  downloadLink.download = "yourNotes.txt";
  downloadLink.click();
  downloadbutton.style.display = "none";
});
