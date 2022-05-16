const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
// var audio = new Audio('../ting.wav')

// const cInput = document.querySelector(".check-box");
// console.log(cInput)

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}


// const appendcb = (username, id)=>{
//     const checkElement = document.createElement('input');
//     checkElement.type = 'checkbox';
//     checkElement.id = id;
//     checkElement.name = id;
//     cInput.append(checkElement);
//     const labelElement = document.createElement('label');
//     labelElement.for = id;
//     labelElement.innerText = username;
//     cInput.append(labelElement);
// }


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''

})

const username = prompt("Enter your name to join");
socket.emit('new-user-joined', username);

socket.on('user-joined', data =>{
    append(`${data.username} joined the chat`, 'right');
    // appendcb(data.username, data.id);
    // audio.play();
})

socket.on('receive', data =>{
    append(`${data.username}: ${data.message}`, 'left');
    // audio.play();
})

socket.on('left', username =>{
    append(`${username} left the chat`, 'left');
    // audio.play();
})