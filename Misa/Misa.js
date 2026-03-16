
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message');
    const messageSound = new Audio('loadingRobot.mp3')
    messageSound.preload = "auto";


    // AUTOMATED GREETING
    window.addEventListener('DOMContentLoaded', () =>{
        let greetingBubble = document.createElement("div");
        greetingBubble.classList.add("message", "misa-message");
        greetingBubble.textContent = "Misa Online. Hi, how can I help you?";
        chatWindow.appendChild(greetingBubble);
    });

    // CHAT ENGINE
    async function sendMessage(){
        let text = messageInput.value.trim();

        if(text === ""){
            return;
        }
        // USER MESSAGE
        let newBubble = document.createElement("div");
        newBubble.classList.add("message","user-message")
        newBubble.textContent = text;
        chatWindow.appendChild(newBubble);
        messageSound.currentTime = 0;
                messageSound.play().catch(error =>{
                    console.error("Broswer blocked the audio", error);
                });

        messageInput.value = "";

        chatWindow.scrollTop = chatWindow.scrollHeight;

        // THINKING ANIMATION
        let misaBubble = document.createElement("div");
        misaBubble.classList.add("message","misa-message");
        misaBubble.innerHTML= "<div class = 'typing-indicator'><span></span><span></span><span></span></div>";
        chatWindow.appendChild(misaBubble);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // FETCH RESPONSE
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
            // MISA REPLIES
        if (data.choices && data.choices[0]) {
                misaBubble.textContent = data.choices[0].message.content;
            } else {
                misaBubble.textContent = `Mystery package: ${JSON.stringify(data)}`;
                console.log("Unknown Server Response", data);
            }

            chatWindow.scrollTop = chatWindow.scrollHeight;
        } catch (error){
            misaBubble.textContent = "Error: Connection to mainframe severed";
            console.error("JavaScript Error:", error);
        }

        
    }
    // BUTTON EVENT LISTENER
    sendBtn.addEventListener("click", sendMessage);

    messageInput.addEventListener('keypress', function(event){
        if(event.key === 'Enter'){
            sendMessage();
        }

    });

