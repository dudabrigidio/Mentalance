# 🎬 Roteiro do Vídeo - Mentalance

**Duração estimada:** 4-5 minutos  
**Formato:** Demonstração prática do aplicativo em funcionamento

---

## 📋 Estrutura do Vídeo

### 1. INTRODUÇÃO (0:00 - 0:30)
**O que mostrar:**
- Tela inicial do app (logo Mentalance)
- Apresentação rápida: "Este é o Mentalance, um aplicativo de monitoramento emocional desenvolvido em React Native"

**O que falar:**
> "Olá! Este é o Mentalance, um aplicativo mobile desenvolvido em React Native para monitoramento e gestão da saúde mental. Vou demonstrar todas as funcionalidades do aplicativo."

---

### 2. AUTENTICAÇÃO - CADASTRO (0:30 - 1:00)
**O que mostrar:**
- Tela de Login
- Clicar em "Cadastrar"
- Preencher formulário de cadastro:
  - Nome
  - E-mail
  - Senha
  - Cargo
- Clicar em "Salvar"
- Mostrar mensagem de sucesso
- Voltar para tela de login

**O que falar:**
> "Primeiro, vou demonstrar o cadastro de um novo usuário. O aplicativo possui validação de formulários e integração com API RESTful. Após o cadastro, o usuário pode fazer login."

---

### 3. AUTENTICAÇÃO - LOGIN (1:00 - 1:20)
**O que mostrar:**
- Tela de Login
- Preencher e-mail e senha do usuário cadastrado
- Clicar em "Entrar"
- Mostrar loading/feedback
- Transição para tela principal (Tab Navigator aparece)

**O que falar:**
> "Agora vou fazer login com as credenciais cadastradas. O sistema utiliza autenticação via token JWT e protege as rotas, permitindo acesso apenas após login bem-sucedido."

---

### 4. NAVEGAÇÃO E ESTRUTURA (1:20 - 1:35)
**O que mostrar:**
- Mostrar a barra de navegação inferior (Tab Navigator)
- Navegar entre as 5 abas:
  - Perfil do Usuário
  - Checkin
  - Análise Semanal
  - Leituras
  - Sobre o App
- Destacar a navegação fluida

**O que falar:**
> "O aplicativo possui 7 telas no total, com navegação implementada usando React Navigation. Usuários autenticados têm acesso a todas as funcionalidades através desta navegação por abas."

---

### 5. CRUD - CHECK-IN (CREATE) (1:35 - 2:10)
**O que mostrar:**
- Tela de Checkin
- Selecionar uma emoção (ex: "Feliz")
- Preencher o campo de texto com descrição
- Clicar em "Finalizar Checkin"
- Mostrar loading
- Mostrar resultado do checkin salvo com análise de sentimento

**O que falar:**
> "Agora vou demonstrar a criação de um check-in. O usuário seleciona sua emoção atual e pode adicionar uma descrição. Os dados são salvos via API e o sistema processa uma análise de sentimento."

---

### 6. CRUD - PERFIL (READ e UPDATE) (2:10 - 2:50)
**O que mostrar:**
- Ir para tela "Perfil do Usuário"
- Mostrar informações do usuário (Read):
  - Nome
  - E-mail
  - Cargo
- Clicar em "Atualizar Perfil"
- Modal de edição abre
- Alterar algum campo (ex: nome ou cargo)
- Clicar em "Atualizar Perfil"
- Mostrar feedback de sucesso
- Fechar modal
- Mostrar dados atualizados

**O que falar:**
> "Na tela de perfil, o usuário pode visualizar seus dados e atualizá-los. Todas as operações são realizadas via API, garantindo que os dados estejam sempre sincronizados."

---

### 7. CRUD - CHECK-IN (READ e DELETE) (2:50 - 3:20)
**O que mostrar:**
- Voltar para tela de Checkin
- Se houver lista de check-ins, mostrar
- Ou criar mais um check-in para demonstrar
- Mostrar opção de editar/deletar (se implementado na interface)
- Ou mencionar que a funcionalidade está disponível via API

