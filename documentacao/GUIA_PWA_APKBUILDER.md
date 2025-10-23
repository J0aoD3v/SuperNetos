# 📱 Guia: Gerar APK com PWABuilder

## ✅ Arquivos PWA Criados

O SuperNetos agora está configurado como uma **Progressive Web App (PWA)** completa!

### Arquivos adicionados:
- ✅ `manifest.json` - Define informações do app (nome, ícones, tema)
- ✅ `sw.js` - Service Worker para cache e funcionalidade offline
- ✅ `.nojekyll` - Garante que GitHub Pages funcione corretamente
- ✅ Configurações PWA no `index.html` (manifest, meta tags, registro do SW)

---

## 🚀 Passo a Passo: Gerar APK

### **1. Hospedar o Site Online**

Você precisa que o SuperNetos esteja acessível online. Opções:

#### **Opção A: GitHub Pages (RECOMENDADO)**
```powershell
# Já está no GitHub, só precisa ativar Pages:
```
1. Acesse: https://github.com/J0aoD3v/SuperNetos/settings/pages
2. Em "Source", selecione: **main** branch
3. Clique em **Save**
4. Aguarde ~2 minutos
5. Seu site estará em: `https://j0aod3v.github.io/SuperNetos/`

#### **Opção B: Netlify (Alternativa)**
1. Acesse: https://app.netlify.com/drop
2. Arraste a pasta do projeto
3. Pronto! Site no ar

#### **Opção C: Vercel**
1. Acesse: https://vercel.com/new
2. Importe o repositório GitHub
3. Deploy automático

---

### **2. Acessar PWABuilder**

1. Acesse: **https://www.pwabuilder.com/**
2. Cole a URL do seu site (ex: `https://j0aod3v.github.io/SuperNetos/`)
3. Clique em **Start** (botão azul)

---

### **3. Aguardar Análise**

O PWABuilder vai analisar seu site e mostrar:
- ✅ Manifest detectado
- ✅ Service Worker detectado
- ✅ HTTPS habilitado
- ⚠️ Avisos (se houver)

---

### **4. Configurar Opções do Android**

1. Clique em **Package For Stores** (canto superior direito)
2. Selecione **Android**
3. Configure as opções:

#### **Opções Recomendadas:**
```
Package ID: com.uenp.supernetos
App name: SuperNetos
Version: 1.0.0
Version code: 1

Display mode: Fullscreen (para o jogo)
Orientation: Landscape (orientação horizontal)
Theme color: #4CAF50 (verde)
Background color: #000000 (preto)

Signing key: Generate new (gerar automaticamente)
```

4. Em **Advanced Options**:
   - ✅ Enable notifications: NO
   - ✅ Splash screen: YES
   - ✅ Shortcuts: YES
   - ✅ Web share target: NO

---

### **5. Baixar APK**

1. Clique em **Generate** (canto inferior direito)
2. Aguarde ~30 segundos
3. Clique em **Download**
4. Você receberá um arquivo `.zip` contendo:
   - `app-release-signed.apk` ← APK assinado para Play Store
   - `signing.keystore` ← Guarde este arquivo! (para atualizações futuras)
   - `signing-key-info.txt` ← Informações da chave

---

## 📤 Publicar na Google Play Store

### **Pré-requisitos:**
1. **Conta Google Play Console**
   - Custo: $25 USD (taxa única)
   - Criar em: https://play.google.com/console/signup

2. **Arquivos Necessários:**
   - ✅ APK assinado (gerado pelo PWABuilder)
   - ✅ Ícone 512x512px (já temos)
   - ✅ Screenshots (mínimo 2)
   - ✅ Descrição do app
   - ✅ Política de privacidade

---

### **Passo a Passo na Play Console:**

#### **1. Criar Novo App**
1. Acesse: https://play.google.com/console
2. Clique em **Criar app**
3. Preencha:
   - Nome: **SuperNetos**
   - Idioma: **Português (Brasil)**
   - Tipo: **App**
   - Categoria: **Educação**
   - Gratuito/Pago: **Gratuito**

#### **2. Configurar Conteúdo do App**
1. **Descrição curta** (até 80 caracteres):
   ```
   Jogo educativo sobre respeito e cuidado com os idosos
   ```

2. **Descrição completa** (até 4000 caracteres):
   ```
   🌟 SuperNetos - Aprenda sobre Respeito aos Idosos de Forma Divertida!

   O SuperNetos é um jogo educativo desenvolvido pela UENP e FAMEMA para ensinar crianças sobre a importância de respeitar e cuidar das pessoas idosas.

   🎮 CARACTERÍSTICAS:
   • Perguntas dinâmicas sobre situações do dia a dia
   • Personagens interativos (menino e menina)
   • Sistema de pontuação e conquistas
   • Narração em português com Text-to-Speech
   • Interface colorida e amigável para crianças
   • Música de fundo alegre

   📚 OBJETIVO EDUCACIONAL:
   O jogo promove valores importantes como:
   • Empatia com os idosos
   • Respeito intergeracional
   • Reconhecimento dos direitos da pessoa idosa
   • Combate ao preconceito etário

   👶 PÚBLICO-ALVO:
   Crianças a partir de 5 anos de idade

   🎓 DESENVOLVIDO POR:
   • Universidade Estadual do Norte do Paraná (UENP)
   • Faculdade de Medicina de Marília (FAMEMA)

   Transforme seu neto ou sobrinho em um verdadeiro SuperNeto! 🦸‍♂️🦸‍♀️
   ```

