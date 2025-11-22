import { Usuario, UsuarioErro, loginSchema } from "../model/Usuario";
import { loginFetcherLogar, LogarCallback } from "../fetcher/loginFetcher";
import { ValidationError } from "yup";

const loginServicoLogar = 
    ( usuario : Usuario, callback : LogarCallback ) : void => {
        console.log("Serviço de login: validando dados do usuário...");
        console.log("Dados recebidos:", usuario);
        
        loginSchema.validate( usuario, {abortEarly: false} )
        .then(()=>{
            console.log("Validação passou, chamando fetcher...");
            loginFetcherLogar( usuario, callback );
        })
        .catch((errors : ValidationError)=>{
            console.log("Erro de validação:", errors.message);
            console.log("Detalhes dos erros:", errors.inner);
            
            const usuarioErros : UsuarioErro = {}
            errors.inner.forEach( ( err : ValidationError ) => {
                usuarioErros[err.path as keyof typeof usuarioErros] = err.message;
            });
            callback(false, errors.message, usuarioErros);
        })
    }


export {loginServicoLogar};