**O que falar:**
> "O sistema permite criar, ler, atualizar e deletar check-ins. Todas essas operações estão integradas com a API desenvolvida em Java/.NET."

---

### 8. ANÁLISE SEMANAL (3:20 - 3:50)
**O que mostrar:**
- Ir para aba "Análise Semanal"
- Mostrar tela inicial da análise
- Clicar em "Gerar análise semanal"
- Mostrar loading
- Mostrar resultado da análise:
  - Semana referência
  - Emoção predominante
  - Resumo da semana
  - Recomendações

**O que falar:**
> "A funcionalidade de análise semanal processa os check-ins dos últimos 7 dias usando inteligência artificial, gerando insights sobre padrões emocionais e recomendações personalizadas."

---

### 9. LEITURAS E RECURSOS (3:50 - 4:10)
**O que mostrar:**
- Ir para aba "Leituras"
- Mostrar frases inspiradoras
- Mostrar lista de sites de autoajuda
- Clicar em um link (se possível, mostrar abertura do navegador)

**O que falar:**
> "A tela de Leituras oferece recursos educacionais, frases inspiradoras e links para sites especializados em saúde mental, proporcionando um ambiente completo de autocuidado."

---

### 10. SOBRE O APP (4:10 - 4:30)
**O que mostrar:**
- Ir para aba "Sobre o App"
- Mostrar informações do app
- Destacar o hash do commit exibido na tela
- Mostrar informações dos desenvolvedores

**O que falar:**
> "A tela 'Sobre o App' exibe informações importantes, incluindo o hash do commit de referência, conforme exigido pelos requisitos de avaliação."

---

### 11. LOGOUT E PROTEÇÃO DE ROTAS (4:30 - 4:50)
**O que mostrar:**
- Voltar para "Perfil do Usuário"
- Clicar em "Sair" (Logout)
- Mostrar retorno para tela de Login
- Tentar acessar funcionalidades (mostrar que está bloqueado)
- Destacar que as rotas estão protegidas

**O que falar:**
> "Ao fazer logout, a sessão é limpa e o usuário retorna à tela de login. As rotas protegidas só são acessíveis após autenticação, garantindo a segurança dos dados."

---

### 12. CONCLUSÃO (4:50 - 5:00)
**O que mostrar:**
- Tela de login novamente
- Logo do app

**O que falar:**
> "O Mentalance demonstra todas as funcionalidades exigidas: autenticação completa, CRUD integrado com API, navegação fluida entre 7 telas, e uma interface estilizada e intuitiva. Obrigado por assistir!"

---

## 🎯 Pontos-Chave para Destacar

### ✅ Requisitos Obrigatórios a Mostrar:
1. **6+ telas** - Mostrar navegação entre todas
2. **CRUD completo** - Demonstrar Create, Read, Update, Delete
3. **Autenticação** - Login, Cadastro, Logout
4. **Proteção de rotas** - Mostrar que sem login não acessa
5. **Integração com API** - Mencionar que tudo é via API
6. **Estilização** - Destacar cores e design
7. **Tela Sobre o App** - Mostrar hash do commit

### 📝 Dicas de Gravação:
- Use um emulador ou dispositivo físico
- Grave em resolução mínima de 720p
- Fale de forma clara e pausada
- Destaque os feedbacks visuais (loadings, mensagens de sucesso/erro)
- Mostre a navegação fluida entre telas
- Se possível, mostre um erro sendo tratado (ex: login inválido)

### ⚠️ Evite:
- Pausas longas
- Erros não tratados na tela
- Navegação confusa
- Falar muito rápido
- Esquecer de mostrar alguma funcionalidade principal

---

## 📊 Checklist Pré-Gravação

- [ ] App funcionando sem erros
- [ ] Dados de teste preparados (usuário cadastrado)
- [ ] API rodando e acessível
- [ ] Emulador/dispositivo configurado
- [ ] Áudio claro (se for narrar)
- [ ] Tela em boa resolução
- [ ] Todas as funcionalidades testadas

---

**Boa sorte com a gravação! 🎥**

