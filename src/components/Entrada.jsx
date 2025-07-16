import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextInput, Button, Spinner } from 'flowbite-react';
import { GiMagicLamp } from "react-icons/gi";
import oracleImage from '../assets/AdobeStock_334546874 [Convertido].svg';
import GlitterEffect from './GlitterEffect';
import DatabaseMethods from '../services/database.js';

function Entrada() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const db = new DatabaseMethods();

    // Hardcoded admin email for demo
    const ADMIN_EMAIL = 'arthwho@gmail.com';

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    const phrases = [
        "Pergunte ao Oráculo",
        "O que a sorte te diz hoje?",
        "Descubra o que o futuro reserva",
        "Que mistérios o destino revelará?",
        "Deixe o Oráculo iluminar seu caminho",
        "O que as estrelas têm a te dizer?",
        "Consulte a sabedoria ancestral",
        "Desvende os segredos do destino"
    ];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        setTitle(phrases[randomIndex]);
        // Get current user
        db.getCurrentUser().then(setCurrentUser);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponse("");
        setIsLoading(true);
        try {
            if (input.startsWith('\\s')) {
                // Special admin search
                if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
                    setResponse('Acesso negado: apenas administradores podem usar este comando.');
                } else {
                    // Extract the search query after '\s'
                    const searchQuery = input.substring(2).trim();
                    
                    if (!searchQuery) {
                        setResponse('Por favor, especifique uma query. Exemplos:\n' +
                                  '• list users\n' +
                                  '• find users Email == "user@example.com"\n' +
                                  '• order users Name asc\n' +
                                  '• limit users 5');
                    } else {
                        try {
                            const documents = await db.executeQuery(searchQuery);
                            if (documents.length > 0) {
                                const formattedDocs = documents.map((doc, index) => {
                                    const docData = Object.entries(doc)
                                        .filter(([key]) => key !== 'id')
                                        .map(([key, value]) => `  ${key}: ${value}`)
                                        .join('\n');
                                    return `📄 Documento ${index + 1} (ID: ${doc.id}):\n${docData}`;
                                }).join('\n\n');
                                setResponse(`✅ Resultados da query '${searchQuery}' (${documents.length} documento(s)):\n\n${formattedDocs}`);
                            } else {
                                setResponse(`❌ Nenhum resultado encontrado para a query '${searchQuery}'.`);
                            }
                        } catch (error) {
                            setResponse(`❌ Erro na query '${searchQuery}': ${error.message}`);
                        }
                    }
                }
            } else {
                const res = await fetch('/api/oracle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ input }),
                });
                if (!res.ok) throw new Error("API error");
                const data = await res.json();
                setResponse(data.response || "Sem resposta do Oráculo.");
            }
        } catch (err) {
            console.error('Error details:', err);
            setResponse("Erro ao consultar o Oráculo.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <GlitterEffect />
            <img 
                src={oracleImage} 
                alt="Oracle" 
                className="max-w-lg max-h-lg mx-auto m-8 [&>path]:fill-white"
            />
            <div className="container">
                <h1 className="bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-transparent bg-clip-text mb-8">{title}</h1>
                <div className="container bg-neutral-700 rounded-3xl mb-32">
                    <form className="flex items-center gap-4" onSubmit={handleSubmit}>
                        <div className="flex-1 relative">
                            <GiMagicLamp className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <TextInput 
                                type="text" 
                                placeholder="O que as entranhas do teu ser querem saber do oráculo?"
                                className="flex-1 pl-10"
                                style={{ 
                                    backgroundColor: 'var(--color-on-surface)', 
                                    borderColor: 'var(--color-on-surface)',
                                    color: 'white'
                                }}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <Button 
                            type="submit" 
                            gradientDuoTone="purpleToBlue" 
                            className="whitespace-nowrap min-w-[120px]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Spinner size="sm" color="white" />
                                    <span>Consultando...</span>
                                </div>
                            ) : (
                                "Perguntar"
                            )}
                        </Button>
                    </form>
                    {response && (
                        <div className="mt-4 text-neutral-50 p-4 rounded-b-3xl border-t-2 border-neutral-500 whitespace-pre-wrap">
                            {response}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Entrada;
