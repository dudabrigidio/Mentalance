import { useState, useContext } from 'react';
import { Usuario, UsuarioErro } from '../model/Usuario';
import { LogarCallback } from '../fetcher/loginFetcher';
import { loginServicoLogar} from '../service/loginService';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';
import { useNavigation } from '@react-navigation/native';
import { RootScreenNavigationProp } from '../navigation/navigationParams';

const useLoginControl = () => {
    const navigation = useNavigation<RootScreenNavigationProp>();
    const {token, emailProfile, idUsuario,  setProfile} = useContext(ContextoPrincipal);


    const [usuario, setUsuario] = useState<Usuario>({
        email: "", senha: ""
    });

    const [usuarioErro, setUsuarioErro] = useState<UsuarioErro>({});
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const handleLogin = (txt: string, campo : string) => {
        const obj = {...usuario};
        obj[campo as keyof typeof obj] = txt;
        setUsuario(obj);
    }

    const login = () => {
        setLoading(true); 
        const callback : LogarCallback =
        async (success: boolean, msg: string, errosCampos?: UsuarioErro, token?: string, idUsuario?: string) => {
            if ( success && token !== undefined && idUsuario !== undefined) {
                setProfile(token, usuario.email??null, idUsuario);
                setMensagem("Usuario logado com sucesso!");
                setSucesso(true);
                setLoading(false);
            } else {
                console.log(msg);
                setMensagem("Usuário ou senha inválidos");
                if (errosCampos){
                    setUsuarioErro( errosCampos);
                }
                setSucesso(false);
                setLoading(false);
            }
        }
        
        loginServicoLogar( usuario, callback);
    }

    const navigateCadastro = () => {
        navigation.navigate("UsuarioCadastro");
    }

    const navigateSobreApp = () => {
        navigation.navigate("SobreApp");
    }

    return { usuario, usuarioErro, token, emailProfile, idUsuario, handleLogin, login, navigateCadastro, navigateSobreApp, sucesso, mensagem, loading}
}

export {useLoginControl};