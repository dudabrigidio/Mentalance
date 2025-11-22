import { useContext, useState } from "react";
import { Usuario, UsuarioErro } from "../model/Usuario";
import { usuarioServiceSalvar, usuarioServiceLer, usuarioServiceAtualizar, usuarioServiceApagar } from "../service/usuarioService";
import { useNavigation } from "@react-navigation/native";
import { ApagarUsuarioCallback, AtualizarUsuarioCallback, LerUsuarioCallback, SalvarUsuarioCallback } from "../fetcher/usuarioFetcher";
import { RootScreenNavigationProp } from "../navigation/navigationParams";
import { usePerfilControl } from "./perfilControl";
import { ContextoPrincipal } from "../contexto/contextoPrincipal";
import { useAppControl } from "./appControl";

interface UsuarioControlHook {
    salvar : () => {};
    usuario : Usuario;
    setUsuario: ( usuario : Usuario) => {};
    handleUsuario :(txt: string, campo : string)=> {};
    mensagem :string;
}


const useUsuarioControl = () => {
    const {clearProfile, clearAllAsyncStorage} = useAppControl();
    const {idUsuario: idUsuarioContexto, token: tokenContexto, emailProfile, setProfile} = useContext(ContextoPrincipal);
    const [usuario, setUsuario] = useState<Usuario>({idUsuario: null, nome: "",senha: "",email: "", cargo: ""});
    const [usuarioErro, setUsuarioErro] = useState<UsuarioErro>({});
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const {token} = usePerfilControl();

    const navigation = useNavigation<RootScreenNavigationProp>();

    const salvarUsuarioCallback : SalvarUsuarioCallback = 
    async (success : boolean, msg: string, errosCampos?: UsuarioErro ) => {
        if (success) {
            setMensagem("Usuario Cadastrado com sucesso");
            navigation.navigate("Login");
            
        } else {
            setMensagem(msg);
            setUsuarioErro( errosCampos ??{});
        }
        setSucesso(success);
        setLoading(false);
    }


    const atualizarUsuarioCallback  : AtualizarUsuarioCallback =
    async (success : boolean, msg: string, errosCampos ?: UsuarioErro) => {
        if (success) {
            setMensagem("Usuario Atualizado com sucesso");
            // Atualizar AsyncStorage se o email foi alterado
            if (usuario.email && usuario.email !== emailProfile && tokenContexto && idUsuarioContexto) {
                await setProfile(tokenContexto, usuario.email, idUsuarioContexto);
                console.log("Email atualizado no AsyncStorage após atualização:", usuario.email);
            }
            // Usar idUsuarioContexto que está sempre disponível
            if (idUsuarioContexto) {
                await lerUsuario(String(idUsuarioContexto));
            }
        } else {
            setMensagem(msg);
            setUsuarioErro( errosCampos ??{});
        }
        setSucesso(success);
        setLoading(false);
    }

    const lerUsuarioCallback : LerUsuarioCallback =
    async (success : boolean, msg : string, usuario: Usuario | null) => {
        setSucesso(success);
        setMensagem(msg);
        if (usuario) {
            setUsuario (usuario);
            console.log("Usuario =>", usuario);
            
            // Atualizar AsyncStorage se o email foi alterado
            if (usuario.email && usuario.email !== emailProfile && tokenContexto && idUsuarioContexto) {
                await setProfile(tokenContexto, usuario.email, idUsuarioContexto);
                console.log("Email atualizado no AsyncStorage:", usuario.email);
            }
        }
        setLoading(false);
    }

    const apagarUsuarioCallback : ApagarUsuarioCallback =
    async (success: boolean, msg: string) => {
        setSucesso(success);
        if(success) {
            setMensagem("Usuario apagado com sucesso");
            navigation.navigate("Login");
        }
        else {
            setMensagem(msg);
        }
        setLoading(false);
    }

    const salvarUsuario = () => {
        setLoading(true);
        setUsuarioErro({});
        
        // Para POST (criação), remover o idUsuario completamente
        const { idUsuario, ...usuarioParaSalvar } = usuario;
        console.log("=== SALVAR USUARIO (POST) ===");
        console.log("Usuário original:", usuario);
        console.log("Usuário para salvar (sem idUsuario):", usuarioParaSalvar);
        
        usuarioServiceSalvar(usuarioParaSalvar, salvarUsuarioCallback, token);
    }

    const lerUsuario = (idUsuario: string) => {
        setLoading(true);
        setUsuarioErro({});
        usuarioServiceLer(idUsuario, lerUsuarioCallback);
    }

    const apagarUsuario = (idUsuario: string) => {
        setLoading(true);
        setUsuarioErro({});
        usuarioServiceApagar ( idUsuario, apagarUsuarioCallback);
        clearProfile();
        clearAllAsyncStorage();
        navigation.navigate("Login");
    }

    const atualizarUsuario = () => {
        setUsuarioErro({});
        lerUsuario(String(idUsuarioContexto));
        usuarioServiceAtualizar(String(idUsuarioContexto), usuario, atualizarUsuarioCallback);
    }

    const handleUsuario = (txt: string, campo: string) => {
        const obj = {...usuario};
        if (campo === "idUsuario") {
            // Se o campo estiver vazio, define como null
            if (txt.trim() === "") {
                obj.idUsuario = null;
            } else {
                // Converte para número
                const numValue = parseInt(txt);
                obj.idUsuario = isNaN(numValue) ? null : numValue;
            }
        } else if (campo === "nome" || campo === "senha" || campo === "email" || campo === "cargo") {
            // Apenas campos de string do modelo Usuario
            obj[campo as keyof typeof obj] = txt;
        }
        setUsuario(obj);
    }

    const navigateLogin = () => {
        navigation.navigate("Login");
    }

    return { loading, mensagem, sucesso, usuario, usuarioErro, salvarUsuario, lerUsuario, apagarUsuario, atualizarUsuario, handleUsuario, navigateLogin};
}

export {useUsuarioControl};