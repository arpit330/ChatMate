const socket = io('http://127.0.0.1:8000');

// import { io } from 'context/socket';
// const socket = io('http://localhost:3000');

const messageForm = document.getElementById("messsage-form");
const inputMessage = document.getElementById("message-txt");
const roomForm = document.getElementById("room-form");
const room = document.getElementById("room-name");
const messageContainer = document.querySelector(".chat-log");
// const messageContainer = document.querySelector(".message-container");
const room_name_tag = document.getElementById('Room_Name');


function displayMessage(message, position, author) {
    const div = document.createElement("div");
    div.classList.add("chat-log__item");

    if (position == "right")
        div.classList.add("chat-log__item--own");

    const authorDiv = document.createElement("h3");
    authorDiv.classList.add("chat-log__author");
    authorDiv.innerHTML = author + " ";

    const timeDiv = document.createElement("small");
    timeDiv.classList.add("message__time");
    let currentdate = new Date();
    var currentTime = currentdate.getHours() + ":" + currentdate.getMinutes();
    timeDiv.innerHTML = currentTime;

    authorDiv.append(timeDiv);

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-log__message");
    messageDiv.innerHTML = message;

    div.append(authorDiv);
    div.append(messageDiv);

    messageContainer.append(div);
}
let room_name = "None";
const name = prompt("Enter your name to join ");
socket.emit('new-user-joined', name);

// displayMessage(`your room id is ${socket.id}`,"right",name);
displayMessage(`Welcome, ${name}`, "left", "ChatMate");
socket.on("user-joined", name => {
    displayMessage(`${name} joined`, "left", name)
})

// socket.on('connect', () => {
//     displayMessage("user - jooined", "right", name);
// })


messageForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = inputMessage.value;
    console.log(message);

    socket.emit("message-send", message, name, room_name);
    displayMessage(message, "right", name);
    inputMessage.value = "";
});

socket.on("message-recieved", (message, author) => {
    displayMessage(message, "left", author)
    console.log("logsey");
});

roomForm.addEventListener("submit", e => {
    e.preventDefault();
    room_name = room.value;
    // console.log(room_name);
    socket.emit("join-room", room_name, name, message => {
        displayMessage(message, "right", name);
    })

    room_name_tag.innerHTML = "Room : " + room_name;
    room.value = "";
});

// socket.on('user-left', name => {
//     append(`${name} left the chat`, "left");
// });

























