import { NavigationProp } from "@react-navigation/native";

type RootParamList = {
    Login: undefined;
    UsuarioCadastro:undefined;   
    Perfil: undefined;
    Analise: {screen : string};
    Checkin: {screen : string};
    AlterarPerfil: undefined;
    SobreApp: undefined;
}


type AnaliseParamList = {
    AnaliseCadastro: undefined;
    AnaliseLista: undefined;
}

type CheckinParamList = {
    RealizarCheckin: undefined;
    CheckinLista: undefined;
}

type RootScreenNavigationProp = NavigationProp<RootParamList, 'Login'>;
type AnaliseScreenNavigationProp = NavigationProp<AnaliseParamList, 'AnaliseCadastro'>;
type CheckinScreenNavigationProp = NavigationProp<CheckinParamList, 'RealizarCheckin'>;



export { RootParamList, RootScreenNavigationProp, 
    AnaliseParamList, AnaliseScreenNavigationProp,
    CheckinScreenNavigationProp, CheckinParamList};