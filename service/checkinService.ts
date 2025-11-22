import { Checkin, CheckinErro, checkinSchema } from "../model/Checkin";
import { checkinFetcherSalvar, checkinFetcherLer, 
    checkinFetcherApagar, checkinFetcherAtualizar,
    SalvarCkCallback, LerCkCallback, ApagarCkCallback, AtualizarCkCallback} from "../fetcher/checkinFetcher";
import { ValidationError } from "yup";

const checkinServiceSalvar = 
    ( checkin: Checkin, callback : SalvarCkCallback) : void => {
        checkinSchema.validate (checkin, {abortEarly: false})
        .then(()=>{
            checkinFetcherSalvar( checkin, callback);
        })
        .catch((errors : ValidationError)=> {
            const checkinErros: CheckinErro = {}
            if (errors.inner && errors.inner.length > 0) {
                errors.inner.forEach((err: ValidationError) => {
                    if (err.path) {
                        checkinErros[err.path as keyof CheckinErro] = err.message;
                    }
                });
            }
            else if (errors.path) {
                checkinErros[errors.path as keyof CheckinErro] = errors.message;
            }
            callback(false, errors.message, checkinErros);
        })
    }

const checkinServiceLer = 
    (callback: LerCkCallback) : void => {
        checkinFetcherLer(callback);
    }

const checkinServiceApagar = 
    (id: string, callback: ApagarCkCallback) : void => {
        checkinFetcherApagar(id, callback);
    }

const checkinServiceAtualizar = 
    (id: string, checkin: Checkin, callback: AtualizarCkCallback) : void => {
        checkinSchema.validate (checkin, {abortEarly: false})
        .then(()=>{
            checkinFetcherAtualizar(id, checkin, callback);
        })
        .catch((errors :ValidationError)=>{
            const checkinErros: CheckinErro = {}
            if (errors.inner && errors.inner.length > 0) {
                errors.inner.forEach((err: ValidationError) => {
                    if (err.path) {
                        checkinErros[err.path as keyof CheckinErro] = err.message;
                    }
                });
            }
            else if (errors.path) {
                checkinErros[errors.path as keyof CheckinErro] = errors.message;
            }
            callback(false, errors.message, checkinErros);
        })
    }

    export{ checkinServiceSalvar, checkinServiceLer, checkinServiceAtualizar, checkinServiceApagar}