// 為求方便，程式註解由AI生成，程式本體為我自行撰寫

exports.handler = async function (event, context) {
    // 只允許 POST 請求
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // 從前端請求的 body 中解析出 prompt
        const { prompt } = JSON.parse(event.body);
        const apiKey = process.env.GEMINI_API_KEY;

        if (!prompt || !apiKey) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing prompt or API key.' })
            };
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "contents": [{
                    "parts": [{ "text": prompt }]
                }],
                "generationConfig": {
                    "temperature": 0.7,
                    "topK": 40,
                    "topP": 0.95,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error:', errorData);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `Gemini API request failed: ${errorData.error.message}` })
            };
        }

        const data = await response.json();

        // 將 Gemini 的結果直接回傳給前端
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };

    } catch (error) {
        console.error('Function Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An internal server error occurred.' }),
        };
    }
};