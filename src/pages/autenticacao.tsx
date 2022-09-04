import { useState } from "react";
import AuthInput from "../components/auth/Authinput";
import { WarnIcon } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Autenticacao() {

    const { cadastrar, login, loginGoogle } = useAuth();

    const [modo, setModo] = useState<'login' | 'cadastro'>('login');
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function submeter() {
        if (modo === 'login') {
            login(email, senha)
                .catch((e) => {
                    if(e.code === 'auth/wrong-password') {
                        exibirError('Senha inválida!')
                    } else if(e.code === 'auth/user-not-found') {
                        exibirError('Usuario não encontrado!')
                    } else if (e.code === 'auth/too-many-requests') {
                        exibirError('Usuario Temporariamente bloquiado, tente mais tarde!')
                    }
                })
        } else {
            cadastrar(email, senha)
                .catch((e) =>  {
                    if(e.code === 'auth/weak-password') {
                        exibirError('A senha deve ter no minimo 6 caracteres!')
                    }
                })
        }
    }

    function exibirError(msg, tempo = 5) {
        setError(msg);
        setTimeout(() => {
            setError(null)
        }, tempo * 1000);
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <img
                    src="https://source.unsplash.com/random"
                    alt="Imagem da tela de autenticacao"
                    className="h-screen w-full object-cover"
                />
            </div>
            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className="text-3xl font-bold mb-5">
                    {modo === 'login' ? 'Entre com a Sua Conta' : 'Cadastra-se na Plataforma'}
                </h1>

                {error ? (
                    <div className="flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg">
                        {WarnIcon}
                        <span className="ml-3">{error}</span>
                    </div>
                ) : false}

                <AuthInput
                    label="Email"
                    valor={email}
                    tipo="email"
                    valorMudou={setEmail}
                />
                <AuthInput
                    label="Senha"
                    valor={senha}
                    tipo="password"
                    valorMudou={setSenha}
                />
                <button onClick={submeter} className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6">
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                <button onClick={loginGoogle} className="w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3">
                    Entrar com o Google
                </button>

                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')}
                            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
                        > Crie uma conta gratuitamente
                        </a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Ja faz parte da nossa comunidade?
                        <a onClick={() => setModo('login')}
                            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
                        > Entre com a suas Credenciais
                        </a>
                    </p>
                )}
            </div>
        </div>
    )
}