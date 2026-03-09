const sendBtn = document.getElementById('send-btn');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message');

async function sendMessage(){
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

    let misaBubble = document.createElement("div");
    misaBubble.classList.add("message","misa-message");
    misaBubble.textContent = "Processing network request..."
    chatWindow.appendChild(misaBubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try{
        const response = await fetch("/.netlify/functions/chat",{
           method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text 
            })
        });


        const data = await response.json();

       if (data.choices && data.choices[0]) {
            misaBubble.textContent = data.choices[0].message.content;
        } else {
            misaBubble.textContent = "System Error: Invalid response from mainframe.";
        }

        chatWindow.scrollTop = chatWindow.scrollHeight;
    } catch (error){
        misaBubble.textContent = "Error: Connection to mainframe severed";
        console.error("JavaScript Error:", error);
    }

    
}
sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        sendMessage();
    }

});

