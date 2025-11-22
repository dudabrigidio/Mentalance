import { Usuario, UsuarioErro, usuarioSchema } from "../model/Usuario";
import {SalvarUsuarioCallback, ApagarUsuarioCallback, AtualizarUsuarioCallback, LerUsuarioCallback, usuarioFetcherApagar, usuarioFetcherAtualizar, usuarioFetcherLer, usuarioFetcherSalvar} from "../fetcher/usuarioFetcher";
import { ValidationError } from "yup";

const usuarioServiceSalvar = 
    ( usuario: Usuario, callback : SalvarUsuarioCallback, token?: string) : void => {
        usuarioSchema.validate (usuario, {abortEarly: false})
        .then(()=>{
            usuarioFetcherSalvar( usuario, callback);
        })
        .catch((errors : ValidationError)=> {
            const usuarioErros: UsuarioErro = {}
            if (errors.inner && errors.inner.length > 0) {
                errors.inner.forEach((err: ValidationError) => {
                    if (err.path) {
                    usuarioErros[err.path as keyof UsuarioErro] = err.message;
                    } 
                });
            }
            else if (errors.path) {
                usuarioErros[errors.path as keyof UsuarioErro] = errors.message;
            }
            callback(false, errors.message, usuarioErros);
        })
    }

const usuarioServiceLer = 
    (id: string, callback: LerUsuarioCallback) : void => {
        usuarioFetcherLer(id, callback);
    }

const usuarioServiceApagar = 
    (id: string, callback: ApagarUsuarioCallback) : void => {
        usuarioFetcherApagar(id, callback);
    }

const usuarioServiceAtualizar = 
    (idUsuario: string, usuario: Usuario, callback: AtualizarUsuarioCallback) : void => {
        console.log("=== SERVICE ATUALIZAR USUARIO ===");
        console.log("ID:", idUsuario);
        console.log("Usuário para validação:", usuario);
        
        usuarioSchema.validate (usuario, {abortEarly: false})
        .then(()=>{
            console.log("Validação passou, chamando fetcher...");
            usuarioFetcherAtualizar(idUsuario, usuario, callback);
        })
        .catch((errors :ValidationError)=>{
            console.log("Erro de validação no PUT:", errors.message);
            console.log("Detalhes dos erros:", errors.inner);
            const usuarioErros: UsuarioErro = {}
            errors.inner.forEach( (err: ValidationError) => {
                usuarioErros[err.path as keyof typeof usuarioErros] = err.message;
            });
            callback(false, errors.message, usuarioErros);
        })
    }

    export{ usuarioServiceSalvar, usuarioServiceLer, usuarioServiceAtualizar, usuarioServiceApagar};