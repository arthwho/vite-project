import { useState } from "react";
import { Link } from "react-router-dom";
import { TextInput, Button } from 'flowbite-react';

function Entrada() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponse("");
        try {
            const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=API_KEY', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'API_KEY',
                },
                body: JSON.stringify({
                    contents: [
                        { parts: [{ text: input }] }
                    ]
                }),
            });
            if (!res.ok) throw new Error("API error");
            const data = await res.json();
            setResponse(data.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta do Oráculo.");
        } catch (err) {
            setResponse("Erro ao consultar o Oráculo.");
        }
    };

    return (
        <div className="container">
            <h1 className="text-neutral-50">Pergunte ao Oráculo</h1>
            <div className="container bg-neutral-700 rounded-lg">
                <form className="flex items-center gap-4" onSubmit={handleSubmit}>
                    <TextInput 
                        type="text" 
                        placeholder="Digite sua pergunta"
                        className="flex-1"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Button type="submit" gradientDuoTone="purpleToBlue" className="whitespace-nowrap">
                        Perguntar
                    </Button>
                </form>
                {response && (
                    <div className="mt-4 text-neutral-50 bg-neutral-800 p-4 rounded">
                        {response}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Entrada;
