import { Analise, AnaliseErro } from "../model/Analise";
import axios, { AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://mentalance-api-app.azurewebsites.net/"
});

interface GerarAnaliseCallback { 
    (sucesso : boolean, mensagem : string, errosCampos? : AnaliseErro, analiseRetornada? : Analise) : void;
}


const analiseFetcherSalvar =
    (idUsuario : string, callback : GerarAnaliseCallback ) : void => {
    
    apiBase.post( `api/v1/AnaliseSemanal?idUsuario=${idUsuario}` )
    .then((resposta : AxiosResponse<Analise>)=>{

        console.log("Status:", resposta.status);
        console.log("Dados retornados:", JSON.stringify(resposta.data, null, 2));
        const analiseRetornada = resposta.data;
        callback(true, "", undefined, analiseRetornada);
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




export {analiseFetcherSalvar, GerarAnaliseCallback}; 