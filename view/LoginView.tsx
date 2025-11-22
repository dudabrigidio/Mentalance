import {View, Text, TextInput, Button, Modal, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { useLoginControl } from '../control/loginControl';
import { styles, cores } from '../estilos/estilos';
import { Feather } from '@expo/vector-icons';

interface LoginProps { 

}

const LoginView : React.FC<LoginProps> = () => {
    const {usuario, handleLogin, login, sucesso, mensagem, loading, navigateCadastro, navigateSobreApp} = useLoginControl();
    
    return (
        <View style={[styles.container, { paddingTop: 40}]}>

            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator size="large" color={cores.rosaEscuro} />
                    <Text >Carregando...</Text>
                </View>
            </Modal>
            
            <View style={{flex: 1}}>
                {mensagem && (
                    <Text style={{
                        color: sucesso ? "green" : "red", 
                        fontSize: 18, 
                        margin: 10,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        {mensagem}
                    </Text>
                )}
                
                <Text style={[styles.titulo, {paddingBottom: 10}]}>Login</Text>

                <TextInput 
                    value={usuario.email} 
                    onChangeText={(txt)=>handleLogin(txt, "email")} 
                    style={[styles.input]} 
                    placeholder="E-mail"
                />
                <TextInput 
                    value={usuario.senha} 
                    onChangeText={(txt)=>handleLogin(txt, "senha")} 
                    style={[styles.input]} 
                    placeholder="Senha" 
                    secureTextEntry={true}
                />
                
                <TouchableOpacity 
                    onPress={login}
                    style={[styles.botao]}
                >
                    <Text style={[styles.botaoTexto]}>Entrar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={navigateCadastro}
                    style={[styles.botao]}
                >
                    <Text style={[styles.botaoTexto]}>Cadastrar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={navigateSobreApp}
                    style={[styles.botao, {backgroundColor: cores.rosaClaro, marginTop: 10 }]}
                >
                    <Feather name="info" size={20} color="white" style={{ marginRight: 10 }} />
                    <Text style={[styles.botaoTexto]}>Sobre o App</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20}}>
                <Image
                    source={require('../assets/mentalance.svg')}
                    style={styles.imagem}
                />
            </View>
        
        </View>
    )
}

export {LoginView};