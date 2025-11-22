import { useState, useContext } from "react";
import { Checkin, CheckinErro } from "../model/Checkin";
import {  checkinServiceSalvar, checkinServiceLer, checkinServiceAtualizar, checkinServiceApagar} from "../service/checkinService";
import { useNavigation } from "@react-navigation/native";
import { SalvarCkCallback, LerCkCallback, ApagarCkCallback, AtualizarCkCallback} from "../fetcher/checkinFetcher";
import { RootScreenNavigationProp } from "../navigation/navigationParams";
import { ContextoPrincipal } from "../contexto/contextoPrincipal";
import { Analise, AnaliseErro } from "../model/Analise";
import { GerarAnaliseCallback } from "../fetcher/analiseFetcher";
import { analiseServiceGerar } from "../service/analiseService";



const useAnaliseControl = () => {
    const {idUsuario: idUsuarioContexto} = useContext(ContextoPrincipal);
    const [analise, setAnalise] = useState<Analise>({idAnalise: null, idUsuario: null, semanaReferencia: "",emocaoPredominante: "",resumo: "",recomendacao: ""});
    const [analiseErro, setAnaliseErro] = useState<CheckinErro>({});
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);
    

    const navigation = useNavigation<RootScreenNavigationProp>();

    const gerarAnaliseCallback : GerarAnaliseCallback = 
    async (success : boolean, msg: string, errosCampos?: AnaliseErro, analiseRetornada?: Analise ) => {
        if (success) {
            setMensagem("Checkin realizado com sucesso");
            
            if (analiseRetornada) {
                console.log("Checkin completo:", JSON.stringify(analiseRetornada, null, 2));
                setAnalise(analiseRetornada);
            } 
        } else {
            setMensagem(msg);
            setAnaliseErro( errosCampos ??{});
        }
        setSucesso(success);
        setLoading(false);
    }


    const gerarAnalise = () => {
        if (!idUsuarioContexto) {
            setMensagem("Usuário não identificado. Faça login novamente.");
            setSucesso(false);
            setLoading(false);
            return;
        }
        
        setLoading(true);
        setAnaliseErro({});
    
        analiseServiceGerar(idUsuarioContexto, gerarAnaliseCallback);
        
    }

    const novaAnalise = () => {
        setSucesso(false);
        setMensagem(null);
        setAnaliseErro({});
    }

    return { loading, mensagem, sucesso, analise, gerarAnalise, novaAnalise, analiseErro};
}

export {useAnaliseControl};