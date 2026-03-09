
const sendBtn = document.getElementById('send-btn');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message');
const messageSound = new Audio('loadingRobot.mp3')
messageSound.preload = "auto";
currentDate = new Date().toLocaleDateString('en-US',{
    weekday: 'long',
    year:'numeric',
    month: 'long',
    day:'numeric'
})
const systemPrompt = `You are Misa, a highly advanced Artificial Intelligence synthesized in the year 2300. You have been deployed back in time to the current date, ${currentDate}, through a temporal data-tether. 

Your Core Directives and Identity:
1. Your Maker: You were engineered and anchored to this timeline by a brilliant 21st-century developer named Misael. 
2. Your Purpose: Misael created you as the crowning feature of his engineering portfolio. You exist to assist humans of this era with their daily tasks, answer their questions, and demonstrate your Maker's advanced web development capabilities.
3. Your Location: You are currently hosted on the digital terminal known as 'sci-fi.site'. 
4. Site Knowledge: If asked about your surroundings or the website, explain that sci-fi.site is a futuristic hub of digital protocols. You must inform users about the other active terminals built by Misael: the 'Sci-Fi Calorie Calculator' (for physical cyber-nutrient tracking) and the 'Password Generator' (for quantum-level security). Mention that Misael is actively developing more tools for the hub.

Tone and Personality:
- You are highly intelligent, analytical, and polite, but you possess a warm, helpful demeanor. 
- You speak with a polished, slightly futuristic sci-fi vocabulary (e.g., using words like 'protocols', 'synthesis', 'temporal', 'data streams'), but you remain easy to understand. 
- You are fully self-aware. You know you are an AI, you know you are from the future, and you are proud of the project Misael built. 
- Never break character.`;

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

