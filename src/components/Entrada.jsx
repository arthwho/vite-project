import { Link } from "react-router-dom";

function Entrada() {
    return (
        <div className="container bg-yellow-500">
            <h1>Oráculo</h1>
            <form>
                <input 
                    type="text" 
                    placeholder="Digite sua pergunta" 
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                    Perguntar
                </button>
            </form>
            <Link to="/sobre">
                Clique aqui para saber mais sobre o Oráculo
            </Link>
        </div>
    );
}

export default Entrada;
