import { Usuario, UsuarioErro, Login } from "../model/Usuario";
import axios, { AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://mentalance-api-app.azurewebsites.net/"
});


interface LogarCallback {
    (sucesso : boolean, mensagem : string, errosCampos : UsuarioErro, token?: string, idUsuario?: string): void;
}

const loginFetcherLogar = 
    (usuario: Usuario, callback : LogarCallback) : void => {
        // Criando objeto Login com a estrutura exata que o backend espera
        const loginData: Login = {
            email: usuario.email,
            senha: usuario.senha
        };
        
        console.log("Dados de login enviados:", loginData);
        
        apiBase.post(`api/v1/Usuarios/Login`, loginData)
        .then(( response : AxiosResponse<any, any>)=> {
            const mensagem = response.data?.message || "Login realizado com sucesso";
            callback(true, mensagem, {}, response.data.idToken, response.data.idUsuario)
        })
        .catch((erro : any)=> {

            const errorMessage = erro.response?.data?.error || erro.response?.data?.message || erro.message || "Erro desconhecido";
            callback(false, errorMessage, {}, undefined, undefined)
        })
    }

export {LogarCallback, loginFetcherLogar}