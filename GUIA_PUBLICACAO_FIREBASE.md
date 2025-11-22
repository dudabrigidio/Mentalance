# 🔥 Guia Completo: Publicar App no Firebase App Distribution

Este guia mostra como publicar o aplicativo Mentalance no Firebase App Distribution para distribuição de testes.

---

## 📋 Pré-requisitos

- Conta Google (para acessar Firebase Console)
- Node.js instalado
- Expo CLI instalado
- Conta no Firebase (gratuita)
- Projeto Expo configurado

---

## 🚀 Passo 1: Criar Projeto no Firebase

### 1.1 Acessar Firebase Console
1. Acesse: https://console.firebase.google.com/
2. Faça login com sua conta Google

### 1.2 Criar Novo Projeto
1. Clique em **"Adicionar projeto"** ou **"Create a project"**
2. Digite o nome do projeto: `mentalance` (ou outro nome de sua escolha)
3. Clique em **"Continuar"**
4. **Opcional:** Desative o Google Analytics (ou mantenha ativo)
5. Clique em **"Criar projeto"**
6. Aguarde a criação (pode levar alguns segundos)
7. Clique em **"Continuar"**

---

## 📱 Passo 2: Configurar Firebase App Distribution no Projeto

### 2.1 Instalar Firebase CLI
Abra o terminal e execute:

```bash
npm install -g firebase-tools
```

### 2.2 Fazer Login no Firebase

**⚠️ Problema no Windows/PowerShell?** Se você receber erro de "execução de scripts desabilitada", veja as soluções abaixo.

#### Solução 1: Usar npx (Recomendado - Mais Fácil)
```bash
npx firebase-tools login
```

#### Solução 2: Alterar Política de Execução do PowerShell
Abra o PowerShell como **Administrador** e execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Depois tente novamente:
```bash
firebase login
```

#### Solução 3: Usar CMD (Prompt de Comando)
Abra o **Prompt de Comando** (CMD) em vez do PowerShell:
```bash
firebase login
```

#### Solução 4: Usar caminho completo
```bash
npm exec firebase login
```

**Após qualquer uma das soluções acima:**
- Isso abrirá o navegador para autenticação
- Autorize o acesso

### 2.3 Inicializar Firebase no Projeto
No diretório do projeto (`mentalance`), execute:

```bash
firebase init
```

**Selecione as opções:**
1. Use as setas para navegar e **espaço** para selecionar:
   - ✅ **App Distribution**
2. Selecione o projeto Firebase criado anteriormente
3. Para "Which platforms should your app support?", selecione:
   - ✅ **Android**
   - ✅ **iOS** (se aplicável)
4. Para Android:
   - Caminho do APK: `android/app/build/outputs/apk/release/app-release.apk` (será gerado depois)
   - Ou deixe em branco por enquanto
5. Para iOS (se aplicável):
   - Caminho do IPA: deixe em branco por enquanto

---

## 🤖 Passo 3: Configurar Build para Android

### 3.1 Instalar EAS CLI (Recomendado para Expo)
```bash
npm install -g eas-cli
```

### 3.2 Fazer Login no EAS
```bash
eas login
```

### 3.3 Configurar EAS Build
No diretório do projeto, execute:

```bash
eas build:configure
```

Isso criará um arquivo `eas.json` na raiz do projeto.

### 3.4 Editar eas.json
Abra o arquivo `eas.json` e configure:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

## 🔨 Passo 4: Gerar Build do Android

### 4.1 Build Local (Alternativa mais rápida)

Se você quiser fazer build local, primeiro precisa fazer o "prebuild":

```bash
npx expo prebuild
```

Depois, gere o APK:

```bash
cd android
./gradlew assembleRelease
```

O APK estará em: `android/app/build/outputs/apk/release/app-release.apk`

### 4.2 Build na Nuvem (Recomendado - EAS Build)

```bash
eas build --platform android --profile preview
```

**Nota:** Isso pode levar 10-20 minutos. O build será feito na nuvem do Expo.

Após o build, você receberá um link para download do APK.

---

## 📤 Passo 5: Publicar no Firebase App Distribution

### 5.1 Método 1: Via Firebase CLI

#### Instalar Plugin do App Distribution
```bash
firebase init appdistribution
```

#### Fazer Upload do APK
```bash
firebase appdistribution:distribute android/app/build/outputs/apk/release/app-release.apk \
  --app YOUR_APP_ID \
  --groups "testers" \
  --release-notes "Versão 1.0.0 - Primeira publicação"
```

**Onde encontrar o APP_ID:**
1. Acesse Firebase Console
2. Vá em **App Distribution**
3. Clique em **"Adicionar app"** ou **"Add app"**
4. Selecione **Android**
5. Registre o app (pode usar package name: `com.mentalance.app`)
6. Copie o **App ID** exibido

### 5.2 Método 2: Via Firebase Console (Mais Fácil)

1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto
3. No menu lateral, clique em **"App Distribution"** (se não aparecer, ative no menu "Build")
4. Clique em **"Adicionar app"** ou **"Add app"**
5. Selecione **Android**
6. Preencha:
   - **Nome do app:** Mentalance
   - **Package name:** `com.mentalance.app` (ou o package do seu app)
   - **SHA-1:** (opcional, para debug)
