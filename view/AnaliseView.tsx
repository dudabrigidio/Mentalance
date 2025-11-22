// Tela de Análise
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image, Modal, ActivityIndicator} from 'react-native';
import { useAnaliseControl } from '../control/analiseControl';
import { StatusBar } from 'expo-status-bar';
import { cores, styles } from '../estilos/estilos';
import { Feather } from '@expo/vector-icons';

export default function AnaliseView() {

  const  {loading, mensagem, sucesso, gerarAnalise, analise, novaAnalise, analiseErro} = useAnaliseControl();

  return (
    <View style={styles.container}>
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

      {!sucesso && (
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
          <Image
            source={require('../assets/analise.png')}
            style={styles.imagem}
          />
          <Text style={[styles.titulo, {marginBottom: 20, marginTop: 20}]}>
            Entenda sua semana
          </Text>

          <Text style={[styles.texto, {fontSize: 16, marginHorizontal: 20, marginBottom: 10, textAlign: 'center'}]}>
            Nossa IA processa seus check-ins dos últimos 7 dias para gerar um resumo da
            semana, apontar a emoção predominante e oferecer uma sugestão baseada
            nos seus registros emocionais.
          </Text>
          
          <TouchableOpacity 
            onPress={gerarAnalise}
            style={[styles.botao, {width: "90%", marginTop: 30}]}
          >
            <Feather name="check-circle" size={20} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.botaoTexto}>
              Gerar análise semanal
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )} 

      {sucesso && (
        <ScrollView 
          contentContainerStyle={[
            styles.container2, 
            {
              flexGrow: 1, 
              alignItems: "center",
              paddingTop: 50,
              paddingBottom: 100
            }
          ]}
        >
          <Text style={[styles.titulo2, {fontSize:26, marginBottom: 10, paddingHorizontal:20}]}>
              ANÁLISE EMOCIONAL
          </Text>
          <Image
            source={require('../assets/analise.png')}
            style={styles.imagem}
          />

          {analise.semanaReferencia && (
            <View style={[styles.card, {width: "95%", marginTop: 20}]}>
              <Text style={[styles.titulo2, {marginBottom: 10}]}>
                Semana referência
              </Text>
              <Text style={[styles.texto, {fontSize: 16,  textAlign: 'center'}]}>
                {analise.semanaReferencia}
              </Text>
            </View>
          )}

          {analise.emocaoPredominante && (
            <View style={[styles.card, {width: "95%", marginTop: 20, flexDirection:"row"}]}>
              <Text style={[styles.titulo2]}>
                Você se sentiu mais:
              </Text>
              <Text style={[styles.texto, {fontSize: 18, color: cores.textoEscuro}]}>
                {analise.emocaoPredominante}
              </Text>
            </View>
          )}

          {analise.resumo && (
            <View style={[styles.card, {width: "95%", marginTop: 20}]}>
              <Text style={[styles.titulo2, {marginBottom: 10}]}>
                Resumo da sua semana:
              </Text>
              <Text style={[styles.texto, {fontSize: 16, lineHeight: 24}]}>
                {analise.resumo}
              </Text>
            </View>
          )}

          {analise.recomendacao && (
            <View style={[styles.card, {width: "95%", marginTop: 20}]}>
              <Text style={[styles.titulo2, {marginBottom: 15}]}>
                O que você pode fazer?
              </Text>
              <Text style={[styles.texto, {fontSize: 16, lineHeight: 24}]}>
                {analise.recomendacao}
              </Text>
            </View>
          )}

          <TouchableOpacity 
            onPress={novaAnalise}
            style={[styles.botao, {width: "90%", marginTop: 30}]}
          >
            <Feather name="refresh-cw" size={20} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.botaoTexto}>
              Nova Análise
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

