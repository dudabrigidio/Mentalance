import { StyleSheet } from "react-native";

// Paleta de cores: Amarelo claro e Rosa claro
const cores = {
    amareloClaro: '#f8f2c4ff',      // Amarelo muito claro
    amareloClaro2: '#FFFACD',     // Amarelo claro alternativo
    amareloClaro3: '#FFFFE0',     // Amarelo claro suave
    rosaClaro: '#d3909aff',         // Rosa claro (Light Pink)
    rosaClaro2: '#FFC0CB',        // Rosa claro alternativo
    rosaClaro3: '#f4e1e5ff',        // Rosa claro suave (Misty Rose)
    rosaEscuro: '#FF91A4',        // Rosa um pouco mais escuro para botões
    branco: '#FFFFFF',
    texto: '#4A4A4A',
    textoEscuro: '#2C2C2C',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.amareloClaro,
        alignItems: 'stretch', 
        alignContent:'space-between'
    },
    container2: {
        flex: 1,
        backgroundColor: cores.amareloClaro2,
        padding: 10
    },
    input: {
        borderWidth: 1.5,
        borderColor: cores.rosaClaro2,
        backgroundColor: cores.branco,
        borderRadius: 16,
        paddingHorizontal: 15,
        paddingVertical: 12,
        margin: 10,
        shadowColor: cores.rosaClaro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    itens: {
        backgroundColor: cores.rosaClaro3,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 20,
        margin: 10,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: cores.rosaClaro,
    },
    imagem: {
        width:200,
        height:200,
    },
    espaco: {
        flex: 1,
        justifyContent:'flex-start',
        gap: 7,
        padding: 5,
    },
    botao: {
        backgroundColor: cores.rosaEscuro,
        padding: 15,
        margin: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: cores.rosaClaro,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 6
    },
    botaoTexto: {
        color: cores.branco,
        fontSize: 16,
        fontWeight: 'bold'
    },
    card: {
        borderWidth: 1.5, 
        borderColor: cores.rosaClaro2,
        backgroundColor: cores.rosaClaro3,
        padding: 20, 
        margin: 10, 
        gap: 10,
        borderRadius: 12,
        shadowColor: cores.rosaClaro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
        justifyContent: "center"
    }, 
    cardIcons: {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        gap: 20
    },
    cardText: {
        color: cores.textoEscuro,
        fontSize: 16,
        fontWeight: 'bold'
    }, 
    texto: {
        fontSize: 16,
        textAlign: 'justify',
        color: cores.texto
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: cores.textoEscuro
    },
    titulo2: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: cores.textoEscuro
    },

    item: {
        alignItems: "center",
        width: 70,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 5,
        opacity: 0.5,
    },
    imageSelecionada: {
        opacity: 1,
        transform: [{ scale: 1.1 }],
    },
    text: {
        fontSize: 12,
        textAlign: "center",
        color: cores.texto
    },
    resultado: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: cores.textoEscuro
    },
    emocao: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        paddingHorizontal: 10,
    },
});

export { styles, cores };