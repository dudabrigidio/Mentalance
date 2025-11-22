import { FC, useState, useEffect, useContext } from 'react';
import {View, Text, Modal, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import { useUsuarioControl } from '../control/usuarioControl';
import { styles, cores } from '../estilos/estilos';
import { Usuario } from '../model/Usuario';
import { Feather } from '@expo/vector-icons';
import { usePerfilControl } from '../control/perfilControl';
import { AlterarPerfilView } from './AlterarPerfil';
import { useAppControl } from '../control/appControl';
import { StatusBar } from 'expo-status-bar';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';



interface PerfilViewProps {

}

const PerfilView: FC<PerfilViewProps> = ( props) => {
    const {loading, mensagem, sucesso, 
        usuario, 
        lerUsuario, apagarUsuario, atualizarUsuario } = useUsuarioControl();
    const {logout} = usePerfilControl();
    const {idUsuario} = useAppControl();
    const {idUsuario: idUsuarioContexto} = useContext(ContextoPrincipal);
    const [modal, setModal] = useState<boolean>(false);
    const [modalApagar, setModalApagar] = useState<boolean>(false);
    const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
    const [atualizou, setAtualizou] = useState<boolean>(false);


    useEffect(() => {
        if (idUsuario) {
            lerUsuario(String(idUsuario));
        }
       
    }, [idUsuario]);


    return (
        <View style={[styles.container]}>
            <StatusBar style='auto'/>
            
            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator size="large" color={cores.rosaEscuro} />
                    {mensagem && (
                        <View style={{
                            backgroundColor: sucesso ? cores.rosaClaro3 : '#FFE4E1',
                            padding: 15,
                            borderRadius: 12,
                            marginTop: 20,
                            width: "90%"
                        }}>
                            <Text style={{
                                color: sucesso ? '#2E7D32' : '#C62828',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}>
                                {mensagem}
                            </Text>
                        </View>
                    )}
                </View>
            </Modal>

            <ScrollView 
                contentContainerStyle={[
                    styles.container2, 
                    {
                        flexGrow: 1, 
                        alignItems: "center", 
                        alignSelf: "stretch",
                        paddingTop: 50
                    }
                ]}
            >
                <Text style={[styles.titulo, {marginBottom: 30, marginTop: 20}]}>
                    Seu Perfil
                </Text>
            
                <View style={[styles.card, {width: "95%"}]}> 
                    <View style={{marginBottom: 15}}>
                        <Text style={[styles.titulo2, {marginBottom: 10}]}>
                            <Feather name="user" size={18} color={cores.textoEscuro} /> Informações Pessoais
                        </Text>
                    </View>

                    <View style={{marginBottom: 10, flexDirection: "row", gap:5}}>
                        <Text style={[styles.texto, {fontWeight: 'bold', marginBottom: 5}]}>Nome:</Text>
                        <Text style={[styles.texto, {fontSize: 16}]}>{usuario.nome || "Não informado"}</Text>
                    </View>

                    <View style={{marginBottom: 10, flexDirection: "row", gap:5}}>
                        <Text style={[styles.texto, {fontWeight: 'bold', marginBottom: 5}]}>E-mail:</Text>
                        <Text style={[styles.texto, {fontSize: 16}]}>{usuario.email || "Não informado"}</Text>
                    </View>

                    <View style={{marginBottom: 15, flexDirection: "row", gap:5}}>
                        <Text style={[styles.texto, {fontWeight: 'bold', marginBottom: 5}]}>Cargo:</Text>
                        <Text style={[styles.texto, {fontSize: 16}]}>{usuario.cargo || "Não informado"}</Text>
                    </View>

                    <TouchableOpacity 
                        onPress={()=> {
                            setUsuarioEditando(usuario);
                            setModal(true);
                        }}
                        style={[styles.botao, { marginTop: 10}]}
                    >
                        <Feather name="edit" size={20} color="white" style={{ marginRight: 10 }} />
                        <Text style={[styles.botaoTexto]}>Atualizar Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=> {
                            setModalApagar(true);
                        }}
                        style={[styles.botao, {backgroundColor: '#FF6B6B', marginTop: 10}]}
                    >
                        <Feather name="trash-2" size={20} color="white" style={{ marginRight: 10 }} />
                        <Text style={[styles.botaoTexto]}>Apagar Perfil</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    onPress={logout}
                    style={[styles.botao, {width: "95%", marginTop: 20, marginBottom: 30}]}
                >
                    <Feather name="log-out" size={20} color="white" />
                    <Text style={[styles.botaoTexto]}>Sair</Text>
                </TouchableOpacity>
            </ScrollView>
            

            <Modal visible={modal} transparent={true} animationType="slide">
                <View style={[styles.container2, {paddingTop: 50}]}>
                    <ScrollView>
                        <AlterarPerfilView  onUpdateStart={() => {setModal(false); setAtualizou(true);}}/>
                        <TouchableOpacity 
                            onPress={() => {
                                setModal(false);
                                setAtualizou(false);
                                setUsuarioEditando(null);
                            }}
                            style={[styles.botao, {width: "90%", marginTop: 20, marginBottom: 20}]}
                        >
                            <Text style={[styles.botaoTexto]}>Fechar</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>

            <Modal visible={modalApagar} transparent={true} animationType="fade">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style={[styles.card, {width: "85%", alignItems: 'center'}]}>
                        <Feather name="alert-triangle" size={48} color="#FF6B6B" style={{ marginBottom: 20 }} />
                        <Text style={[styles.titulo2, {marginBottom: 15, textAlign: 'center'}]}>
                            Tem certeza que deseja apagar o perfil?
                        </Text>
                        <Text style={[styles.texto, {marginBottom: 20, textAlign: 'center'}]}>
                            Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
                        </Text>

                        <TouchableOpacity 
                            onPress={()=>{
                                apagarUsuario(String(usuario.idUsuario));
                                setModalApagar(false);
                            }}
                            style={[styles.botao, {backgroundColor: '#FF6B6B', width: "100%", marginTop: 10}]}
                        >
                            <Feather name="trash-2" size={20} color="white" style={{ marginRight: 10 }} />
                            <Text style={[styles.botaoTexto]}>Sim, apagar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={()=>setModalApagar(false)}
                            style={[styles.botao, {width: "100%", marginTop: 10, marginBottom: 20

                            }]}
                        >
                            <Text style={[styles.botaoTexto]}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export { PerfilView};