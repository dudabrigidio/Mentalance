import { FC } from 'react';
import {View, Text, TextInput, Modal, ActivityIndicator, TouchableOpacity, ScrollView, Image} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles, cores } from '../estilos/estilos';
import { useCheckinControl } from '../control/checkinControl';
import { StatusBar } from 'expo-status-bar';

interface CheckinViewProps {

}

const CheckinView: FC<CheckinViewProps> = ( props ) => {
    const  {loading, mensagem, sucesso, checkin, checkinErro, 
        salvarCheckin, handleCheckin, novoCheckin} = useCheckinControl();

    const emocoes = [
        { id: 1, titulo: "Feliz", img: require("../assets/feliz.png") },
        { id: 2, titulo: "Cansado", img: require("../assets/cansado.png") },
        { id: 3, titulo: "Ansioso", img: require("../assets/ansioso.png") },
        { id: 4, titulo: "Calmo", img: require("../assets/calmo.png") },
        { id: 5, titulo: "Estressado", img: require("../assets/estressado.png") },
    ];

    const obterImagemEmocao = (emocao: string) => {
        if (!emocao) return null;
        // Remove espaços e compara sem case sensitivity
        const emocaoLimpa = emocao.trim();
        const emocaoEncontrada = emocoes.find(e => 
            e.titulo.toLowerCase() === emocaoLimpa.toLowerCase()
        );
        if (emocaoEncontrada) {
            return emocaoEncontrada.img;
        }
        console.warn("Emoção não encontrada:", emocao);
        return null;
    }


    return(
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
                {!sucesso && (
                    <>

                    <Text style={[styles.titulo, {marginBottom: 20, marginTop: 50}]}>
                        Como você está se sentindo?
                    </Text>

                    
                    <View style={[styles.emocao, {marginBottom: 30}]}>
                        {emocoes.map((i) => (

                            <TouchableOpacity
                                key={i.id}
                                style={styles.item}
                                onPress={() => {
                                    console.log("Emoção selecionada:", i.titulo);
                                    handleCheckin(i.titulo, "emocao");
                                }}   
                            >
                                <Image
                                    source={i.img}
                                    style={[
                                        styles.image,
                                        checkin.emocao === i.titulo && styles.imageSelecionada
                                    ]}
                                />
                                <Text style={styles.text}>{i.titulo}</Text>
                            </TouchableOpacity>
                            
                        ))}

                    </View>

                    <Text style={[styles.texto, {fontSize: 18, marginBottom: 5, marginTop:10, fontWeight: 'bold'}]}>
                                Quer conversar?
                            </Text>
                            
                            {checkinErro.texto && (
                                <Text style={{color: "red", marginBottom: 5, fontSize: 14}}>
                                    {checkinErro.texto}
                                </Text>
                            )}
                            
                            <TextInput 
                                value={checkin.texto || ""} 
                                onChangeText={(txt : string) => handleCheckin(txt, "texto")} 
                                style={[
                                    styles.input, 
                                    {
                                        width: "90%", 
                                        minHeight: 100,
                                        textAlignVertical: 'top'
                                    }
                                ]} 
                                placeholder="Escreva como você está se sentindo hoje..."
                                multiline={true}
                                numberOfLines={4}
                            />

                        <TouchableOpacity 
                            onPress={salvarCheckin}
                            style={[styles.botao, {width: "90%", marginTop: 20}]}
                        >
                            <Feather name="check-circle" size={20} color="white" style={{ marginRight: 10 }} />
                            <Text style={[styles.botaoTexto]}>
                                Finalizar Checkin
                            </Text>
                        </TouchableOpacity>
                    </>

                )}


                {sucesso && (
                    <View style={{
                        width: "90%",
                        marginTop: 30,
                        backgroundColor: cores.rosaClaro3,
                        borderRadius: 12,
                        padding: 20,
                        borderWidth: 1,
                        borderColor: cores.rosaClaro2
                    }}>
                        <Text style={[styles.titulo, {fontSize: 20, marginBottom: 15}]}>
                            Emoção
                        </Text>
                        {checkin.emocao && obterImagemEmocao(checkin.emocao) && (
                            <View style={{alignItems: 'center', marginBottom: 10}}>
                                <Image
                                    source={obterImagemEmocao(checkin.emocao)}
                                    style={[styles.image, {width: 80, height: 80, opacity: 1}]}
                                />
                            </View>
                        )}
                        <Text style={[styles.texto, {fontSize: 16, lineHeight: 24, textAlign: 'center'}]}>
                            {checkin.emocao || "Nenhuma emoção selecionada"}
                        </Text>

                        <Text style={[styles.titulo, {fontSize: 20, marginBottom: 15, marginTop: 20}]}>
                            Como você se sente:
                        </Text>
                        <Text style={[styles.texto, {fontSize: 16, lineHeight: 24}]}>
                            {checkin.texto}
                        </Text>

                        {checkin.analiseSentimento && (
                            <>
                                <Text style={[styles.titulo, {fontSize: 20, marginBottom: 15, marginTop: 20}]}>
                                    Análise de Sentimento
                                </Text>
                                <Text style={[styles.texto, {fontSize: 16, lineHeight: 24}]}>
                                    {checkin.analiseSentimento}
                                </Text>
                            </>
                        )}

                        {checkin.respostaGerada && (
                            <>
                                <Text style={[styles.titulo, {fontSize: 20, marginBottom: 15, marginTop: 20}]}>
                                    Resposta Gerada
                                </Text>
                                <Text style={[styles.texto, {fontSize: 16, lineHeight: 24}]}>
                                    {checkin.respostaGerada}
                                </Text>
                            </>
                        )}

                        {!checkin.analiseSentimento && !checkin.respostaGerada && (
                            <Text style={[styles.texto, {fontSize: 16, lineHeight: 24, marginTop: 20, fontStyle: 'italic'}]}>
                                Processando análise e resposta...
                            </Text>
                        )}

                        <TouchableOpacity 
                            onPress={novoCheckin}
                            style={[styles.botao, {width: "90%", marginTop: 20}]}
                        >
                            <Feather name="check-circle" size={20} color="white" style={{ marginRight: 10 }} />
                            <Text style={[styles.botaoTexto]}>
                                Novo Checkin
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

            </ScrollView>
        </View>
    )
}

export {CheckinView};
