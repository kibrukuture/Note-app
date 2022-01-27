//we start by selecting elements from the dom
//
const msg = document.querySelector(".msg");
const title = document.querySelector(".title");
const create = document.querySelector(".create");
const aside = document.querySelector(".aside");
let messages = document.querySelector(".msgwrap");

//store data in big object
//we need msg , date,and title

const data = {
  // title, msg,title for each message
  // title:{  msg:'', date:"",}
};

let noteOnFocus = "";

//tldr: disable before creating note
title.addEventListener("keyup", (e) => {
  //take title from input
  //
  let current = "";
  Array.from(aside.children).forEach((element) => {
    if (element.getAttribute("id") === noteOnFocus) {
      current = element;
      return;
    }
  });
  current.children[0].children[0].innerText = e.target.value;

  //setting title when note is focused or when currently in a write mode
  data[noteOnFocus] = {
    msg: data[noteOnFocus].msg,
    date: data[noteOnFocus].date,
    title: e.target.value.trim(),
  };

  //check if the first note has empty title or title is not set

  e.target.value.trim()
    ? current.setAttribute("valid", "valid")
    : current.setAttribute("valid", "invalid");
});

//get message from text area and set it in the data;

msg.addEventListener("keyup", (e) => {
  //msg
  let current = "";
  Array.from(aside.children).forEach((element) => {
    if (element.getAttribute("id") === noteOnFocus) {
      current = element;
      return;
    }
  });
  //

  if (current.children[1].innerText.trim() === "") {
    current.children[1].innerText = "Empty";
  } else {
    current.children[1].innerText = e.target.value;
  }

  //store messge on data
  data[noteOnFocus] = {
    msg: e.target.value,
    date: data[noteOnFocus].date,
    title: data[noteOnFocus].title,
  };
});

//does not create multiple notes if the contents are empty
create.addEventListener("click", (e) => {
  //reset title input and text area to empty string
  title.value = "";
  msg.value = "";

  //elements
  const msgwrap = document.createElement("div");
  msgwrap.setAttribute("class", "msgwrap");
  noteOnFocus = Math.random().toString();
  msgwrap.setAttribute("id", noteOnFocus);
  msgwrap.setAttribute("valid", "invalid");

  //on click set up for this
  msgwrap.setAttribute("onclick", "handleMessage(event)");

  //title
  const ntitle = document.createElement("h3");
  ntitle.setAttribute("class", "msgtitle");
  ntitle.innerText = "new message";

  //note
  const note = document.createElement("p");
  note.setAttribute("class", "msgcontent");
  note.innerText = "empty";

  //date
  const date = document.createElement("p");
  date.setAttribute("class", "msgdate");
  const time = Date.now();
  const hour = new Date(time).getHours();
  const mins = new Date(time).getMinutes();

  //getting hour and minutes frm time
  date.innerText = hour + ":" + mins;

  //wrapper class for title and date
  const titledate = document.createElement("div");
  titledate.setAttribute("class", "titledate");
  titledate.appendChild(ntitle);
  titledate.appendChild(date);

  //add element with condition
  msgwrap.appendChild(titledate);
  msgwrap.appendChild(note);
  if (aside.children.length === 0) {
    aside.prepend(msgwrap);
    data[noteOnFocus] = { msg: "", date: time, title: "" };
  } else if (
    Array.from(aside.children)[0].getAttribute("valid") !== "invalid"
  ) {
    aside.prepend(msgwrap);
    data[noteOnFocus] = { msg: "", date: time, title: "" };
  }
  //append title and date element wrapper
  messages = document.getElementsByClassName("msgwrap");
});

//hanlde click on message

function handleMessage(event) {
  //what are those events
  noteOnFocus = event.currentTarget.id;
  title.value = data[noteOnFocus].title;
  msg.value = data[noteOnFocus].msg;
}
