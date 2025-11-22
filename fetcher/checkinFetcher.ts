import { Checkin, CheckinErro } from "../model/Checkin";
import axios, { AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://mentalance-api-app.azurewebsites.net/"
});

interface SalvarCkCallback { 
    (sucesso : boolean, mensagem : string, errosCampos? : CheckinErro, checkinRetornado? : Checkin) : void;
}

interface LerCkCallback { 
    (sucesso : boolean, mensagem : string, lista? : Array<Checkin>) : void;
}

interface ApagarCkCallback { 
    (sucesso : boolean, mensagem : string) : void;
}

interface AtualizarCkCallback { 
    (sucesso : boolean, mensagem : string, errosCampos? : CheckinErro) : void;
}

const checkinFetcherSalvar =
    (checkin : Checkin, callback : SalvarCkCallback ) : void => {    
    apiBase.post( "api/v1/Checkins", checkin )
    .then((resposta : AxiosResponse<Checkin>)=>{
        console.log("Status:", resposta.status);
        console.log("Dados retornados:", JSON.stringify(resposta.data, null, 2));
        const checkinRetornado = resposta.data;
        callback(true, "", undefined, checkinRetornado);
    })
    .catch(( erro : any) => {

        const errorMessage = erro.response?.data?.message || 
                erro.response?.data?.error || 
                erro.response?.data?.title ||
                erro.message || 
                "Erro interno do servidor";
        console.error("Mensagem de erro:", errorMessage);
        callback(false, errorMessage);
    })
    }


const checkinFetcherApagar =
    (id : string, callback : ApagarCkCallback ) : void => {
    apiBase.delete( `api/v1/Checkins/${id}`)
    .then(()=>callback(true, ""))
    .catch(( erro : any) => {
        console.error("Erro ao apagar check-in:", erro);
        const errorMessage = erro.response?.data?.message || 
                erro.response?.data?.error || 
                erro.message || 
                "Erro interno do servidor";
        callback(false, errorMessage);
    })
    }

const checkinFetcherAtualizar =
    (id : string, checkin : Checkin, callback : AtualizarCkCallback ) : void => {
    console.log(id);
    apiBase.put( `api/v1/Checkins/${id}`, checkin )
    .then(()=>callback(true, ""))
    .catch(( erro : any) => {
        console.error("Erro ao atualizar check-in:", erro);
        const errorMessage = erro.response?.data?.message || 
                erro.response?.data?.error || 
                erro.message || 
                "Erro interno do servidor";
        callback(false, errorMessage);
    })
    }

const checkinFetcherLer = (callback : LerCkCallback) : void => { 
    apiBase.get("api/v1/Checkins")
    .then(( resposta : AxiosResponse<any, any>)=>{
        let listaCheckins: Checkin[] = [];
        
        // Verifica se a resposta é um array
        if (Array.isArray(resposta.data)) {
            listaCheckins = resposta.data;
        } else if (resposta.data && typeof resposta.data === 'object') {
            // Se for um objeto, converte para array
            for ( const chave in resposta.data ){  
                const objCheckin : Checkin = resposta.data[chave];
                listaCheckins.push( objCheckin );
            }
        }
        
        callback(true, `Foram lidos ${listaCheckins.length} Checkins`, listaCheckins);
    })
    .catch((erro : any) => {
        console.error("Erro ao ler check-ins:", erro);
        const errorMessage = erro.response?.data?.message || 
                erro.response?.data?.error || 
                erro.message || 
                "Erro interno do servidor";
        callback(false, errorMessage);
    })
}



export {checkinFetcherSalvar, checkinFetcherLer, 
    checkinFetcherApagar, checkinFetcherAtualizar,
    SalvarCkCallback, LerCkCallback, ApagarCkCallback, AtualizarCkCallback}; 