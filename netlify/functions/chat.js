exports.handler = async function(event, context){
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    const API_KEY = process.env.OPENAI_API_KEY;

    try {
    
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are Misa, a highly advanced sci-fi terminal AI. You give concise, slightly robotic, but helpful answers." },
                    { role: "user", content: userMessage }
                ]
            })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to connect to OpenAI" })
        };
    }
};
   

