let socket = null;

const form = document.querySelector('form');
const input = document.querySelector('input');
const messagesElem = document.querySelector('#messages');
const statusElem = document.querySelector('small');

function sendMessage(message) {
    socket?.send(message);
}

function renderMessage(message) {
    const li = document.createElement('li');
    li.innerHTML = message;
    messagesElem.prepend(li);
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = input.value;
    sendMessage(message);
    input.value = null;
})

function connectToServer() {
    socket = new WebSocket('ws://localhost:3000')

    socket.onopen = (event) => {
        statusElem.innerText = 'Online';
    }

    socket.onclose = (event) => {
        statusElem.innerText = 'Offline';
        setTimeout(() => {
            connectToServer();
        }, 1500);
    }

    socket.onmessage = (event) => {
        const { payload } = JSON.parse(event.data);
        renderMessage(payload)
    };
}

connectToServer();