3. **Ícone do app**: Upload da imagem 512x512px
4. **Screenshots**: Mínimo 2 imagens (use screenshots do jogo)
5. **Banner de recursos**: Imagem 1024x500px (opcional)

#### **3. Classificação de Conteúdo**
1. Categoria: **Educação**
2. Faixa etária: **LIVRE** (conteúdo educativo)
3. Questionário:
   - Violência: **Não**
   - Linguagem imprópria: **Não**
   - Conteúdo sexual: **Não**
   - Drogas: **Não**

#### **4. Política de Privacidade**
Você PRECISA de uma URL com a política de privacidade. Exemplo simples:

```markdown
# Política de Privacidade - SuperNetos

Última atualização: [Data]

## Coleta de Dados
O SuperNetos NÃO coleta, armazena ou compartilha dados pessoais dos usuários.

## Dados Armazenados Localmente
- Progresso do jogo (armazenado apenas no dispositivo)
- Preferências de áudio (armazenado apenas no dispositivo)

## Dados de Terceiros
O app não utiliza serviços de terceiros que coletem dados.

## Alterações
Podemos atualizar esta política ocasionalmente.

## Contato
[Seu email da UENP]
```

Hospede isso em: GitHub Pages, Google Sites, ou Notion

#### **5. Upload do APK**
1. Vá em **Versões de produção**
2. Clique em **Criar nova versão**
3. Upload do `app-release-signed.apk`
4. Preencha as notas de versão:
   ```
   Primeira versão do SuperNetos!
   • 25 perguntas educativas
   • Sistema de pontuação
   • Narração em português
   • Interface intuitiva para crianças
   ```
5. Clique em **Salvar** e depois **Revisar versão**

#### **6. Revisar e Publicar**
1. Revise todas as informações
2. Clique em **Iniciar implementação para produção**
3. Aguarde aprovação do Google (1-7 dias)

---

## ⚠️ Possíveis Problemas e Soluções

### **1. "Manifest não detectado"**
- ✅ Certifique-se que `manifest.json` está na raiz do projeto
- ✅ Verifique se o site está com HTTPS ativo
- ✅ Limpe o cache e recarregue a página

### **2. "Service Worker não detectado"**
- ✅ Certifique-se que `sw.js` está na raiz
- ✅ Abra as DevTools (F12) → Application → Service Workers
- ✅ Clique em "Update" e "Unregister", depois recarregue

### **3. "Ícones não aparecem"**
- ✅ Verifique se os caminhos no `manifest.json` estão corretos
- ✅ Use caminhos relativos (sem `/` no início)

### **4. "APK não instala no celular"**
- ✅ Habilite "Instalar de fontes desconhecidas" no Android
- ✅ Certifique-se que baixou o APK assinado (não o debug)

---

## 🔄 Atualizar o App (Versões Futuras)

Quando fizer mudanças no jogo:

1. **Atualizar versão no `manifest.json`:**
   ```json
   "version": "1.0.1"
   ```

2. **Atualizar cache no `sw.js`:**
   ```javascript
   const CACHE_NAME = 'supernetos-v1.0.1'; // Mudar versão
   ```

3. **Fazer commit e push** para o GitHub

4. **Gerar novo APK** no PWABuilder

5. **Upload na Play Console**:
   - Aumentar Version Code (ex: 1 → 2)
   - Upload do novo APK
   - Adicionar notas de atualização

---

## 📊 Checklist Completo

### Antes de Gerar APK:
- [x] Manifest.json criado
- [x] Service Worker criado
- [x] Site hospedado online (GitHub Pages)
- [x] HTTPS habilitado
- [ ] Testar PWA no navegador (F12 → Application)
- [ ] Testar Service Worker funcionando
- [ ] Ícones com tamanhos corretos

### Para Publicar na Play Store:
- [ ] Conta Google Play Console criada ($25)
- [ ] APK assinado gerado
- [ ] Ícone 512x512px preparado
- [ ] Screenshots do jogo (mínimo 2)
- [ ] Descrição escrita
- [ ] Política de privacidade publicada online
- [ ] Guardar arquivo `signing.keystore` em local seguro

---

## 🎯 Próximos Passos Recomendados

1. **Ativar GitHub Pages** (5 minutos)
2. **Testar PWA** localmente (10 minutos)
3. **Gerar APK** no PWABuilder (15 minutos)
4. **Testar APK** no celular Android (5 minutos)
5. **Criar screenshots** para Play Store (20 minutos)
6. **Escrever política de privacidade** (15 minutos)
7. **Criar conta Play Console** ($25 + 10 minutos)
8. **Publicar app** (30 minutos)

**Tempo total estimado: ~2 horas** (excluindo aprovação do Google)

---

## 📞 Suporte

Se tiver dúvidas ou problemas:
- PWABuilder Docs: https://docs.pwabuilder.com/
- Play Console Help: https://support.google.com/googleplay/android-developer
- GitHub Pages: https://docs.github.com/pages

---

**Boa sorte com a publicação do SuperNetos! 🚀🎮**
