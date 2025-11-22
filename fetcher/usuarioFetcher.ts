import { Usuario, UsuarioErro } from "../model/Usuario";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://mentalance-api-app.azurewebsites.net/"
});


interface SalvarUsuarioCallback {
    (sucesso: boolean, mensagem: string, errosCampos?: UsuarioErro) : void;
}

interface LerUsuarioCallback {
    (sucesso: boolean, mensagem: string, usuario: Usuario | null) : void;
}

interface ApagarUsuarioCallback {
    (sucesso: boolean, mensagem: string) : void;
}

interface AtualizarUsuarioCallback {
    (sucesso: boolean, mensagem: string, errosCampos?: UsuarioErro) : void;
}


const usuarioFetcherSalvar = (
    usuario: Usuario, callback: SalvarUsuarioCallback): void => {
        console.log("=== POST USUARIO ===");
        console.log("Dados do usuário:", JSON.stringify(usuario, null, 2));
        
    apiBase
        .post("api/v1/Usuarios", usuario)
        .then(() => callback(true, ""))
        .catch((erro: any) => {
            console.error("Erro ao salvar usuário:", erro);
            const errorMessage = erro.response?.data?.message || 
                    erro.response?.data?.error || 
                    erro.message || 
                    "Erro interno do servidor";
            callback(false, errorMessage);
        });
    };

const usuarioFetcherApagar =
    (idUsuario : string, callback: ApagarUsuarioCallback) : void => {
        apiBase.delete( `api/v1/Usuarios/${idUsuario}`)
    .then(()=>callback(true, ""))
    .catch(( erro : any) => {
        console.error("Erro ao apagar usuário:", erro);
        const errorMessage = erro.response?.data?.message || 
            erro.response?.data?.error || 
            erro.message || 
            "Erro interno do servidor";
        callback(false, errorMessage);
    })
    }

const usuarioFetcherAtualizar =
    (idUsuario : string, usuario: Usuario, callback: AtualizarUsuarioCallback) : void => {
        console.log("=== PUT USUARIO ===");
        console.log("ID do usuário:", idUsuario);
        console.log("Dados do usuário:", JSON.stringify(usuario, null, 2));
        
        apiBase.put( `api/v1/Usuarios/${idUsuario}`, usuario)
    .then(()=>callback(true, ""))
    .catch(( erro : any) => {
        console.error("Erro ao atualizar usuário:", erro);
        const errorMessage = erro.response?.data?.message || 
            erro.response?.data?.error || 
            erro.message || 
            "Erro interno do servidor";
        callback(false, errorMessage);
    })
    }


const  usuarioFetcherLer = (idUsuario : string, callback : LerUsuarioCallback) : void => { 
    apiBase.get(`api/v1/Usuarios/${idUsuario}`)
    .then(( resposta : AxiosResponse<Usuario>)=>{
        callback(true, "", resposta.data);  
    })
    .catch((erro : any) => {
        console.error("Erro ao ler usuários:", erro);
        const errorMessage = erro.response?.data?.message || 
                erro.response?.data?.error || 
                erro.message || 
                "Erro interno do servidor";
        callback(false, errorMessage, null);
    })
}


export {SalvarUsuarioCallback, ApagarUsuarioCallback, AtualizarUsuarioCallback, LerUsuarioCallback, usuarioFetcherApagar, usuarioFetcherAtualizar, usuarioFetcherLer, usuarioFetcherSalvar}
