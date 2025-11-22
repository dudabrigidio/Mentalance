import { useState, useContext } from "react";
import { Checkin, CheckinErro } from "../model/Checkin";
import {  checkinServiceSalvar, checkinServiceLer, checkinServiceAtualizar, checkinServiceApagar} from "../service/checkinService";
import { useNavigation } from "@react-navigation/native";
import { SalvarCkCallback, LerCkCallback, ApagarCkCallback, AtualizarCkCallback} from "../fetcher/checkinFetcher";
import { RootScreenNavigationProp } from "../navigation/navigationParams";
import { ContextoPrincipal } from "../contexto/contextoPrincipal";

interface CheckinControlHook {
    salvar : () => {};
    checkin : Checkin;
    setCheckin: ( checkin : Checkin) => {};
    handleUsuario :(txt: string, campo : string)=> {};
    mensagem :string;
}

const useCheckinControl = () => {
    const {idUsuario: idUsuarioContexto} = useContext(ContextoPrincipal);
    const [checkin, setCheckin] = useState<Checkin>({idCheckin: null,idUsuario: null,emocao : "",texto: "",analiseSentimento: "",respostaGerada: ""});
    const [checkinErro, setCheckinErro] = useState<CheckinErro>({});
    const [checkinLista, setCheckinLista] = useState<Checkin[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const [idCheckinAlterado, setIdCheckinAlterado] = useState<string | null>(null);
    const clearCheckin = () => {
        setCheckin({
            idCheckin: null,
            idUsuario: null,
            emocao : "",
            texto: "",
            analiseSentimento: "",
            respostaGerada: ""
        });
    }

    const navigation = useNavigation<RootScreenNavigationProp>();

    const salvarCheckinCallback : SalvarCkCallback = 
    async (success : boolean, msg: string, errosCampos?: CheckinErro, checkinRetornado?: Checkin ) => {
        if (success) {
            setMensagem("Checkin realizado com sucesso");
            
            if (checkinRetornado) {

                const checkinFinal = {
                    ...checkinRetornado,
                    emocao: checkinRetornado.emocao || checkin.emocao
                };
                console.log("Checkin final (preservando emoção):", checkinFinal.emocao);
                setCheckin(checkinFinal);
            } else {
                // Mantém os dados do checkin para exibir na tela
                console.log("Nenhum checkin retornado, mantendo dados locais");
                console.log("Emoção local:", checkin.emocao);
            }
            
        } else {
            setMensagem(msg);
            setCheckinErro( errosCampos ??{});
        }
        setSucesso(success);
        setLoading(false);
    }


    const atualizarCheckinCallback  : AtualizarCkCallback =
    async (success : boolean, msg: string, errosCampos ?: CheckinErro) => {
        if (success) {
            setMensagem("Checkin atualizado com sucesso");

            clearCheckin();

        } else {
            setMensagem(msg);
            setCheckinErro( errosCampos ??{});
            
        }
        setSucesso(success);
        setLoading(false);
    }

    const lerCheckinCallback : LerCkCallback =
    async (success : boolean, msg : string, lista?: Array<Checkin>) => {
        setSucesso(success);
        setMensagem(msg);
        if (lista) {
            setCheckinLista(lista);
            console.log("Lista de Checkins =>", lista);
        } 
        setLoading(false);
    }


    const apagarCheckinCallback : ApagarCkCallback =
    async (success: boolean, msg: string) => {
        setSucesso(success);
        if(success) {
            setMensagem("Checkin apagado com sucesso");
        }
        else {
            setMensagem(msg);
        }
        setLoading(false);
    }

    const salvarCheckin = () => {
        const checkinComIdUsuario = {
            ...checkin,
            idUsuario: idUsuarioContexto ? Number(idUsuarioContexto) : null
        };
        
        setLoading(true);
        setCheckinErro({});

        if (checkinComIdUsuario.idCheckin == null || String(checkinComIdUsuario.idCheckin) !== idCheckinAlterado ) {
            checkinServiceSalvar ( checkinComIdUsuario, salvarCheckinCallback);
        } else {
            checkinServiceAtualizar ( checkinComIdUsuario.idCheckin, checkinComIdUsuario, atualizarCheckinCallback );
        }
    }

    const lerCheckin = () => {
        setLoading(true);
            setCheckinErro({});
        checkinServiceLer(lerCheckinCallback);
    }

    const apagarCheckin = (id: string) => {
        setLoading(true);
        setCheckinErro({});
        checkinServiceApagar ( id, apagarCheckinCallback);
        navigation.navigate("Checkin", {screen: "CheckinLista"});

    }

    const atualizarCheckin = (id : string) => {
        console.log(id);
        setIdCheckinAlterado(id);
        console.log("idCheckinAlterado:", idCheckinAlterado);

        setCheckinErro({});
        const checkinFiltrados = checkinLista.filter(
            (c: Checkin)=> c.idCheckin == Number(id)
        );
        if (checkinFiltrados.length>0) {
            setCheckin(checkinFiltrados[0]);
            navigation.navigate("Checkin", {screen: "RealizarCheckin"});
        }
    }

    const handleCheckin = (txt: string, campo: string) => {
        console.log("handleCheckin chamado - campo:", campo, "valor:", txt);
        const obj = {...checkin};
        if (campo === "idCheckin"  || campo === "idUsuario") {

            if (txt.trim() === "") {
                obj[campo as keyof typeof obj] = null;
            } else {
                const numValue = parseInt(txt);
                obj[campo as keyof typeof obj] = isNaN(numValue) ? null : numValue;
            }
        } else {
            obj[campo as keyof typeof obj] = txt;
        }
        console.log("Checkin atualizado:", obj);
        setCheckin(obj);
    }


    const novoCheckin = () => {
        setSucesso(false);
        clearCheckin();
        setMensagem(null);
        setCheckinErro({});
    }

    return { loading, mensagem, sucesso, checkin, checkinErro, checkinLista, salvarCheckin, lerCheckin, apagarCheckin, atualizarCheckin, handleCheckin, novoCheckin};
}

export {useCheckinControl};