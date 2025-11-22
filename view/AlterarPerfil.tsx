import { FC, ReactElement } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem, Image, TouchableOpacity} from 'react-native';
import { useUsuarioControl } from '../control/usuarioControl';
import { Usuario } from '../model/Usuario';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { styles, cores } from '../estilos/estilos';


interface UsuarioViewProps {
    onUpdateStart?: () => void;
}

const AlterarPerfilView: FC<UsuarioViewProps> = ( props) => {
    const {loading, mensagem, sucesso, 
        usuario, usuarioErro,
        salvarUsuario, handleUsuario, navigateLogin, atualizarUsuario} = useUsuarioControl();

    const handleAtualizar = () => {
        if (props.onUpdateStart) {
            props.onUpdateStart();
        }
        atualizarUsuario();
    };

    return (
        <View style={[styles.container2]}>
            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator size="large" color={cores.rosaEscuro} />
                </View>
            </Modal>
            <Text style={[styles.titulo, {paddingBottom: 10}]}>Alterar Perfil</Text>
            <Text style={{color: sucesso ? "green" : "red", 
                fontSize: 18}}>{mensagem}</Text>
                <Text style={{color: "red"}}>{usuarioErro.idUsuario}</Text>
                <Text style={{color: "red"}}>{usuarioErro.nome}</Text>
                <TextInput 
                    value={usuario.nome} 
                    onChangeText={(txt:string) => handleUsuario(txt, "nome")}  
                    style={[styles.input]} 
                    placeholder="Nome"
                />
                <Text style={{color: "red"}}>{usuarioErro.email}</Text>
                <TextInput 
                    value={usuario.email} 
                    onChangeText={(txt:string) => handleUsuario(txt, "email")}  
                    style={[styles.input]} 
                    placeholder="E-mail"
                />
                <Text style={{color: "red"}}>{usuarioErro.senha}</Text>
                <TextInput 
                    value={usuario.senha} 
                    onChangeText={(txt:string) => handleUsuario(txt, "senha")} 
                    style={[styles.input]} 
                    placeholder="Senha" 
                    secureTextEntry={true}
                />
                <Text style={{color: "red"}}>{usuarioErro.cargo}</Text>
                <TextInput 
                    value={usuario.cargo ? String(usuario.cargo) : ""} 
                    onChangeText={(txt:string) => handleUsuario(txt, "cargo")} 
                    style={[styles.input]} 
                    placeholder="Cargo"
                />


                <TouchableOpacity 
                        onPress={handleAtualizar}
                        style={[styles.botao, { marginTop: 10}]}
                    >
                        <Text style={[styles.botaoTexto]}>Atualizar Perfil</Text>
                </TouchableOpacity>
                
        </View>
    )
}

export { AlterarPerfilView};