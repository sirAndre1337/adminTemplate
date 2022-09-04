import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import Usuario from "../../model/Usuario";
import Cookies from 'js-cookie';


interface AuthContextProps {
    usuario?: Usuario;
    loginGoogle?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFireBase: firebase.User): Promise<Usuario> {
    const token = await usuarioFireBase.getIdToken();
    return {
        uid: usuarioFireBase.uid,
        nome: usuarioFireBase.displayName,
        email: usuarioFireBase.email,
        token,
        provedor: usuarioFireBase.providerData[0].providerId,
        imagemUrl: usuarioFireBase.photoURL
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('admin-template-auth', logado, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-auth');
    }
}

export function AuthProvider(props) {

    const [carregando, setCarregando] = useState(true);
    const [usuario, setUsuario] = useState<Usuario>(null);

    async function configurarSessao(usuarioFirebase) {
        const usuario = await usuarioNormalizado(usuarioFirebase)
        if (usuarioFirebase?.email) {
            setUsuario(usuario);
            gerenciarCookie(true);
            setCarregando(false);
            return usuario.email;
        } else {
            gerenciarCookie(false);
            setUsuario(null);
            setCarregando(false);
            return false;
        }
    }

    async function loginGoogle() {
        const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )

        configurarSessao(resp.user);
        Router.push('/');
    }

    useEffect(() => {
        const cancelar = firebase.auth().onIdTokenChanged(configurarSessao);
        return () => cancelar();
    }, [])


    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;