import { ValidationError } from "yup";
import { analiseFetcherSalvar, GerarAnaliseCallback } from "../fetcher/analiseFetcher";
import { Analise, AnaliseErro, idUsuarioSchema } from "../model/Analise";

const analiseServiceGerar = 
    ( idUsuario: string, callback : GerarAnaliseCallback) : void => {
        idUsuarioSchema.validate (idUsuario, {abortEarly: false})
        .then(()=>{
            analiseFetcherSalvar( idUsuario, callback);
        })
        .catch((errors : ValidationError)=> {
            const analiseErros: AnaliseErro = {}
            if (errors.inner && errors.inner.length > 0) {
                errors.inner.forEach((err: ValidationError) => {
                    if (err.path) {
                        analiseErros[err.path as keyof AnaliseErro] = err.message;
                    }
                });
            }
            else if (errors.path) {
                analiseErros[errors.path as keyof AnaliseErro] = errors.message;
            }
            callback(false, errors.message, analiseErros);
        })
    }


    export{ analiseServiceGerar}