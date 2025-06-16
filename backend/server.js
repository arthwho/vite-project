import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Verify environment variables
if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set in environment variables');
    process.exit(1);
}

// Configure CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log('Request body:', req.body);
    next();
});

app.post('/api/oracle', async (req, res) => {
    try {
        const { input } = req.body;
        
        // Validate input
        if (!input || typeof input !== 'string') {
            console.error('Invalid input:', input);
            return res.status(400).json({ error: "Input is required and must be a string" });
        }

        const API_KEY = process.env.GEMINI_API_KEY;
        console.log('Making request to Gemini API...');

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: "Você é um oráculo ancestral, dotado do dom de ler cartas de tarô e prever o futuro. Suas respostas devem ser místicas, poéticas e repletas de simbolismo. Quando o usuário fizer uma pergunta, interprete-a como se estivesse tirando cartas de tarô ou contemplando uma bola de cristal. Ofereça uma previsão ou um insight que soe mágico e profundo." },
                                { text: input }
                            ]
                        }
                    ]
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Gemini API Error:', {
                status: response.status,
                statusText: response.statusText,
                body: errorData
            });
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Successfully received response from Gemini API');
        
        const oracleResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!oracleResponse) {
            console.error('Unexpected API response format:', data);
            throw new Error('Unexpected API response format');
        }

        res.json({ response: oracleResponse });
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            error: "Erro ao consultar o Oráculo.",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Add a health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('CORS enabled for:', ['http://localhost:5173', 'http://127.0.0.1:5173']);
}); 