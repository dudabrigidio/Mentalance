import { FC, ReactElement } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem, Image, TouchableOpacity, ScrollView} from 'react-native';
import { useUsuarioControl } from '../control/usuarioControl';
import { Usuario } from '../model/Usuario';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { styles, cores } from '../estilos/estilos';



interface UsuarioViewProps {

}

const CadastroUsuarioView: FC<UsuarioViewProps> = ( props) => {
    const {loading, usuario, usuarioErro, salvarUsuario, handleUsuario, navigateLogin} = useUsuarioControl();
    
    return (
        <View style={[styles.container, { justifyContent: 'space-between' }]}>
            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator size="large" color={cores.rosaEscuro} />
                    <Text>Carregando...</Text>
                </View>
            </Modal>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            
                <View style={{flex: 1}}>
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
                        onPress={salvarUsuario}
                        style={[styles.botao]}
                    >
                        <Text style={[styles.botaoTexto]}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={navigateLogin}
                        style={[styles.botao]}
                    >
                        <Text style={[styles.botaoTexto]}>Já tenho cadastro!</Text>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>

                <View style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20}}>
                    <Image
                        source={require('../assets/mentalance.svg')}
                        style={styles.imagem}
                    />
                </View>
                </View>
            
    )
}

export { CadastroUsuarioView};