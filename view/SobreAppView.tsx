import { FC } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles, cores } from '../estilos/estilos';
import { Feather } from '@expo/vector-icons';
import { gitInfo } from '../utils/gitInfo';

interface SobreAppViewProps {

}

const SobreAppView: FC<SobreAppViewProps> = () => {

    return (
        <View style={[styles.container]}>
            <ScrollView>
                
                <Text style={[styles.titulo, { marginTop: 50}]}>
                    SOBRE O MENTALANCE
                </Text>

                <View style={[styles.card,{flex: 1, padding: 20, marginTop: 30}]}>
                    <Text style={[styles.texto]}>
                        O Mentalance é um aplicativo desenvolvido para ajudar você a monitorar e entender melhor suas emoções ao longo do tempo. Através de check-ins diários e análises semanais, você pode acompanhar seu bem-estar emocional e receber insights valiosos sobre seus padrões emocionais.
                    </Text>
                </View>

                  <View style={[styles.card, {gap: 5}]}>
                    <Text style={[styles.titulo2, { marginBottom: 10 }]}>
                        <Feather name="info" size={18} color={cores.textoEscuro} /> Informações
                    </Text>
                    
                    <Text style={[styles.texto]}>
                        <Text style={{ fontWeight: 'bold' }}>Versão:</Text> 1.0.0
                    </Text>
                    
                    <Text style={[styles.texto]}>
                        <Text style={{ fontWeight: 'bold' }}>Commit:</Text> {gitInfo.commitHash}
                    </Text>
                    
                    <Text style={[styles.texto]}>
                        <Text style={{ fontWeight: 'bold' }}>Branch:</Text> {gitInfo.branch}
                    </Text>
                    
                    <Text style={[styles.texto]}>
                        <Text style={{ fontWeight: 'bold' }}>Data do Commit:</Text> {gitInfo.lastCommitDate}
                    </Text>
                    
                    <Text style={[styles.texto, { marginBottom: 5 }]}>
                        <Text style={{ fontWeight: 'bold' }}>Ano:</Text> 2025
                    </Text>
                </View>

                <View style={[styles.card, {gap: 5}]}>
                    <Text style={[styles.titulo2, { marginBottom: 10 }]}>
                        <Feather name="users" size={18} color={cores.textoEscuro} /> Desenvolvedores
                    </Text>
                    
                    <View style={{ marginBottom: 5, gap: 5 }}>
                        <Text style={[styles.texto, { marginBottom: 5 }]}> • André Luís Mesquita de Abreu - RM558159</Text>
                        <Text style={[styles.texto, { marginBottom: 5 }]}> • Maria Eduarda Brigidio - RM558575</Text>
                        <Text style={[styles.texto, { marginBottom: 5 }]}> • Rafael Bompadre Lima - RM556459</Text>
                    </View>
                </View>

                <View style={[styles.card]}>
                    <Text style={[styles.titulo2, { marginBottom: 10 }]}>
                        <Feather name="check-circle" size={18} color={cores.textoEscuro} /> Funcionalidades
                    </Text>
                    
                    <Text style={[styles.texto, { marginBottom: 5 }]}>
                        • Registro diário de emoções
                    </Text>
                    <Text style={[styles.texto, { marginBottom: 5 }]}>
                        • Análise semanal com IA para entender padrões emocionais
                    </Text>
                    <Text style={[styles.texto, { marginBottom: 5 }]}>
                        • Identificação da emoção predominante da semana
                    </Text>

                    <Text style={[styles.texto, { marginBottom: 5 }]}>
                        • Recomendações personalizadas com base em check-ins e análises
                    </Text>
                    <Text style={[styles.texto, { marginBottom: 5 }]}>
                        • Perfil personalizado com informações
                    </Text>
                </View>


                <Text style={[
                    styles.texto, 
                    { 
                        fontSize: 12, 
                        textAlign: 'center',
                        marginTop: 20,
                        opacity: 0.7
                    }
                ]}>
                    © 2025 Mentalance. Todos os direitos reservados.
                </Text>
            </ScrollView>
        </View>
    );
}

export { SobreAppView };
