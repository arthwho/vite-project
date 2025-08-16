import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, Button, Card } from 'flowbite-react';
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { GiMagicLamp } from "react-icons/gi";
import AuthMethods from "../services/auth.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const auth = getAuth();
    const navigate = useNavigate();
    const authMethods = new AuthMethods();

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, redirect to Entrada
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (isSignUp) {
                await authMethods.signUpWithEmail(email, password, displayName);
            } else {
                await authMethods.signInWithEmail(email, password);
            }
            console.log("Authentication successful");
            // Navigation will be handled by the useEffect above
        } catch (error) {
            console.error("Authentication error:", error);
            setError(getErrorMessage(error.code));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError("");

        try {
            await authMethods.signInWithGoogle();
            console.log("Google sign-in successful");
            // Navigation will be handled by the useEffect above
        } catch (error) {
            console.error("Google sign-in error:", error);
            setError(getErrorMessage(error.code));
        } finally {
            setLoading(false);
        }
    };

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'Usuário não encontrado.';
            case 'auth/wrong-password':
                return 'Senha incorreta.';
            case 'auth/email-already-in-use':
                return 'Este email já está em uso.';
            case 'auth/weak-password':
                return 'A senha deve ter pelo menos 6 caracteres.';
            case 'auth/invalid-email':
                return 'Email inválido.';
            case 'auth/popup-closed-by-user':
                return 'Login cancelado pelo usuário.';
            default:
                return 'Erro na autenticação. Tente novamente.';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <div className="text-center mb-6">
                        <GiMagicLamp className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
                        <h1 className="text-2xl font-bold text-white mb-2">
                            {isSignUp ? "Criar Conta" : "Bem vindo ao Oráculo"}
                        </h1>
                        <p className="text-gray-300 text-sm">
                            {isSignUp ? "Junte-se ao mistério" : "Consulte a sabedoria ancestral!"}
                        </p>
                        <p className="text-gray-300 text-sm">
                            {isSignUp ? "Crie uma conta para começar a usar o Oráculo" : "Faça login para continuar"}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        {isSignUp && (
                            <TextInput
                                type="text"
                                placeholder="Nome completo"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required={isSignUp}
                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            />
                        )}
                        <TextInput
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        />
                        <TextInput
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        />
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            disabled={loading}
                        >
                            {loading ? "Carregando..." : (isSignUp ? "Criar Conta" : "Entrar")}
                        </Button>
                    </form>

                    <div className="my-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-transparent text-gray-300">ou</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={handleGoogleSignIn}
                        className="w-full bg-white text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        <FcGoogle className="h-5 w-5" />
                        {loading ? "Carregando..." : "Continuar com Google"}
                    </Button>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError("");
                                setDisplayName("");
                            }}
                            className="text-gray-300 hover:text-white text-sm underline"
                        >
                            {isSignUp ? "Já tem uma conta? Entrar" : "Não tem conta? Criar conta"}
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Login;