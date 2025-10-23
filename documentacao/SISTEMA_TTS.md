# Sistema de Text-to-Speech (TTS) - SuperNetos

## 📢 Visão Geral

O projeto SuperNetos agora possui um sistema de **Text-to-Speech (TTS)** integrado que faz os personagens "falarem" as perguntas e feedback de forma automática, tornando o jogo mais acessível e imersivo.

## ✨ Funcionalidades Implementadas

### 1. **Fala Automática das Perguntas**
- Quando uma nova pergunta aparece, o texto é lido automaticamente
- Voz ajustada para soar como uma criança (pitch mais alto)
- Velocidade controlada para facilitar a compreensão

### 2. **Botão de Repetir Pergunta**
- Botão com ícone 🔊 ao lado do texto da pergunta
- Permite que a criança ouça a pergunta quantas vezes quiser
- Útil para crianças com dificuldades de leitura

### 3. **Feedback com Emoção**
- Acertos são falados com tom mais alegre (pitch alto)
- Erros são falados com tom mais calmo (pitch baixo)
- Sincronizado com as expressões do personagem (feliz/triste)

### 4. **Frases Motivacionais Faladas**
- Mensagens de incentivo são lidas em voz alta
- Aumenta o engajamento da criança

## 🔧 Tecnologia Utilizada

### **Web Speech API (Nativa do Navegador)**

✅ **100% Gratuita** - Sem custos ou limites de uso  
✅ **Sem necessidade de API externa** - Funciona offline  
✅ **Multiplataforma** - Chrome, Edge, Safari, Firefox  
✅ **Suporte a Português Brasileiro** - Vozes pt-BR disponíveis

## 🎛️ Parâmetros de Voz Configurados

```javascript
// Pergunta (voz de criança)
falarPergunta(texto) {
  pitch: 1.2-1.3  // Tom mais agudo (criança)
  rate: 0.85      // Velocidade um pouco mais lenta
  volume: 0.8     // Volume controlado
}

// Feedback Positivo (alegre)
falarFeedback(texto, true) {
  pitch: 1.2      // Tom alto (alegria)
  rate: 1.0       // Velocidade normal
  volume: 0.8     // Volume controlado
}

// Feedback Negativo (calmo)
falarFeedback(texto, false) {
  pitch: 0.9      // Tom mais baixo (calma)
  rate: 0.85      // Velocidade mais lenta
  volume: 0.8     // Volume controlado
}
```

## 📁 Arquivos Modificados

### ✅ `src/paginas/perguntas-dinamicas.html`
- Sistema TTS completo implementado
- Fala automática ao carregar pergunta
- Botão de repetir pergunta funcional
- Feedback falado nos balões de fala

### ✅ `src/paginas/perguntas-dinamicas-servidor.html`
- Sistema TTS implementado
- Botão de áudio adicionado no HTML
- Fala automática das perguntas

## 🎯 Como Funciona

### Fluxo de Fala Automática:

1. **Pergunta carrega** → Animação de entrada (100ms)
2. **Animação termina** → Aguarda 300ms
3. **Fala inicia** → Lê o texto da pergunta com voz de criança
4. **Usuário pode clicar no botão 🔊** → Repete a pergunta

### Fluxo de Feedback:

1. **Usuário responde** → Processa resposta
2. **Balão de fala aparece** → Mostra feedback visual
3. **Aguarda 200ms** → Inicia fala do feedback
4. **Usuário clica/pressiona Enter** → Para a fala e fecha balão

## 🌐 Compatibilidade de Navegadores

| Navegador | Suporte | Qualidade de Voz |
|-----------|---------|------------------|
| Chrome    | ✅ Excelente | ⭐⭐⭐⭐⭐ |
| Edge      | ✅ Excelente | ⭐⭐⭐⭐⭐ |
| Safari    | ✅ Muito Boa | ⭐⭐⭐⭐ |
| Firefox   | ✅ Boa | ⭐⭐⭐ |

## 🎓 Benefícios Educacionais

### Para Crianças com Dificuldades de Leitura
- ✅ Ouvem as perguntas antes/durante a leitura
- ✅ Podem repetir quantas vezes precisarem
- ✅ Aprendem associando som e texto

### Para Crianças em Fase de Alfabetização
- ✅ Reforçam a relação letra-som
- ✅ Desenvolvem compreensão auditiva
- ✅ Maior autonomia no jogo

### Para Inclusão
- ✅ Acessibilidade para crianças com deficiência visual parcial
- ✅ Facilita para crianças com dislexia
- ✅ Útil para todas as idades

## 🔄 Integração com JSON Dinâmico

✅ **Funciona perfeitamente com perguntas do JSON!**

O sistema TTS lê o texto que já está carregado do arquivo JSON (local ou JSONBin), então:
- Não precisa de arquivos de áudio extras
- Funciona com qualquer texto do JSON
- Adicione novas perguntas e elas serão faladas automaticamente

## 🎛️ Controles Disponíveis

### Para o Usuário:
- 🔊 **Botão de Áudio**: Clique para repetir a pergunta
- 🔇 **Botão de Volume**: Controla apenas a música de fundo (não afeta TTS)
- ⏭️ **Clicar/Enter**: Para a fala do feedback e avança

### Para Desenvolvedores:
```javascript
// Ativar/desativar TTS globalmente
ttsHabilitado = true; // ou false

// Falar texto customizado
falarTexto("Seu texto aqui", {
  pitch: 1.0,
  rate: 1.0,
  volume: 0.8
});

// Parar qualquer fala
pararFala();
```

## 🚀 Próximas Melhorias Possíveis

- [ ] Adicionar seletor de voz (menino/menina com vozes diferentes)
- [ ] Opção de ativar/desativar TTS nas configurações
- [ ] Destacar palavras enquanto fala (karaokê)
- [ ] Adicionar efeitos sonoros junto com TTS
- [ ] Velocidade ajustável pelo usuário

## 💡 Observações Importantes

1. **Primeira Interação**: Alguns navegadores exigem que o usuário clique na página antes de permitir áudio automático
2. **Emojis**: São removidos automaticamente do texto antes da fala
3. **Performance**: TTS é leve e não afeta o desempenho do jogo
4. **Privacidade**: Tudo roda localmente no navegador, nenhum dado é enviado para servidores

---

**Desenvolvido para o projeto SuperNetos - UENP/FAMEMA**  
Sistema implementado em: 23 de outubro de 2025