7. Clique em **"Registrar app"**
8. Clique em **"Fazer upload de uma nova versão"** ou **"Upload new release"**
9. Selecione o arquivo APK gerado
10. Preencha:
    - **Release notes:** "Versão 1.0.0 - Primeira publicação do Mentalance"
    - **Versão:** 1.0.0
11. Clique em **"Distribuir"**

---

## 👥 Passo 6: Adicionar Testers

### 6.1 Criar Grupo de Testers

1. No Firebase Console, vá em **App Distribution**
2. Clique em **"Testers"** ou **"Testers & Groups"**
3. Clique em **"Novo grupo"** ou **"New group"**
4. Nome do grupo: `professores` ou `testers`
5. Clique em **"Criar"**

### 6.2 Adicionar E-mail do Professor

1. No grupo criado, clique em **"Adicionar testers"** ou **"Add testers"**
2. Digite o e-mail do professor
3. Clique em **"Adicionar"**
4. O professor receberá um e-mail com link para baixar o app

### 6.3 Associar Grupo à Distribuição

Ao fazer upload de uma nova versão:
1. Na tela de distribuição, em **"Distribuir para"**, selecione o grupo criado
2. Ou adicione e-mails individuais

---

## 🔄 Passo 7: Configurar Distribuição Automática (Opcional)

### 7.1 Usar GitHub Actions ou CI/CD

Crie um arquivo `.github/workflows/firebase-distribution.yml`:

```yaml
name: Firebase App Distribution

on:
  push:
    branches:
      - main

jobs:
  build-and-distribute:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build APK
        run: |
          npx expo prebuild
          cd android
          ./gradlew assembleRelease
      
      - name: Upload to Firebase App Distribution
        uses: wzieba/Firebase-Distribution-Github-Action@v1
        with:
          appId: ${{ secrets.FIREBASE_APP_ID }}
          serviceCredentialsFileContent: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          groups: testers
          file: android/app/build/outputs/apk/release/app-release.apk
```

---

## ✅ Passo 8: Verificar Publicação

### 8.1 Verificar no Console
1. Acesse Firebase Console > App Distribution
2. Verifique se a versão aparece na lista
3. Verifique quantos testers foram notificados

### 8.2 Testar Download
1. Use o e-mail do professor (ou seu próprio e-mail de teste)
2. Abra o link recebido por e-mail
3. Baixe e instale o APK
4. Verifique se o app funciona corretamente

---

## 🐛 Solução de Problemas Comuns

### Erro: "Execução de scripts foi desabilitada" (Windows/PowerShell)
**Sintoma:** `PSSecurityException` ou `UnauthorizedAccess` ao executar `firebase login`

**Soluções:**
1. **Usar npx (Mais fácil):**
   ```bash
   npx firebase-tools login
   ```

2. **Alterar política do PowerShell (como Administrador):**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Usar CMD em vez de PowerShell:**
   - Abra o Prompt de Comando (CMD)
   - Execute: `firebase login`

4. **Usar npm exec:**
   ```bash
   npm exec firebase login
   ```

### Erro: "App not found"
- Verifique se o app foi registrado no Firebase App Distribution
- Confirme o App ID correto

### Erro: "Invalid APK"
- Certifique-se de que o APK é uma build de release
- Verifique se o package name está correto

### Erro: "Permission denied"
- Verifique se você tem permissões de administrador no projeto Firebase
- Confirme que está logado com a conta correta

### APK muito grande
- Use `eas build` com otimizações
- Considere usar AAB (Android App Bundle) em vez de APK

---

## 📝 Checklist Final

Antes de considerar a publicação completa:

- [ ] Projeto criado no Firebase
- [ ] App registrado no App Distribution
- [ ] APK gerado (build de release)
- [ ] APK enviado para Firebase App Distribution
- [ ] Grupo de testers criado
- [ ] E-mail do professor adicionado ao grupo
- [ ] Release notes preenchidas
- [ ] Versão do app definida
- [ ] E-mail de teste recebido e verificado
- [ ] App instalado e testado em dispositivo físico

---

## 🔗 Links Úteis

- Firebase Console: https://console.firebase.google.com/
- Documentação Firebase App Distribution: https://firebase.google.com/docs/app-distribution
- Documentação EAS Build: https://docs.expo.dev/build/introduction/
- Expo Documentation: https://docs.expo.dev/

---

## 📞 Comandos Rápidos de Referência

```bash
# Login no Firebase (Windows: use npx se tiver erro)
npx firebase-tools login
# ou
firebase login

# Inicializar Firebase
npx firebase-tools init
# ou
firebase init

# Fazer upload do APK
npx firebase-tools appdistribution:distribute app-release.apk \
  --app YOUR_APP_ID \
  --groups "testers" \
  --release-notes "Versão 1.0.0"

# Build com EAS
eas build --platform android --profile preview

# Prebuild (gerar pastas nativas)
npx expo prebuild
```

**💡 Dica Windows:** Se tiver problemas com `firebase`, sempre use `npx firebase-tools` em vez de `firebase`.

---

## 🎯 Dicas Importantes

1. **Package Name:** Use um package name único (ex: `com.mentalance.app`)
2. **Version Code:** Incremente a cada nova versão
3. **Release Notes:** Sempre preencha com informações úteis
4. **Testers:** Adicione o e-mail do professor ANTES de distribuir
5. **Teste Localmente:** Sempre teste o APK antes de distribuir

---

**Boa sorte com a publicação! 🚀**

