# Mentalance - Aplicativo de Monitoramento Emocional

## 📱 Sobre o Projeto

O **Mentalance** é um aplicativo mobile desenvolvido em React Native para ajudar usuários a monitorar e entender melhor suas emoções ao longo do tempo. Através de check-ins diários e análises semanais com inteligência artificial, o aplicativo oferece insights valiosos sobre padrões emocionais e recomendações personalizadas para o bem-estar mental.

## 👥 Integrantes do Grupo

- **André Luís Mesquita de Abreu** - RM558159
- **Maria Eduarda Brigidio** - RM558575
- **Rafael Bompadre Lima** - RM556459

## 🎥 Vídeo de Demonstração

[🔗 Link para o vídeo no YouTube](https://youtube.com/shorts/5Bu9S-_DcgE)


## 🎯 Descrição da Solução - Global Solution

O Mentalance foi desenvolvido como solução para o desafio de monitoramento e gestão da saúde mental. A aplicação permite que usuários:

- **Registrem diariamente suas emoções** através de check-ins intuitivos
- **Recebam análises semanais automatizadas** com identificação de padrões emocionais
- **Acessem recomendações personalizadas** baseadas em seus registros
- **Visualizem seu histórico emocional** para melhor compreensão de si mesmos
- **Tenham acesso a recursos educacionais** sobre saúde mental e bem-estar

A solução integra uma API RESTful desenvolvida em Java/.NET para gerenciar dados de usuários e check-ins, proporcionando uma experiência completa de autocuidado emocional.

## 🚀 Funcionalidades

### Autenticação
- ✅ Tela de Login
- ✅ Tela de Cadastro de Usuário
- ✅ Logout funcional
- ✅ Proteção de rotas (telas restritas apenas para usuários autenticados)
- ✅ Persistência de sessão com AsyncStorage

### CRUD Completo
- ✅ **Usuários**: Criar, Ler, Atualizar e Deletar perfil
- ✅ **Check-ins**: Criar, Ler, Atualizar e Deletar registros emocionais
- ✅ Integração completa com API RESTful (.NET)
- ✅ Tratamento de erros e feedback visual

### Telas do Aplicativo
1. **Login** - Autenticação de usuários
2. **Cadastro** - Registro de novos usuários
3. **Perfil do Usuário** - Visualização e edição de dados pessoais
4. **Checkin** - Registro diário de emoções
5. **Análise Semanal** - Análise de padrões emocionais com IA
6. **Leituras** - Recursos educacionais e inspirações
7. **Sobre o App** - Informações do aplicativo e hash do commit

### Navegação
- ✅ React Navigation implementado
- ✅ Bottom Tab Navigator para usuários autenticados
- ✅ Stack Navigator para fluxo de autenticação
- ✅ Navegação fluida entre todas as telas

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **Axios** - Cliente HTTP para comunicação com API
- **AsyncStorage** - Armazenamento local de dados
- **Yup** - Validação de schemas
- **Expo Vector Icons** - Ícones do aplicativo

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js instalado
- Expo CLI instalado globalmente (`npm install -g expo-cli`)
- Android Studio ou Xcode (para emuladores)
- Ou Expo Go no dispositivo físico

### Passos para Executar

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd mentalance
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o aplicativo:
```bash
npm start
# ou
expo start
```

4. Escaneie o QR code com o Expo Go ou pressione `a` para Android / `i` para iOS

## 📁 Estrutura do Projeto

```
mentalance/
├── assets/              # Imagens e recursos visuais
├── componentes/         # Componentes reutilizáveis
├── contexto/            # Context API para gerenciamento de estado
├── control/             # Controllers (lógica de negócio)
├── estilos/             # Estilos e tema do aplicativo
├── fetcher/             # Chamadas HTTP para API
├── model/               # Modelos de dados e schemas
├── navigation/          # Configuração de navegação
├── service/             # Serviços de validação e lógica
├── utils/               # Utilitários (gitInfo, etc.)
└── view/                # Telas do aplicativo
```

## 📱 Publicação

O aplicativo está publicado no **Firebase App Distribution** para testes.
[🔗 Link para convite](https://appdistribution.firebase.dev/i/9d8641739d03327d)


## 📝 Notas de Desenvolvimento

- O hash do commit de referência é exibido na tela "Sobre o App"
- O script `update-git-info.js` atualiza automaticamente as informações do Git
- Todas as operações CRUD são realizadas via API, sem armazenamento local permanente

## 📄 Licença

Este projeto foi desenvolvido como parte do curso de Desenvolvimento Mobile da FIAP.

---

**Desenvolvido pela equipe Mentalance**

