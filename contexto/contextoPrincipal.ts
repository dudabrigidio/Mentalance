import { createContext } from "react";

interface ContextoPrincipalCorpo {
    token: string | undefined
    idUsuario: string | undefined
    emailProfile: string | null
    setProfile: (token : string | null, email : string | null, idUsuario: string | null) => void | Promise<void>
    clearProfile: () => void | Promise<void>

}

const corpoVazioContextoPrincipal : ContextoPrincipalCorpo = {
    token: undefined,
    idUsuario: undefined,
    emailProfile: null,
    setProfile: (token : string | null, email : string | null, idUsuario: string | null) => {},
    clearProfile: () => {}
}

const ContextoPrincipal = createContext(corpoVazioContextoPrincipal);

export {ContextoPrincipal, ContextoPrincipalCorpo, corpoVazioContextoPrincipal};