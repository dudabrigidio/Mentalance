import { useEffect, useState } from "react"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAppControl = () => {
    const [token, setToken] = useState<string | null | undefined>(undefined);
    const [tokenTela, setTokenTela]= useState<boolean>(false);
    const [emailProfile, setEmailProfile] = useState<string| null>(null);
    const [idUsuario, setIdUsuario] = useState<string| null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {setItem, getItem, removeItem} = useAsyncStorage("PERFIL");

    const setProfile = async (tokenValue: string | null , emailValue : string| null, idUsuarioValue : string| null) => {
        setToken(tokenValue);
        setEmailProfile(emailValue);
        setIdUsuario(idUsuarioValue);
        setTokenTela(true);

        await setItem( JSON.stringify({tokenValue, emailValue, idUsuarioValue}))
    }

    useEffect(
        () => {
            getItem()
            .then(async (dados: string | null)=> {
                if (dados !== null) {
                    const obj = JSON.parse(dados);
                    await setProfile(obj.tokenValue, obj.emailValue, obj.idUsuarioValue);
                    setTokenTela(true);
                    console.log(`email: ${obj.emailValue} profile definido`);
                } else {
                    setTokenTela(false);
                    console.log("Nenhum perfil encontrado no AsyncStorage");
                }
            })
            .catch(()=>{
                console.log("Erro ao carregar dados do AsyncStorage");
                setTokenTela(false);
            })
            .finally(()=>{
                setLoading(false);
            })
        }, 
        []
    )


    const clearProfile = async () => {
        setToken(null);
        setEmailProfile(null);
        setIdUsuario(null);
        setTokenTela(false);
        await removeItem();
    }

    const clearAllAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            setToken(null);
            setEmailProfile(null);
            setIdUsuario(null);
            setTokenTela(false);
            console.log("AsyncStorage completamente limpo");
        } catch (error) {
            console.error("Erro ao limpar AsyncStorage:", error);
        }
    }



    return { token, emailProfile, idUsuario, setProfile, loading, tokenTela, setTokenTela, clearProfile, clearAllAsyncStorage}

}

export {useAppControl};