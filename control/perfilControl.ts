import { useNavigation } from "@react-navigation/native";
import { useContext } from "react"
import { RootScreenNavigationProp } from "../navigation/navigationParams";
import { ContextoPrincipal } from "../contexto/contextoPrincipal";
import { useAppControl } from "./appControl";

const usePerfilControl = () => {
    const navigation = useNavigation<RootScreenNavigationProp>();
    const {token, emailProfile, setProfile, clearProfile} = useContext(ContextoPrincipal);
    const {setTokenTela} = useAppControl();
    

    const logout = () => {
        
        clearProfile();
        setTokenTela(false);
    }
    return {token, emailProfile, setProfile, logout};
}

export { usePerfilControl};