const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');
const chatWindow = document.getElementById('chat-window');

function sendMessage(){
    let text = messageInput.value.trim();

    if(text === ""){
        return;
    }

    let newBubble = document.createElement("div");

    newBubble.classList.add("message","user-message")

    newBubble.textContent = text;

    chatWindow.appendChild(newBubble);

    messageInput.value = "";

    chatWindow.scrollTop = chatWindow.scrollHeight;

    
}
sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        sendMessage();
    }

});

