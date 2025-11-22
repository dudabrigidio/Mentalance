import { FC } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { styles, cores } from '../estilos/estilos';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

interface LeiturasViewProps {

}

interface SiteAutoajuda {
    nome: string;
    url: string;
    descricao: string;
    icone: string;
}

const LeiturasView: FC<LeiturasViewProps> = () => {

    const sitesAutoajuda: SiteAutoajuda[] = [
        {
            nome: "Psicologia Viva",
            url: "https://www.psicologiaviva.com.br",
            descricao: "Artigos e conteúdos sobre saúde mental e bem-estar",
            icone: "book-open"
        },
        {
            nome: "Vida Mental",
            url: "https://www.vidamental.com.br",
            descricao: "Portal com informações sobre saúde mental e autocuidado",
            icone: "heart"
        },
        {
            nome: "Minha Vida - Saúde Mental",
            url: "https://www.minhavida.com.br/saude/temas/saude-mental",
            descricao: "Conteúdos sobre saúde mental, ansiedade e depressão",
            icone: "activity"
        },
        {
            nome: "CVV - Centro de Valorização da Vida",
            url: "https://www.cvv.org.br",
            descricao: "Apoio emocional e prevenção do suicídio",
            icone: "phone-call"
        },
        {
            nome: "Zenklub",
            url: "https://zenklub.com.br/blog",
            descricao: "Blog com artigos sobre psicologia e bem-estar emocional",
            icone: "sun"
        },
        {
            nome: "Psicologia Brasil",
            url: "https://www.psicologia.org.br",
            descricao: "Portal com informações sobre psicologia e saúde mental",
            icone: "brain"
        },
        {
            nome: "Mente e Cérebro",
            url: "https://www.megacurioso.com.br/mente-e-cerebro",
            descricao: "Artigos sobre neurociência e comportamento humano",
            icone: "eye"
        },
        {
            nome: "Instituto de Psicologia USP",
            url: "https://www.ip.usp.br",
            descricao: "Conteúdos científicos sobre psicologia e saúde mental",
            icone: "book"
        }
    ];

    const abrirLink = (url: string) => {
        Linking.openURL(url).catch(err => console.error('Erro ao abrir link:', err));
    };

    return (
        <View style={[styles.container]}>
            <StatusBar style='auto'/>
            <ScrollView 
                contentContainerStyle={[
                    styles.container2, 
                    {
                        flexGrow: 1, 
                        paddingTop: 30,
                        paddingBottom: 30
                    }
                ]}
            >
                <Text style={[styles.titulo, {marginBottom: 30, marginTop: 20}]}>
                    Leituras e Inspirações
                </Text>

                {/* Seção de Frases Inspiradoras */}
                <View style={[styles.card, {width: "95%", marginBottom: 20}]}>
                    <Text style={[styles.titulo2, {marginBottom: 20}]}>
                        <Feather name="message-circle" size={18} color={cores.textoEscuro} /> Frases Inspiradoras
                    </Text>
                    
                    <View style={{
                        backgroundColor: cores.branco,
                        borderRadius: 12,
                        padding: 20,
                        borderWidth: 1,
                        borderColor: cores.rosaClaro2
                    }}>
                        <Text style={[styles.texto, {
                            fontSize: 16,
                            fontStyle: 'italic',
                            textAlign: 'center',
                            color: cores.textoEscuro,
                            lineHeight: 24
                        }]}>
                            "Você é mais forte do que imagina e mais corajoso do que acredita."
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: cores.branco,
                        borderRadius: 12,
                        padding: 20,
                        borderWidth: 1,
                        borderColor: cores.rosaClaro2
                    }}>
                        <Text style={[styles.texto, {
                            fontSize: 16,
                            fontStyle: 'italic',
                            textAlign: 'center',
                            color: cores.textoEscuro,
                            lineHeight: 24
                        }]}>
                            "Cada novo dia é uma oportunidade de recomeçar e ser melhor."
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: cores.branco,
                        borderRadius: 12,
                        padding: 20,
                        borderWidth: 1,
                        borderColor: cores.rosaClaro2
                    }}>
                        <Text style={[styles.texto, {
                            fontSize: 16,
                            fontStyle: 'italic',
                            textAlign: 'center',
                            color: cores.textoEscuro,
                            lineHeight: 24,
                        }]}>
                            "Suas emoções são válidas. Permita-se senti-las completamente."
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: cores.branco,
                        borderRadius: 12,
                        padding: 20,
                        borderWidth: 1,
                        borderColor: cores.rosaClaro2
                    }}>
                        <Text style={[styles.texto, {
                            fontSize: 16,
                            fontStyle: 'italic',
                            textAlign: 'center',
                            color: cores.textoEscuro,
                            lineHeight: 24
                        }]}>
                            "O autocuidado não é egoísmo, é uma necessidade."
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: cores.branco,
                        borderRadius: 12,
                        padding: 20,
                        marginBottom: 15,
                        borderWidth: 1,
                        borderColor: cores.rosaClaro2
                    }}>
                        <Text style={[styles.texto, {
                            fontSize: 16,
                            fontStyle: 'italic',
                            textAlign: 'center',
                            color: cores.textoEscuro,
                            lineHeight: 24
                        }]}>
                            "Você não precisa ser perfeito para ser incrível."
                        </Text>
                    </View>
                </View>

                {/* Seção de Sites de Autoajuda */}
                <View style={[styles.card, {width: "95%", marginBottom: 20}]}>
                    <Text style={[styles.titulo2, {marginBottom: 20}]}>
                        <Feather name="globe" size={18} color={cores.textoEscuro} /> Sites de Autoajuda
                    </Text>
                    <Text style={[styles.texto, {marginBottom: 15, fontSize: 14}]}>
                        Explore estes recursos para aprender mais sobre saúde mental e bem-estar:
                    </Text>

                    {sitesAutoajuda.map((site, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => abrirLink(site.url)}
                            style={{
                                backgroundColor: cores.branco,
                                borderRadius: 12,
                                padding: 15,
                                marginBottom: 12,
                                borderWidth: 1.5,
                                borderColor: cores.rosaClaro2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                shadowColor: cores.rosaClaro,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 3,
                                elevation: 2
                            }}
                        >
                            <View style={{
                                backgroundColor: cores.rosaClaro3,
                                borderRadius: 8,
                                padding: 10,
                                marginRight: 15
                            }}>
                                <Feather name={site.icone as any} size={24} color={cores.rosaEscuro} />
                            </View>
                            
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.texto, {
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    marginBottom: 5,
                                    color: cores.textoEscuro
                                }]}>
                                    {site.nome}
                                </Text>
                                <Text style={[styles.texto, {
                                    fontSize: 13,
                                    color: cores.texto,
                                    lineHeight: 18
                                }]}>
                                    {site.descricao}
                                </Text>
                            </View>

                            <Feather name="external-link" size={20} color={cores.rosaEscuro} style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Mensagem Final */}
                <View style={[styles.card, {width: "95%", backgroundColor: cores.rosaClaro3}]}>
                    <Text style={[styles.texto, {
                        textAlign: 'center',
                        fontSize: 14,
                        fontStyle: 'italic',
                        color: cores.textoEscuro
                    }]}>
                        <Feather name="heart" size={16} color={cores.rosaEscuro} /> 
                        {" "}Lembre-se: cuidar da sua saúde mental é um ato de amor próprio.
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
};

export { LeiturasView };

